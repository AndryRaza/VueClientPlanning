import Vue from 'vue';
import Vuex from 'vuex';
import jwtDecode from 'jwt-decode';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './routes';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: '',
    userId: '',
    roleId: '',
    isLogged: false
  }, 
  mutations: {
    setToken (state, token) {
      state.token = token;
    },
    setUserId (state, userId) {
      state.userId = userId;
    },
    setRoleId (state, roleId) {
      state.roleId = roleId;
    },
    setIsLogged (state, bool) {
      state.isLogged = bool;
    },
    setInfos (state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.roleId = payload.roleId;

    },
  },
  actions: {
    checkTokenExpirationDate (context) {
      let token = context.state.token.replace("Bearer ", "");
      let expDate = jwtDecode(token).exp;
      console.log('before', context.state, store)
      if ( Date.now() >= (expDate * 1000) ) {
        context.commit('setIsLogged', false);
      } else {
        context.commit('setIsLogged', true);
      }
      console.log('after', context.state)

    }
  }
});

const router = new VueRouter({mode: 'history', routes});

// middleware to control access on routes
router.beforeEach( ( to, from, next ) => {  
  
  if (to.name !== "Login" && !store.state.isLogged) next({name: 'Login'})
  else next()
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');