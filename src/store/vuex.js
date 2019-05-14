import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import DashboardLayout from '@/layout/DashboardLayout'
// import AuthLayout from '@/layout/AuthLayout'
Vue.use(Vuex)
axios.defaults.baseURL = 'http://35.236.27.209/php_api_jwt/api'

export default new Vuex.Store({
    state: {
      token : localStorage.getItem("TKbGciOAiUbG1NiJ9iJIV1I") || null,
      data: localStorage.getItem("DiUbKbGciOAJ9v1NiNiV1IiJIV1I") || null,
    },
    getters:{
      logueado(state){
        return new Promise((resolve,reject) => {
          axios.post('/model/functions/validate_token.php',{
            jwt: state.token
          }).then(response => {
            resolve(response.data)
          }).catch(error => {
            console.log(error)
            reject(error)
          })
        })
      }
    },
    mutations: {
      recuperarToken(state, token){
        state.token = token
      },
      recuperarData(state,data){
        state.data = data
      }
    },
    actions: {
      recuperarToken(context, credentials){
        return new Promise((resolve,reject) => {
          axios.post('/controller/login.php',{
            username: credentials.username,
            password: credentials.password
          }).then(response => {
            if(response.data.success == true){
              let token = response.data.jwt
              localStorage.setItem("TKbGciOAiUbG1NiJ9iJIV1I",token)
              context.commit("recuperarToken",token)
              resolve(response.data)
            }else{
              console.log(response.data.message)
            }
          }).catch(error => {
            console.log(error)
            reject(error)
          })
        })
      },
      recuperarData(context, token){
        return new Promise((resolve,reject) => {
          axios.post('/model/functions/validate_token.php',{
            jwt: token.jwt
          }).then(response => {
            if(response.data.success == true){
              let data = response.data.data
              let data_stringify = JSON.stringify(data);
              localStorage.setItem("DiUbKbGciOAJ9v1NiNiV1IiJIV1I",data_stringify)
              context.commit("recuperarData",data)
              resolve(response.data)
            }else{
              console.log(response.data)
            }
          }).catch(error => {
            console.log(error)
            reject(error)
          })
        })
      }
    }
  })