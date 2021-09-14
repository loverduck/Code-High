import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';


export const emailLogin = () => {
  
}

export const kakaoLogin = () => {

}

export const googleLogin = () => {

}

export const githubLogin = () => {

}

export const logout = () => {

}

export const signUpEmail = async (req: Request, res: Response) => {
  const { email, password, name, phone } = req.body;
  // 필수 정보 확인
  if (!email || !password || !name) {
    return res.status(422).send('Unprocessable Ent');
  }

  // 중복 이메일 확인
  const userEmail = await User.findOne({ where: { email } })
  if (userEmail) {
    return res.status(409).send('Email Conflict');
  }

  const hashPwd = await bcrypt.hash(password, 10);
  let userInfo = new User();
  userInfo.name = name;
  userInfo.email = email;
  userInfo.password = hashPwd;
  userInfo.phone = phone;
  userInfo.loginType = 'email';
  await userInfo.save();

  return res.status(200).send('success');
}

export const checkEmail = () => {

}