<template>
    <div>
        <dashboard-navbar :firstname_model="model.firstname" :lastname_model="model.lastname"></dashboard-navbar>    
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 500px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-color_principal opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white" style="text-transform:capitalize">Hola {{resumirnombre}}</h1>
                        <p class="text-white mt-0">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                        <!-- <a href="#!" class="btn btn-info">Editar perfil</a> -->
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                    <div class="card card-profile shadow" style="background-color:#fff !important;color:black !important;">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img src="img/theme/team-4-800x800.jpg" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <base-button size="sm" type="info" class="mr-4">Conectar</base-button>
                                <base-button size="sm" type="default" class="float-right">Mensaje</base-button>
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div  v-if="model.firstname == 'asod8uyasuhd8ayshiduags8dygiausgd'">
                                            <span class="heading">22</span>
                                            <span class="description">Amigos</span>
                                        </div>
                                        <div  v-if="model.firstname == 'asod8uyasuhd8ayshiduags8dygiausgd'">
                                            <span class="heading">10</span>
                                            <span class="description">Fotos</span>
                                        </div>
                                        <div  v-if="model.firstname == 'asod8uyasuhd8ayshiduags8dygiausgd'">
                                            <span class="heading">89</span>
                                            <span class="description">Comentarios</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h3 style="text-transform:capitalize">
                                    {{model.firstname}} {{model.lastname}}<span class="font-weight-light">, 27</span>
                                </h3>
                                <div class="h5 font-weight-300">
                                    <i class="ni location_pin mr-2"></i>Bucharest, Romania
                                </div>
                                <div class="h5 mt-4">
                                    <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                                </div>
                                <div>
                                    <i class="ni education_hat mr-2"></i>University of Computer Science
                                </div>
                                <hr class="my-4" />
                                <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                                <a href="#">Show more</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Mi Cuenta</h3>
                                </div>
                                <div class="col-4 text-right" v-if="boton_habilitar==false">
                                    <div class="btn btn-sm btn-primary" style="cursor:pointer" @click="habilitar_editar()">Editar Perfil</div>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Username"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.username"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="First name"
                                                        placeholder="First name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.firstname"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Last name"
                                                        placeholder="Last name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.lastname"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Address -->
                                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        label="Address"
                                                        placeholder="Home Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.address"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="City"
                                                        placeholder="City"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.city"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Country"
                                                        placeholder="Country"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.country"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Postal code"
                                                        placeholder="Postal code"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.zipCode"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <!-- Description -->
                                <h6 class="heading-small text-muted mb-4">About me</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative=""
                                                    label="About Me">
                                            <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                                        </base-input>
                                    </div>
                                </div>
                                <div class="pl-lg-4">
                                    <div class="row" style="justify-content:flex-end">
                                        <div class="col text-right" v-if="boton_habilitar==true">
                                            <div class="btn btn-sm btn-primary" style="cursor:pointer" @click="guardar_cambios(model)">Guardar Cambios</div>
                                        </div>
                                        <div class="col flex-grow-1 text-right" v-if="boton_habilitar==true" style="max-width:100px">
                                            <div class="btn btn-sm btn-danger" style="cursor:pointer" @click="habilitar_editar()">Cancelar</div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DashboardNavbar from '../layout/DashboardNavbar.vue';
import Swal from 'sweetalert2'
import { setTimeout } from 'timers';
const axios = require('axios');
  export default {
    name: 'user-profile',
    data() {
      return {
        model: {
          username: this.$store.state.data.username,
          email: '',
          firstname: this.$store.state.data.firstname,
          lastname: this.$store.state.data.lastname,
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
          tipo: this.$store.state.data.tipo
        },
        boton_habilitar : false
      }
    },
    components: {
      DashboardNavbar,      
    },
    mounted(){
        let forms = document.getElementsByClassName("form-control-alternative")
        forms[2].style.textTransform = "capitalize"
        forms[3].style.textTransform = "capitalize"
        let Arreglo_data = Array.prototype.slice.call(forms);
        Arreglo_data.forEach(element => {
            element.disabled = true;
        });
    },
    methods:{
        isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
        habilitar_editar(){
            let forms = document.getElementsByClassName("form-control-alternative")
            let Arreglo_data = Array.prototype.slice.call(forms);
            if(this.boton_habilitar == false){
                Arreglo_data.forEach(element => {
                    element.disabled = false;
                });
                this.boton_habilitar = true;
            }else{
                if(this.$store.state.data){
                    this.model.username = this.$store.state.data.username;
                    this.model.firstname = this.$store.state.data.firstname;
                    this.model.lastname = this.$store.state.data.lastname;
                }
                Arreglo_data.forEach(element => {
                    element.disabled = true;
                });
                this.boton_habilitar = false;
            }
        },
        guardar_cambios(model){            
            let token = this.$store.state.token;
            let _this = this;            
            let maps = document.getElementsByClassName("ni ni-pin-3 text-orange");
            let single = document.getElementsByClassName("ni-single-02 text-yellow");
            if(token){
                this.$store.dispatch('recuperarData',{
                    jwt: token
                }).then(response => {
                    if(response.success == true){
                        _this.$store.dispatch("actualizarPerfil",{
                            jwt: token,
                            username: this.model.username,
                            firstname: this.model.firstname,
                            lastname: this.model.lastname                        
                        }).then(response => {      
                            _this.$store.commit("recuperarToken",response.jwt)
                            _this.$store.dispatch("recuperarData",response).then(response2 => {
                                maps[0].click();
                                setTimeout(() => {
                                    single[0].click();                                    
                                }, 200);
                            })
                        })
                    }else{
                        Swal.fire({
                            type: 'error',
                            title: response.message,
                            showConfirmButton:false,
                            backdrop: 'rgba(255,255,255,1)',
                            timer: 1500,
                            onClose: () => {
                                _this.$router.replace("/login");
                            }
                        })
                    }
                })
            }
            
        }
    },
    computed:{
        resumirnombre: function () {  
            let nombre  = this.model.firstname.split(' ');  
            return nombre[0]
        },
    }
  };
</script>
<style></style>
