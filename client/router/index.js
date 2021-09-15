import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
Vue.use(VueMeta)


export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      }
    ]
  })
}
