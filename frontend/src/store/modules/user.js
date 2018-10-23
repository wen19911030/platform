import { login, logout, getInfo, register } from '@/api/user';

const state = {
  user: {},
  name: '',
  avatar: '',
  roles: []
};
const getters = {
  user() {
    return state.user;
  }
};
const mutations = {
  USERINFO(state, user = {}) {
    state.user = user;
  }
};
const actions = {
  LOGIN({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo.username.trim(), userInfo.userpwd.trim())
        .then(result => {
          commit('USERINFO', result.data);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  REGISTER({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      register(
        userInfo.username.trim(),
        userInfo.userpwd.trim(),
        userInfo.email.trim()
      )
        .then(result => {
          commit('USERINFO', result.data);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  GETINFO({ commit }, flag) {
    return new Promise((resolve, reject) => {
      getInfo(flag)
        .then(result => {
          commit('USERINFO', result.data);
          resolve(result);
        })
        .catch(err => reject(err));
    });
  },
  LOGOUT({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(result => {
          commit('USERINFO', {});
          resolve(result);
        })
        .catch(err => reject(err));
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
