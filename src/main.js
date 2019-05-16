import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/vuex'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import ArgonDashboard from './plugins/argon-dashboard'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(ArgonDashboard)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
