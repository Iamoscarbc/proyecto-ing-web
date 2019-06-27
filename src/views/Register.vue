<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="d-flex flex-row justify-content-center mb-3">
                <h1 class="text-white" style="text-transform:capitalize">Registrar</h1>
            </div>
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-4">
                    <div class="text-muted text-center mt-2 mb-3">
                        <small>Registrarse con</small>
                    </div>
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
                        <small>O Registrarse con Credenciales</small>
                    </div>
                    <form role="form" @submit="register(model.username,model.password,model.confirmpassword,model.firstname,
                    model.lastname,sexo_seleccionado,fecNac,tipoDoc_seleccionado,model.numDoc,model.email,model.telefono,$event)">

                        <div class="d-flex flex-column">
                            <h2>Datos de la Cuenta</h2>
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Nombre de Usuario"
                                        addon-left-icon="ni ni-circle-08"
                                        v-model="model.username">
                            </base-input>

                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Contraseña"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Confirmar contraseña"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.confirmpassword">
                            </base-input>

                        </div>
                        <div class="d-flex flex-column mt-3"> 
                            <h2>Datos Personales</h2>                               
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
                            <div class="d-flex flex-row">
                                <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                    <i class="ni ni-bullet-list-67"></i>
                                </span>
                                <v-select @input="cambioSexo" :options="sexo" class="bg-white" style="width:100%;" :reduce="sexo => sexo" label="sexo" placeholder="Selecciona tu Sexo"></v-select>
                            </div>
                            <div class="d-flex flex-row mt-3">
                                <span class="input-group-text" @click="calendar('fecNac')" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                    <i class="ni ni-calendar-grid-58"></i></span>
                                <datetime v-model="fecNac" :min-datetime="min_fecNac" :max-datetime="max_fecNac" :input-id="'fecNac'" :input-class="'form-control'" style="width:100%;" :input-style="'border-left: none; border-top-left-radius: initial; border-bottom-left-radius: initial; padding: 3px;'"></datetime>
                            </div>
                            <div class="d-flex flex-row mt-3 mb-3">
                                <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                    <i class="ni ni-badge"></i>
                                </span>
                                <v-select @input="cambiotipoDoc" :options="tipoDoc" class="bg-white" style="width:100%;" :reduce="tipoDoc => tipoDoc" label="tipoDoc" placeholder="Selecciona tu Documento"></v-select>
                            </div>
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Número de Documento"
                                        addon-left-icon="ni ni-badge"
                                        v-model="model.numDoc"
                                        type="number"
                                        min="10000000" max="99999999">
                            </base-input>
                        </div>
                        <div class="d-flex flex-column">
                            <h2>Contacto</h2>
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Correo Electrónico"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email"
                                        type="email">
                            </base-input>
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Número de Teléfono"
                                        addon-left-icon="ni ni-mobile-button"
                                        v-model="model.telefono"
                                        type="number"
                                        min="900000000" max="999999999">
                            </base-input>
                        </div>

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
                            <input type="submit" class="btn btn-danger my-4" value="Registrarse">
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
          username: '',
          password: '',
          confirmpassword : '',
          firstname: '',
          lastname: '',
          numDoc: '',
          email: '',
          telefono: ''
        },
        sexo: [
            {
                sexo: "Masculino"
            },
            {
                sexo: "Femenino"
            },
            {
                sexo: "Prefiero No Decirlo"
            }
        ],
        sexo_seleccionado : "",
        tipoDoc:[
            { tipoDoc: "DNI"},
            { tipoDoc: "Pasaporte"}
        ],
        tipoDoc_seleccionado : "",
        fecNac: "",
        min_fecNac: "",
        max_fecNac: "",
        password_power: '',
      }
    },
    beforeMount() {
        let f = new Date();
        let hoy = f.toISOString();
        let hoy_min = hoy.split("-");
        let hoy_max = hoy.split("-");
        hoy_min[0] = hoy_min[0]-90;
        hoy_max[0] = hoy_max[0]-18;
        this.min_fecNac = hoy_min.join("-");
        this.max_fecNac = hoy_max.join("-");
    },
    methods:{
        register(username,password,confirm,nombres,apellidos,genero,fecNac,tipoDocumento,numDocumento,correoElectronico,telefono,event){
            event.preventDefault();
            let arreglo_observaciones = [];
            let fecNac_Ok = ""
            if(fecNac != ""){
                let fecha = new Date(fecNac)
                fecha.setDate(fecha.getDate()-1)
                fecNac = fecha.toISOString();
                fecNac_Ok = fecNac.split("T");
            }else{
                arreglo_observaciones.push("Seleccione su fecha de Nacimiento, por favor");
            }
            if(username.length < 8){
                arreglo_observaciones.push("El Usuario debe contener más de 8 caracteres");
            }
            if(password.length < 8){
                arreglo_observaciones.push("La Contraseña debe contener más de 8 caracteres");
            }else{
                if(password != confirm){
                    arreglo_observaciones.push("La Contraseña y la Confirmación de Contraseña no coinciden.");
                }
            }
            if(nombres.length <= 5){
                arreglo_observaciones.push("Los Nombres son muy cortos o son inválidos");
            }
            if(apellidos.length <= 5){
                arreglo_observaciones.push("Los Apellidos son muy cortos o son inválidos");
            }
            if(genero == ""){
                arreglo_observaciones.push("Seleccione un género, por favor");
            }
            if(tipoDocumento == ""){
                arreglo_observaciones.push("Seleccione un tipo de Documento, por favor");
            }
            if(arreglo_observaciones.length == 0){
                this.$store.dispatch('registrar',{
                    username: username,
                    password: password,
                    nombres: nombres,
                    apellidos: apellidos,
                    genero : genero,
                    fecNac : fecNac_Ok[0],
                    tipoDocumento : tipoDocumento,
                    numDocumento : numDocumento,
                    correoElectronico : correoElectronico,
                    telefono : telefono
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
                    console.log(error);
                });     
            }else{
                let mensaje = ""
                arreglo_observaciones.forEach((element,index) => {
                    mensaje += "<span>"+(index+1)+"."+element+"</span></br>";
                });
                Swal.fire({
                    type: 'warning',
                    title: 'Le falta corregir lo siguiente',
                    html: mensaje,
                    showConfirmButton:false
                })
            }
            // let _this = this;
            // let inputs = document.getElementsByClassName("form-group");
            // let input_first = inputs[0];
            // let input_last = inputs[1];
            // let input_user = inputs[2];
            // let input_pass = inputs[3];
            // let input_confirm = inputs[4];
            // let result = []; 
            // let terminos = document.getElementsByClassName("custom-checkbox")[0].children[0].checked;  
            // let contenedor_terminos = document.getElementsByClassName("my-4")[0];
            // for(var i in _this.model){
            //     result.push([i, _this.model [i]]);
            // }
            // let register = true;
            // result.forEach((element,i) => {
            //     var input = inputs[i];
            //     if(!element[1]){
            //         input.style.border = "1px solid red";
            //         Swal.fire({
            //             type: 'error',
            //             title: 'Campos vacíos',
            //             showConfirmButton:false
            //         })
            //         register = false;
            //     }else{  
            //         if(register == true){
            //             if(firstname.length >= 3){
            //                 if(lastname.length >= 4){
            //                     if(username.length >= 8){
            //                         if(password.length >= 8){
            //                             if(password == confirm){                        
            //                                 if(terminos == true){
            //                                     input.style.border = "none";
            //                                     contenedor_terminos.style.border = "none"
            //                                     contenedor_terminos.style.borderRadius = "0px"
            //                                     hacer_post = true;
            //                                 }else{
            //                                     input.style.border = "none";
            //                                     contenedor_terminos.style.border = "1px solid red"
            //                                     contenedor_terminos.style.borderRadius = "10px"
            //                                     Swal.fire({
            //                                         type: 'warning',
            //                                         title: 'Acepta los términos y condiciones',
            //                                         showConfirmButton:false
            //                                     })
            //                                 }
            //                             }else{
            //                                 Swal.fire({
            //                                     type: 'error',
            //                                     title: 'La Contraseña y la Confirmación de Contraseña no coinciden.',
            //                                     showConfirmButton:false
            //                                 })
            //                             }                            
            //                         }else{
            //                             Swal.fire({
            //                                 type: 'warning',
            //                                 title: 'La contraseña debe tener más de 8 caracteres.',
            //                                 showConfirmButton:false
            //                             })
            //                         }                            
            //                     }else{
            //                         Swal.fire({
            //                             type: 'warning',
            //                             title: 'Sea más detallado con su Nombre de Usuario',
            //                             showConfirmButton:false
            //                         })
            //                     }                               
            //                 }else{
            //                     Swal.fire({
            //                         type: 'warning',
            //                         title: 'Coloque un apellido válido, por favor.',
            //                         showConfirmButton:false
            //                     })
            //                 }                          
            //             }else{
            //                 Swal.fire({
            //                     type: 'warning',
            //                     title: 'Coloque un nombre válido, por favor.',
            //                     showConfirmButton:false
            //                 })
            //             }
            //         }
            //     }
            // }); 
            // if(hacer_post == true){
                // this.$store.dispatch('registrar',{
                //     username: username,
                //     password: password,
                //     nombres: nombres,
                //     genero : genero,
                //     fecNac : fecNac_Ok[0],
                //     tipoDocumento : tipoDocumento,
                //     numDocumento : numDocumento,
                //     correoElectronico : correoElectronico,
                //     telefono : telefono
                // }).then(response => {
                //     if(response.success){
                //         Swal.fire({
                //             type: 'success',
                //             title: response.message,
                //             showConfirmButton:false,                            
                //             timer: 1500,  
                //         })
                //     }else{
                //         Swal.fire({
                //             type: 'warning',
                //             title: response.message,
                //             showConfirmButton:false
                //         })
                //     }   
                // }).catch(function (error) {
                //     Swal.fire({
                //         type: 'error',
                //         title: 'Error de servidor ' + error,
                //         showConfirmButton:false
                //     })
                // });                
            // }
        },
        calendar(param){
            let datetime = document.getElementById(param);
            datetime.click();
        },
        goToLogin(){
            let login = document.getElementById("login");
            login.click();           
        },
        cambioSexo(param){
            this.sexo_seleccionado = param.sexo;
        },
        cambiotipoDoc(param){
            this.tipoDoc_seleccionado = param.tipoDoc;
        }
    }
  }
</script>
<style>
 .vs__dropdown-toggle{
    border-left: none;
    border-top-left-radius: initial;
    border-bottom-left-radius: initial;
    padding: 3px;
 }
 .vs__search{
     color: #aeabab;
 }
</style>
