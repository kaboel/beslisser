import Axios from 'axios';
import config from './config';

let token = ""
if (localStorage.getItem('token')) {
  token = localStorage.getItem('token')
}

const setToken = (token) => {
  localStorage.setItem('token', token);
}

const api = Axios.create({
  baseURL: `${config.apiUri}/v0`
})

const postConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  }
}

const getSecuredConfig = {
  headers: {
    "access_token": token
  }
}

// requests starts here
const login = (data) => {
  api.post('/user/login', data, postConfig)
    .then(res => {
      // return res;
      console.log(res)
    })
    .catch(err => {
      // return err;
      console.log(err)
    })
}

const register = (data) => {
  api.post('/user/register', data, postConfig)
    .then(res => {
      console.log(res);
      // return res;
    })
    .catch(err => {
      console.log(err)
      // return err;
    })
}

const getUser = () => {
  api.get('/user/me', getSecuredConfig)
    .then(res => {
      console.log(res);
      // return res;
    })
    .catch(err => {
      console.log(err)
      // return err;
    })
}

export default {
  login,
  register,
  getUser
}
