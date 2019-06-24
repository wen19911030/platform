import axios from 'axios';
import app from '@/main.js';
import { list2 } from '@/assets/connect.list';

let baseURL = '';

const CancelToken = axios.CancelToken;
const pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const reg = new RegExp(baseURL);
const removePending = (config = {}, f) => {
  let url = config.url
    .split('?')[0]
    .replace(reg, '');
  let i = pending.indexOf(url);
  if (i > -1) {
    if (typeof f === 'function') {
      f();
    } else {
      pending.splice(i, 1);
    }
  } else {
    pending.push(url);
  }
};


const request = axios.create({
  baseURL,
  timeout: 5000
});

request.defaults.retry = 2;
request.defaults.retryDelay = 1000;

// 加载进度设置
let requestingCount = 0;
const handleRequestLoading = () => {
  requestingCount++;
  if (requestingCount) {
    app.$store.commit('SHOW_LOADING');
  }
};
const handleResponseLoading = () => {
  requestingCount--;
  if (!requestingCount) {
    app.$store.commit('CLOSE_LOADING');
  }
};

request.interceptors.request.use(
  config => {
    handleRequestLoading();
    let url = config.url.split('?')[0].replace(reg, '');
    // 判断该请求是不是在list2列表中；
    let isExist = list2.some(item => item.indexOf(url) > -1);
    if (!isExist) {
      // TODO 取消请求
      config.cancelToken = new CancelToken(c => {
        removePending(config, c);
      });
    }
    return config;
  },
  error => {
    console.log(error.config);
    handleResponseLoading();
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  response => {
    handleResponseLoading();
    removePending(response.config);
    const res = response.data;
    if (res.code !== 0) {
      // 不需要在拦截器提示的，params参数里有interceptorHint信息，且等于needless
      if (
        !(
          response.config.params &&
          response.config.params.interceptorHint === 'needless'
        )
      ) {
        app.$message.warning(res.message);
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
    return res;
  },
  error => {
    if (axios.isCancel(error)) {
      handleResponseLoading();
      console.log('Request canceled');
    } else {
      const config = error.config;
      removePending(config);
      if (!config || !config.retry) {
        handleResponseLoading();
        app.$message.error(error.message);
        return Promise.reject(error);
      }
      config.__retryCount = config.__retryCount || 0;
      if (config.__retryCount >= config.retry) {
        handleResponseLoading();
        app.$message.error(error.message);
        return Promise.reject(error);
      }
      config.__retryCount += 1;
      const backoff = new Promise(resolve => {
        setTimeout(() => {
          handleResponseLoading();
          app.$nextTick(() => {
            resolve();
          });
        }, config.retryDelay || 1);
      });

      return backoff.then(() => {
        return request(config);
      });
    }
    return Promise.reject(error);
  }
);

export default request;
