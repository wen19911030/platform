import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '',
      component: () => import('../components/content.vue'),
      hidden: true,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../pages/home'),
          meta: {
            crumbs: [{ name: 'home', value: '主页' }]
          }
        },
        {
          path: '/user/change-password',
          name: 'change-password',
          component: () => import('../pages/change-password'),
          meta: {
            crumbs: [
              { name: '', value: '用户管理' },
              { name: 'change-password', value: '修改密码' }
            ]
          }
        }
      ]
    },
    {
      path: '/merchant',
      component: () => import('../components/content.vue'),
      children: []
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../pages/404'),
      hidden: true
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/register.vue')
    },
    {
      path: '/find-password',
      name: 'find-password',
      component: () => import('../pages/find-password.vue')
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
});

const whiteList = ['login', 'register', 'find-password']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.getters.user.username) {
    isLoginCB(to, next);
  } else {
    store
      .dispatch('GETINFO', 'needless')
      .then(() => {
        isLoginCB(to, next);
      })
      .catch(() => {
        if (whiteList.indexOf(to.name) > -1) {
          next();
          NProgress.done();
        } else {
          next('/login');
          NProgress.done();
        }
      });
  }
});

router.afterEach(() => {
  NProgress.done();
  NProgress.remove();
});

function isLoginCB(to, next) {
  if (to.name === 'login') {
    next({ path: '/' });
    NProgress.done();
  } else {
    next();
    NProgress.done();
  }
}

export default router;
