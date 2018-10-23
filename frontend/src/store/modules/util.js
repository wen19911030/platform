const state = {
  isLoading: false // 请求正在加载
};
const getters = {
  isLoading: state => state.isLoading
};
const mutations = {
  SHOW_LOADING(state) {
    state.isLoading = true;
  },
  CLOSE_LOADING(state) {
    state.isLoading = false;
  }
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
