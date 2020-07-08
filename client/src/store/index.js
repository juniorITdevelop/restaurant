import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueJwtDecode from 'vue-jwt-decode'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    isActive: false,
    loginUserData: {},
    currentUserData: {},
    userData: {},
    usersData: [],
    logsSystem: [],
    MenuCategories: [],
    dishesMenu:[],
    feedbackData:[],
    orders:[],
    purchases:[],
    statistics: {}
  },
  mutations: {
    loadLoginUserData(state, payload){
      state.loginUserData = payload;
    },
    loadCurrentUserData(state, payload){
      state.currentUserData = payload;
    },
    loadUserData(state, payload){
      state.userData = payload;
    },
    loadUsersData(state, payload){
      state.usersData = payload;
    },
    loadLogsSystem(state, payload){
      state.logsSystem = payload;
    },
    loadMenuCategories(state, payload){
      state.MenuCategories = payload;
    },
    loadDishesMenu(state, payload){
      state.dishesMenu = payload;
    },
    loadFeedback(state, payload){
      state.feedbackData = payload;
    },
    loadOrders(state, payload){
      state.orders = payload;
    },
    loadPurchases(state, payload){
      state.purchases = payload;
    },
    loadStatistics(state, payload){
      state.statistics = payload;
    }
  },
  getters:{
    getLoginUserData(state){
      return state.loginUserData;
    },
    getCurrentUserData(state){
      return state.currentUserData;
    },
    getUserData(state){
      return state.userData;
    },
    getUsersData(state){
      return state.usersData;
    },
    getLogsSystem(state){
      return state.logsSystem;
    },
    getMenuCategories(state){
      return state.MenuCategories;
    },
    getDishesMenu(state){
      return state.dishesMenu;
    },
    getFeedback(state){
      return state.feedbackData;
    },
    getOrders(state){
      return state.orders;
    },
    getPurchases(state){
      return state.purchases;
    },
    getStatistics(state){
      return state.statistics
    }
  },
  actions: {
    clearAll(context){
      context.commit('loadLoginUserData', {});
      context.commit('loadCurrentUserData', {});
    },
    loadLoginUserData(context, loginData){
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/api/login', loginData)
        .then((response) => {
          context.commit('loadLoginUserData', VueJwtDecode.decode(response.data.token));
          sessionStorage.setItem('currLoginUserData', JSON.stringify(VueJwtDecode.decode(response.data.token)));
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadCurrentUserData(context, userId){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/user/' + userId)
        .then((response) => {
          context.commit('loadCurrentUserData', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadUserData(context, userId){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/user/' + userId)
        .then((response) => {
          context.commit('loadUserData', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadUsersData(context){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/users')
        .then((response) => {
          context.commit('loadUsersData', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadLogsSystem(context){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/logs')
        .then((response) => {
          context.commit('loadLogsSystem', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadMenuCategories(context){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/categories')
        .then((response) => {
          context.commit('loadMenuCategories', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadDishesMenu(context,dishesId){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/categoryDishes/'+ dishesId)
        .then((response) => {
          context.commit('loadDishesMenu', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadFeedback(context){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/getFeedback')
        .then((response) => {
          context.commit('loadFeedback', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadOrders(context){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/orders')
        .then((response) => {
          context.commit('loadOrders', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadPurchases(context){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/purchases')
        .then((response) => {
          context.commit('loadPurchases', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    },
    loadStatistics(context){
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/statistics')
        .then((response) => {
          context.commit('loadStatistics', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err)
        });
      });
    }
  }
})
