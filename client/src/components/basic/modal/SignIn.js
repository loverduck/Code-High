import React from 'react';
import Signinimg from '../../../image/Signin.svg';
import codehighlogo from '../../../image/codehighlogo.png';
import github from '../../../image/github.png';
import kakao from '../../../image/kakao.png';
import naver from '../../../image/naver.png';

function SignIn(){
  return (
    <div className='signin-modal'>
      <div className='signin-modal-overlay'></div>
      <div className='signin-container'>
        <div className='signin-right'>
          <img src={Signinimg} alt='signin' />
        </div>
        <div className='signin-left'>
          <div className='signin-close'>&times;</div>
          <img src={codehighlogo} alt='logo' />
          <article>
            <input placeholder='Email'/>
            <input placeholder='Password'/>
          </article>
          <div className='signin-button-container'>
            <button>로그인</button>
          </div>
          <ul>
            <li><a href=''>비밀번호 찾기</a></li>
            <li><a href=''>회원가입</a></li>
          </ul>
          <div className='signin-oauth-container'>
            <a href=''><img src={github} alt='github' /></a>
            <a href=''><img src={kakao} alt='kakao' /></a>
            <a href=''><img src={naver} alt='naver' /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;