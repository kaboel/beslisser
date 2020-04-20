import router from '../../router';
import service from "../../helpers/service";

const state = {
  isAuthenticated: false,
  activeUser: {}
}

const getters = {
  getAuthState: (state) => state.isAuthenticated,
  getActiveUser: (state) => (state.activeUser) ? state.activeUser : null,
}

const mutations = {
  authenticate (state, data) {
    state.isAuthenticated = data
  },
  user (state, data) {
    state.activeUser = data
  }
}

const actions = {
  setAuthentication (context, token) {
    localStorage.setItem('token', token)
  },
  setUser (context, data) {
    const user = {
      id: data._id,
      name: data.name,
      email: data.email
    }
    context.commit('user', user);
    context.commit('authenticate', true)
  },
  userLogout(context) {
    localStorage.clear()
    context.commit('user', {})
    context.commit('authenticate', false)
    new Promise((resolve, reject) => {
      router.replace('/authentication').then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  checkAuth(context) {
    let token = localStorage.getItem('token')
    if (token) {
      service.getUser().then(res => {
        let data = res.data
        const user = {
          id: data._id,
          name: data.name,
          email: data.email
        }
        context.commit('user', user);
        context.commit('authenticate', true)
      }).catch(err => {
        context.commit('user', {});
        context.commit('authenticate', false)
      })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
