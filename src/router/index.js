import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authentication',
    name: 'Auth',
    component: () => import('../views/Authentication.vue'),
    meta: {
      title: 'Authentication'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Dashboard'
    },
    async beforeEnter(to, from, next) {
      let authState = await store.getters.getAuthState
      if (authState) {
        next()
      } else {
        next({
          name: "Auth"
        })
      }
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
