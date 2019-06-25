import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/vuex'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import ArgonDashboard from './plugins/argon-dashboard'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(ArgonDashboard)
Vue.use(Datetime)
Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
