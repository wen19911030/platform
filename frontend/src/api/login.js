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
  return request({
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
