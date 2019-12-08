<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-default" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
              <h1 style="color:#fff;margin:0;">Movil Perú</h1>
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="ni ni-bell-55"></i>
                        </a>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </base-dropdown>
                    <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img src="img/theme/team-1-800x800.jpg">
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Bienvenido</h6>
                        </div>
                        <router-link to="/index" class="dropdown-item">
                            <i class="ni ni-world-2"></i>
                            <span>Inicio</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Mi Perfil</span>
                        </router-link>
                        <!-- <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Activity</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Support</span>
                        </router-link> -->
                        <div class="dropdown-divider"></div>
                        <div class="dropdown-item" @click="logout()">
                            <i class="ni ni-user-run"></i>
                            <span>Cerrar Sesión</span>
                        </div>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show bg-default" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <h1 style="color:#fff;margin:0;">Movil Perú</h1>
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
import Swal from 'sweetalert2'
const axios = require('axios');
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    data(){
      return {
        tipo: this.$store.state.data.idRol
      }
    },
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/green.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description:
          'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      },
      logout(){        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        })

        swalWithBootstrapButtons.fire({
            title: '¿Seguro que quiere cerrar su sesión?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Cancelar',
            cancelButtonText: 'Cerrar Sesión',
            reverseButtons: true
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                html: '<h2>Cerrando sesión</h2>',
                timer: 1000,
                onBeforeOpen: () => {
                  Swal.showLoading(); 
                },
                onClose: () =>{
                  localStorage.removeItem("eyJ0eXAiOV1QiLCJhbGciOiJIUzI1NiJ9IU");
                  localStorage.removeItem("data");
                  this.$router.replace("/login");
                }
              })
          }
        })
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
