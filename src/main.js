import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({mode: 'history', routes});
const store = new Vuex.Store({
  state: {
    token: '',
    userId: '',
    roleId: ''
  }, 
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUserId (state, userId) {
      state.userId = userId
    },
    setRoleId (state, roleId) {
      state.roleId = roleId
    },
    setInfos (state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.roleId = payload.roleId;

    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');