import Vue from 'vue';
import Router from 'vue-router';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import HelloWorld from '@/components/HelloWorld';

NProgress.configure({ showSpinner: false });

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      path: '/home',
      name: 'home',
      component: () => import('../pages/home.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
  NProgress.remove();
});

export default router;
