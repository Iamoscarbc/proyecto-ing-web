<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="d-flex flex-row justify-content-center mb-3">
                <h1 class="text-white" style="text-transform:capitalize">Login</h1>
            </div>
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3"><small>Loguearse con</small></div>
                    <div class="btn-wrapper text-center">
                        <a href="#" class="btn btn-neutral btn-icon disabled">
                            <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                            <span class="btn-inner--text">Github</span>
                        </a>
                        <a href="#" class="btn btn-neutral btn-icon disabled">
                            <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                            <span class="btn-inner--text">Google</span>
                        </a>
                    </div>
                </div>
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>o Loguearse con sus credenciales</small>
                    </div>
                    <form role="form" @submit="login(model.username,model.password,$event)">
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
                            <input type="submit" class="btn btn-danger my-4" value="Ingresar">
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
        login(username, password,event){
            event.preventDefault()
            let _this = this;
            this.$store.dispatch('recuperarToken',{
                username: username,
                password: password,
            }).then(response => {
                let mensaje = response.message;
                this.$store.dispatch('recuperarData',{
                    jwt: response.jwt
                }).then(response2 => {
                    if(response2.success==false){
                        Swal.fire({
                            type: 'error',
                            title: mensaje,
                            showConfirmButton:false,                            
                            timer: 1500,  
                        })
                    }else{
                        _this.$router.push({name: 'DashboardLayout'})
                        Swal.fire({
                            type: 'success',
                            title: mensaje,
                            showConfirmButton:false,                            
                            timer: 1500,  
                        })
                    }
                })
            })
        }
    }    
  }
</script>
<style>
    .card{
        max-width:100%;
    }

</style>
