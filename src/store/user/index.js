import service from '../../helpers/service';
import { SET_USER  } from "./mutation-types";

const state = {
  isAuthenticated: false,
  activeUser: {}
}
const getters = {
  getActiveUser: (state) => (state.activeUser) ? state.activeUser : null,
}
const mutations = {
  [SET_USER](state, user) {

  }
}
const actions = {
  authenticateUser(context, data) {
    service.login(data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
