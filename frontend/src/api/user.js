import axios from 'axios';
import request from '../interceptor.js';

export function register(username, password, email) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data: {
      username,
      password,
      email
    }
  });
}

export function login(username, password) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

export function getInfo(interceptorHint) {
  return axios({
    url: '/api/user/getInfo',
    method: 'get',
    params: { interceptorHint }
  });
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  });
}

export function findPassword(username = '') {
  return request({
    url: '/api/user/findPassword',
    method: 'post',
    timeout: 20000,
    data: {
      username
    }
  });
}

/**
 * 更换密码
 *
 * @export
 * @param {string} [oldPass=''] 旧密码
 * @param {string} [newPass=''] 新密码
 * @returns
 */
export function changePass(oldPass = '', newPass = '') {
  return request({
    url: '/api/user/changePassword',
    method: 'post',
    data: {
      oldPass,
      newPass
    }
  });
}

export function writeOff() {
  return request({
    url: '/api/user/writeOff',
    method: 'post'
  });
}
