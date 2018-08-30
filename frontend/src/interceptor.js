import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { list2 } from './assets/connect.list';

const storage = {}; // 接口存储器

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
    // console.log(config);
    let url = config.url;
    // 判断该请求是不是在list2列表中；
    let isExist = list2.some(item => item.indexOf(url.split('?')[0]) > -1);
    if (!isExist) {
      if (storage[url]) {
        return;
      }
      storage[url] = true;
    }

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
    let url = response.config.url.split('?')[0];
    // let isExist = list2.some(item => item.indexOf(url.split('?')[0]) > -1);
    storage[url] = false;

    // Do something with response data
    const res = response.data;
    if (res.code !== 0) {
      // 不需要在拦截器提示的，params参数里有interceptorHint信息，且等于needless
      if (
        !(
          response.config.params &&
          response.config.params.interceptorHint === 'needless'
        )
      ) {
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        });
      }
      // 1: 用户未登录
      if (res.code === 1) {
        // 不可再此跳转到登录页面，会导致router.beforeEach循环调用
      }
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
    return res.data;
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
