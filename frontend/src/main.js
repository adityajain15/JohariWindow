import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import 'tachyons'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(
  new VueSocketIO({
    debug: process.env.NODE_ENV === 'production' ? false : true,
    connection:
      process.env.NODE_ENV === 'production'
        ? 'https://sigri.com/johari-window/socket.io/'
        : 'http://localhost:8000',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  }),
)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
