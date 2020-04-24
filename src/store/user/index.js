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
  setLogin(context, data) {
    let token = data.access_token;
    let user = {
      id: data.id,
      name: data.name,
      email: data.email
    }
    let auth = data.auth;
    localStorage.clear()
    localStorage.setItem('token', token)
    context.commit('authenticate', auth)
    context.commit('user', user);
    new Promise((resolve, reject) => {
      router.replace('/').then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  userLogout(context) {
    localStorage.clear()
    context.commit('authenticate', false)
    context.commit('user', {})
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
        if (data.auth) {
          let user = {
            id: data.id,
            name: data.name,
            email: data.email
          }
          context.commit('authenticate', data.auth)
          context.commit('user', user)
          new Promise((resolve, reject) => {
            router.replace('/').then(res => {
              resolve(res)
            }).catch(err => {
              reject(err)
            })
          })
        } else {
          new Promise((resolve, reject) => {
            router.replace('/authentication').then(res => {
              resolve(res)
            }).catch(err => {
              reject(err)
            })
          })
        }
      })
    } else {
      new Promise((resolve, reject) => {
        router.replace('/authentication').then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
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
