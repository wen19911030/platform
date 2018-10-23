import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user.js';
import util from '@/store/modules/util.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    util,
    user
  }
});

export default store;
