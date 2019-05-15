<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <small>Registrarse con</small>
                    </div>
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
                        <small>O Registrarse con Credenciales</small>
                    </div>
                    <form role="form">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Nombres"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="model.firstname">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Apellidos"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="model.lastname">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Nombre de Usuario"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.username">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Contraseña"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Confirmar contraseña"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.confirmpassword">
                        </base-input>

                        <div class="text-muted font-italic" v-if="password_power">
                            <small>Fuerza de Contraseña: <span class="text-success font-weight-700">{{password_power}}</span></small>
                        </div>

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">Acepto los <a href="#!">Términos y Condiciones</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click="register(model.firstname,model.lastname,model.username,model.password,model.confirmpassword)">Crear Cuenta</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>¿Olvidaste tu contraseña?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <a href="#" class="text-light" @click="goToLogin()">
                        <small>Loguearme con mi cuenta</small>
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
    name: 'register',
    data() {
      return {
        model: {
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          confirmpassword : ''
        },
        password_power: ''
      }
    },
    methods:{
        register(firstname,lastname,username,password,confirm){
            let _this = this;
            let inputs = document.getElementsByClassName("form-group");
            let input_first = inputs[0];
            let input_last = inputs[1];
            let input_user = inputs[2];
            let input_pass = inputs[3];
            let input_confirm = inputs[4];
            let result = []; 
            let terminos = document.getElementsByClassName("custom-checkbox")[0].children[0].checked;  
            let contenedor_terminos = document.getElementsByClassName("my-4")[0];
            for(var i in _this.model){
                result.push([i, _this.model [i]]);
            }
            let register = true;
            let hacer_post = false;
            result.forEach((element,i) => {
                var input = inputs[i];
                if(!element[1]){
                    input.style.border = "1px solid red";
                    Swal.fire({
                        type: 'error',
                        title: 'Campos vacíos',
                        showConfirmButton:false
                    })
                    register = false;
                }else{  
                    if(register == true){
                        if(firstname.length >= 3){
                            if(lastname.length >= 4){
                                if(username.length >= 8){
                                    if(password.length >= 8){
                                        if(password == confirm){                        
                                            if(terminos == true){
                                                input.style.border = "none";
                                                contenedor_terminos.style.border = "none"
                                                contenedor_terminos.style.borderRadius = "0px"
                                                hacer_post = true;
                                            }else{
                                                input.style.border = "none";
                                                contenedor_terminos.style.border = "1px solid red"
                                                contenedor_terminos.style.borderRadius = "10px"
                                                Swal.fire({
                                                    type: 'warning',
                                                    title: 'Acepta los términos y condiciones',
                                                    showConfirmButton:false
                                                })
                                            }
                                        }else{
                                            Swal.fire({
                                                type: 'error',
                                                title: 'La Contraseña y la Confirmación de Contraseña no coinciden.',
                                                showConfirmButton:false
                                            })
                                        }                            
                                    }else{
                                        Swal.fire({
                                            type: 'warning',
                                            title: 'La contraseña debe tener más de 8 caracteres.',
                                            showConfirmButton:false
                                        })
                                    }                            
                                }else{
                                    Swal.fire({
                                        type: 'warning',
                                        title: 'Sea más detallado con su Nombre de Usuario',
                                        showConfirmButton:false
                                    })
                                }                               
                            }else{
                                Swal.fire({
                                    type: 'warning',
                                    title: 'Coloque un apellido válido, por favor.',
                                    showConfirmButton:false
                                })
                            }                          
                        }else{
                            Swal.fire({
                                type: 'warning',
                                title: 'Coloque un nombre válido, por favor.',
                                showConfirmButton:false
                            })
                        }
                    }
                }
            }); 
            if(hacer_post == true){
                this.$store.dispatch('registrar',{
                    firstname: firstname,
                    lastname : lastname,
                    username: username,
                    password: password
                }).then(response => {
                    if(response.success){
                        Swal.fire({
                            type: 'success',
                            title: response.message,
                            showConfirmButton:false,                            
                            timer: 1500,  
                        })
                    }else{
                        Swal.fire({
                            type: 'warning',
                            title: response.message,
                            showConfirmButton:false
                        })
                    }   
                }).catch(function (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error de servidor ' + error,
                        showConfirmButton:false
                    })
                });                
            }
        },
        goToLogin(){
            let login = document.getElementById("login");
            login.click();           
        }
    }
  }
</script>
<style>
</style>
