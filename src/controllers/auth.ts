import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { sendEmail } from './mail';
import * as bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, generateEmailToken, verifyEmailToken } from './jwt';
import axios from 'axios';

const emailLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userInfo = await User.findOne({ where: { email } });

    if (!userInfo || !userInfo.verified) {
      return res.status(404).send({ message: 'undefined user' });
    }

    if (userInfo.loginType !== 'email') {
      return res.status(401).send({ message: 'social login user' })
    }

    const same = await bcrypt.compare(password, userInfo.password);
    if (!same) {
      return res.status(401).send({ message: 'unauthorized' });
    }

    const tokenInfo = { id: userInfo.id, email: userInfo.email };
    const accessToken: string = generateAccessToken(tokenInfo);
    const refreshToken: string = generateRefreshToken(tokenInfo);

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24, // 1d
        httpOnly: true,
        secure: true,
    })
    delete userInfo.password;
    return res.status(200).send({ accessToken, userInfo, message: 'login success'});

  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err.message });
  }
}

const kakaoLogin = async (req: Request, res: Response) => {
  try {
    const getTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const getInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    const result = await axios.post(getTokenUrl, {
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      code: req.body.authorizationCode,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000'
    })
    const accessToken = result.data.access_token;
    const refreshToken = result.data.refresh_token;

    const userInfoBykakao = await axios.get(getInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const { email } = userInfoBykakao.data;

    console.log(userInfoBykakao.data);
    
    // 가입여부 확인
    // const userInfo = await User.findOne({ where: { email }})
    // if (!userInfo) {
    //   const name = email.split('@')[0];
    //   const newGoogleUser = User.create({  
    //     email,
    //     image,
    //     name,
    //     loginType: 'google',
    //     authorityId: 3,
    //     verified: true,
    //   })
    //   await User.save(newGoogleUser);
    // }
    
    // res.cookie('refreshToken', refreshToken, {
    //   maxAge: 1000 * 60 * 60 * 24, // 1d
    //   httpOnly: true,
    //   secure: true,
    // },)

    return res.status(200).send({ accessToken, message: 'Kakao Login Success'});
  } catch (err) {
    throw new Error(err);
  }
}

const googleLogin = async (req: Request, res: Response) => {
  try {
    const getTokenUrl = 'https://oauth2.googleapis.com/token';
    const getInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';

    const result = await axios.post(getTokenUrl, {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: req.body.authorizationCode,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000'
    })

    const accessToken = result.data.access_token;
    const refreshToken = result.data.refresh_token
    
    const userInfoByGoogle = await axios.get(getInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const { email, picture } = userInfoByGoogle.data;
    
    // 가입여부 확인
    const userInfo = await User.findOne({ where: { email }})
    if (!userInfo) {
      const name = email.split('@')[0];
      const newGoogleUser = User.create({  
        email,
        image: picture,
        name,
        loginType: 'google',
        authorityId: 3,
        verified: true,
      })
      await User.save(newGoogleUser);
    }
    
    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24, // 1d
      httpOnly: true,
      secure: true,
    },)
    return res.status(200).send({ accessToken, message: 'Google login Success' });

  } catch (err) {
    console.log(err);
    return res.send(err.message);
  }
}

// TODO : refresh token ?
const githubLogin = async (req: Request, res: Response) => {
  try {

    const getTokenUrl = 'https://github.com/login/oauth/access_token';
    const getInfoUrl = '';

    const result = await axios.post(getTokenUrl, {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: req.body.authorizationCode
    }, { headers: { accept: 'application/json' } })

    const accessToken = result.data.access_token;
    // const refreshToken = result.data;


    return res.status(200).send({ accessToken, message: 'Github login Success' });

  } catch (err) {
    // console.log(err);
    return res.send(err.message);
  }
}

const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.send({ message: 'logout success'});
}

const signUpEmail = async (req: Request, res: Response) => {
  const { email, password, name, phone } = req.body;
  
  // 필수 정보 확인
  if (!email || !password || !name) {
    return res.status(422).send({ message: 'Unprocessable Ent' });
  }

  try {
    // 중복 이메일 확인
    const userEmail = await User.findOne({ where: { email } })
    if (userEmail) {
      if (userEmail.verified) {
        return res.status(409).send({ message: 'Email Conflict' }); 
      } else {
        await userEmail.remove();
      }
    }
    
    const hashPwd = await bcrypt.hash(password, 10);
    const userInfo = User.create({  
      email,
      password: hashPwd,
      name,
      phone,
      loginType: 'email',
      authorityId: 3,
      verified: false,
    })
    const result = await User.save(userInfo);

    // send code to userEmail
    const code = generateEmailToken({ email, id: result.id });
    sendEmail(email, name, code);
    
    return res.status(200).send({ message: 'send email' });

  } catch (err) {
    console.log(err);
    return res.send(err.message);
  }
  
}

// 이메일 인증 링크 접속 시.
const checkEmailCode = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const user: any = verifyEmailToken(code);
    if (!user) {
      return res.status(401).send({ message: 'unauthorized code'});
    }
   
    await User.update({ id: user.id }, { verified: true });
    return res.status(201).send({ message: 'signup success' });

  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
}

export { 
  emailLogin, 
  kakaoLogin, 
  googleLogin, 
  githubLogin, 
  logout, 
  signUpEmail, 
  checkEmailCode };