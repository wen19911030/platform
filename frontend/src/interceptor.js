import axios from 'axios';
import { Message, MessageBox } from 'element-ui';

let baseURL = '';
if (process.env.NODE_ENV === 'test') {
  baseURL = 'htts://test.example.com';
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'htts://www.example.com';
}

const request = axios.create({
  baseURL,
  timeout: 5000
});

request.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  response => {
    // Do something with response data
    const res = response.data;
    if (res.code !== 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      return Promise.reject('error');
    }
    return response.data;
  },
  error => {
    console.log(error);
    Message({
      type: 'error',
      message: error.message,
      duration: 3 * 1000
    });
    // Do something with response error
    return Promise.reject(error);
  }
);

export default request;
