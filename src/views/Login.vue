<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Loguearse con</small></div>
                        <div class="btn-wrapper text-center">
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
                    </div>
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>O Loguearse con sus credenciales</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Username"
                                        type="text"
                                        addon-left-icon="ni ni-circle-08"
                                        v-model="model.username">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Recordar, mi cuenta</span>
                            </base-checkbox>

                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="login(model.username,model.password)">Ingresar</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>¿Olvidaste tu contraseña?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <a href="#" class="text-light" @click="goToRegistro()">
                            <small>Regístrate aquí</small>
                        </a>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import Swal from 'sweetalert2'
const axios = require('axios');

  export default {
    name: 'login',
    data() {
      return {
        model: {
          username: '',
          password: ''
        }
      }
    },
    methods:{
        goToRegistro(){
            let registro = document.getElementById("registro");
            registro.click();
        },
        validar_titulo(param){
            this.title_auth = this.$route.name;
        },
        isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
        login(username, password){
            let _this = this;
            this.$store.dispatch('recuperarToken',{
                username: username,
                password: password,
            }).then(response => {
                let mensaje = response.message;
                this.$store.dispatch('recuperarData',{
                    jwt: response.jwt
                }).then(response2 => {
                    _this.$router.push({name: 'DashboardLayout'})
                    Swal.fire({
                        type: 'success',
                        title: mensaje,
                        showConfirmButton:false,                            
                        timer: 1500,  
                    })
                })
            })
        }
    }    
  }
</script>
<style>
</style>

// axios({
//     method: 'post',
//     url: _this.model.dominio+'/controller/update_user.php',
//     data :{
//         jwt: jwt,
//         username: this.model.username,
//         firstname: this.model.firstname,
//         lastname: this.model.lastname
//     },
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// }).then(function (response){
//     if(response.data.success){
//         Swal.fire({
//             type: 'success',
//             title: response.data.message,
//             showConfirmButton:false,                            
//             timer: 1500,  
//         })
//         jwt = response.data.jwt;
//         axios({
//             method: 'post',
//             url: _this.model.dominio+'/model/functions/validate_token.php',
//             data :{
//                 jwt: response.data.jwt
//             },
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         }).then(function (response){
//             if(response.data.success == true){  
//                 let data_nuevo = JSON.stringify(response.data.data);
//                 localStorage.setItem("data",data_nuevo);
//                 _this.model.username = response.data.data.username;
//                 _this.model.firstname = response.data.data.firstname;
//                 _this.model.lastname = response.data.data.lastname;
//                 _this.model.tipo = response.data.data.tipo;
//             }                 
//         }).catch(function (error) {
//             Swal.fire({
//                 type: 'error',
//                 title: 'Error de servidor ' + error,
//                 showConfirmButton:false,
//                 backdrop: 'rgba(255,255,255,1)',
//                 timer: 1500,
//                 onClose: () => {
//                 _this.$router.replace("/login");
//                 }
//             })
//         });         
//     }else{
//         Swal.fire({
//             type: 'error',
//             title: response.data.message,
//             showConfirmButton:false,                            
//             timer: 1500,  
//         })
//     }                    
// }).catch(function (error) {
//     Swal.fire({
//         type: 'error',
//         title: 'Error de servidor ' + error,
//         showConfirmButton:false,
//         timer: 1500
//     })
// });