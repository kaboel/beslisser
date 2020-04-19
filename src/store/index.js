import Vue from 'vue'
import Vuex from 'vuex'

// Modules imports
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  }
})
