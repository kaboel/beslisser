import Vue from 'vue'
import Vuex from 'vuex'

// Modules imports
import user from './user'

Vue.use(Vuex)

const state = {
  isLoading: false
}

const getters = {
  getLoadingState: (state) => state.isLoading
}

const mutations = {
  loading(state, loading) {
    state.isLoading = loading
  }
}

const actions = {
  setLoading(context, loading) {
    context.commit('loading', loading);
  }
}

const modules = {
  user
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})

export default store
