import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueGoogleCharts from 'vue-google-charts'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueGoogleCharts)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
