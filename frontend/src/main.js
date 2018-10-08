require('es6-promise/auto');

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import App from './App';
import router from './router';
import store from './store';
import svgIcon from './components/svg-icon';

Vue.component('svg-icon', svgIcon);
Vue.use(ElementUI);
// 自动引入 @/src/icons 下面所有的图标了
// require.context有三个参数：
// directory：说明需要检索的目录
// useSubdirectories：是否检索子目录
// regExp: 匹配文件的正则表达式
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/icons', false, /\.svg$/);
requireAll(req);

Vue.config.productionTip = false;

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

export default app;
