import Vue from 'vue'
import Vuex from 'vuex'

// Modules imports
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  }
})

export default store
