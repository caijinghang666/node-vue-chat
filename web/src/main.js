import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueSocketIO from 'vue-socket.io'


Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000'//xxx填后台给的socket地址，端口号根据实际后台端口写
}));

new Vue({
  
  render: h => h(App)
}).$mount('#app')
