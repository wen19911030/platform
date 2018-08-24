import { login, logout, getInfo, register } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const state = {
  token: getToken(),
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
  TOKEN(state, newV = '') {
    state.token = newV;
  }
};
const actions = {
  LOGIN({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo.username.trim(), userInfo.userpwd.trim())
        .then(result => {
          const token = result.data && result.data.token;
          setToken(token);
          commit('TOKEN', token);
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
          const token = result.data && result.data.token;
          setToken(token);
          commit('TOKEN', token);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
