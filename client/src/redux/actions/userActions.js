import {
  SIGNIN_USER,
  SIGNOUT_USER,
  GET_USER_INFO,
  DELETE_USER_INFO,
  GET_MENU,
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;
const serverUrl = 'https://localhost:4000';

//-------------------------------1.로그인-------------------------------
export async function signinUser(email, password) {
  axios
    .post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => {
      const { id, email, image, name, phone, authority } = res.data.userInfo;
      return {
        type: SIGNIN_USER,
        payload: {
          message: res.data.message,
          accessToken: res.data.accessToken,
          id: id,
          email: email,
          image: image,
          name: name,
          phone: phone,
          authority: authority,
        },
      };
    });
}

//-------------------------------2.로그아웃-------------------------------
export async function signoutUser() {
  axios
    .get(`${serverUrl}/logout`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      return {
        type: SIGNOUT_USER,
        payload: res.data.message,
      };
    });
}

//-------------------------------3.유저 정보 가져오기-------------------------------
export async function getUserInfo(accessToken) {
  axios
    .get(`${serverUrl}/user/info`, {
      headers: { Authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      const { id, email, image, name, phone, authorityId, loginType } =
        res.data.userInfo;
      return {
        type: GET_USER_INFO,
        payload: {
          message: res.data.message,
          id: id,
          email: email,
          image: image,
          name: name,
          phone: phone,
          authorityId: authorityId,
          loginType: loginType,
        },
      };
    });
}

//-------------------------------4.회원탈퇴-------------------------------
export async function deleteUserInfo(accessToken) {
  axios
    .delete(`${serverUrl}/user`, {
      headers: { Authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: DELETE_USER_INFO,
        payload: res.data.message,
      };
    });
}

//------------------------------5.메뉴 가져오기-------------------------------
export async function getMenu(accessToken) {
  axios
    .get(`${serverUrl}/menu`, {
      headers: { Authorization: `bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      return {
        type: GET_MENU,
        payload: res.data.menuList
      };
    });
}