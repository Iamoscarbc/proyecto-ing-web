<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input>
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                      <span v-if="$store.state.data" class="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">
                      </span>
                      <div class="media-body ml-2 d-none d-lg-block">
                          <span class="mb-0 text-sm  font-weight-bold" style="text-transform: capitalize;cursor:pointer;">{{nombre_Navbar}}</span>
                      </div>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Bienvenido</h6>
                        </div>
                        <router-link to="/home" class="dropdown-item">
                            <i class="ni ni-tv-2"></i>
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
                        <div class="dropdown-item" @click="logout()" style="cursor:pointer;">
                            <i class="ni ni-user-run"></i>
                            <span>Cerrar Sesión</span>
                        </div>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
import Swal from 'sweetalert2'
const axios = require('axios');
  export default {
    data() {
      return {
        firstname : this.$store.state.data.firstname || '',
        lastname : this.$store.state.data.lastname || '',
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    methods: {
      isJson(str) {
          try {
              JSON.parse(str);
          } catch (e) {
              return false;
          }
          return true;
      },
      logout(){        
        let _this = this;
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
                  localStorage.removeItem("TKbGciOAiUbG1NiJ9iJIV1I");
                  localStorage.removeItem("DiUbKbGciOAJ9v1NiNiV1IiJIV1I");
                  _this.$store.commit("recuperarToken",'')
                  _this.$store.commit("recuperarData",'')
                  _this.$router.replace("/login");
                }
              })
          }
        })
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    },
    computed:{
      nombre_Navbar(){
        if(this.$store.state.data == null){
          return ''
        }else{
          return this.firstname + " " + this.lastname;
        }
      }
    }
  };
</script>
