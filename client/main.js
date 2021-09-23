import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index';
import { createStore } from './store/index';
import { sync } from 'vuex-router-sync'
import Cookie from 'vue-cookies'
import axios from 'axios'
import api from './api/desktop'
Vue.config.productionTip = false

export function createApp() {
  const router = createRouter()
  const store = createStore()
  Vue.use(Cookie)
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App),
    metaInfo: {},
    beforeMount() {
      const token = this.$cookies.get('x-token')
      const sessionId = this.$cookies.get('x-session-id')
      console.log(token)
      if (token) api.axios.defaults.headers['x-token'] =  token;
      api.axios.defaults.headers['session-id'] = sessionId
    }

  })
  return { app, router, store }
}
