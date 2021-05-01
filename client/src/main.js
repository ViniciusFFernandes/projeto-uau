import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import VueSession from 'vue-session'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

Vue.use(VueSweetalert2);

var options = {
  persist: true
}

Vue.use(VueSession, options)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
