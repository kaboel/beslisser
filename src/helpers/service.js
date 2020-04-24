import Axios from 'axios';
import store from '../store';
import config from './config';

// axios declaration
const api = Axios.create({
  baseURL: `${config.apiUri}/v0`,
  timeout: config.timeout,
  params: config.params
})

// request and response interceptors
api.interceptors.request.use((config) => {
  store.dispatch('setLoading', true);
  return config;
}, (error) => {
  store.dispatch('setLoading', false)
  return Promise.reject(error)
})
api.interceptors.response.use((response) => {
  store.dispatch('setLoading', false);
  return response;
}, (error) => {
  store.dispatch('setLoading', false);
  return Promise.reject(error)
})

// request headers configs
const postConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  }
}
const postSecuredConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "access_token": localStorage.getItem('token')
  }
}
const getSecuredConfig = {
  headers: {
    "access_token": localStorage.getItem('token')
  }
}

// requests starts here
const login = (data) => {
  return api.post('/user/login', data, postConfig)
}

const getUser = () => {
  return api.get('/user/me', getSecuredConfig)
}

const register = (data) => {
  return api.post('/user/register', data, postConfig)
}

export default {
  login,
  getUser,
  register
}
