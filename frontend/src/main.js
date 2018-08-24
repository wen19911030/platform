require('es6-promise/auto');

import Vue from 'vue';
import { Form, FormItem, Input, Button, Loading, Message } from 'element-ui';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import App from './App';
import router from './router';
import store from './store';
import iconSvg from './components/iconSvg';

const comArr = [Form, FormItem, Input, Button, iconSvg];
comArr.forEach(com => {
  Vue.component(com.name, com);
});
// 自动引入 @/src/icons 下面所有的图标了
// require.context有三个参数：
// directory：说明需要检索的目录
// useSubdirectories：是否检索子目录
// regExp: 匹配文件的正则表达式
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/icons', false, /\.svg$/);
requireAll(req);
// Vue.component(FromItem.name, Message);
// Vue.component(Input.name, Message);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
