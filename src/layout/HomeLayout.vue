<template>
      <!-- </side-bar> -->
      <div class="main-content bg-default">
        <!-- Navbar -->
        <base-nav class="navbar-top navbar-horizontal navbar-dark"
                  containerClasses="px-4 container"
                  expand>
                <router-link slot="brand" class="navbar-brand" to="/" >
                    <img src="img/brand/white.png"/>
                </router-link>

            <template v-slot="{closeMenu}">
                <!-- Collapse header -->
                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img src="img/brand/green.png">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <button type="button"
                                    @click="closeMenu"
                                    class="navbar-toggler"
                                    aria-label="Toggle sidenav">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Navbar items -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/index">
                            <i class="ni ni-planet"></i>
                            <span class="nav-link-inner--text">Home</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/aboutus">
                            <i class="ni ni-planet"></i>
                            <span class="nav-link-inner--text">Nosotros</span>
                        </router-link>
                    </li>
                    <li v-if="auth == true" class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/dashboard">
                            <i class="ni ni-planet"></i>
                            <span class="nav-link-inner--text">Dashboard</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/login" id="login">
                            <i class="ni ni-key-25"></i>
                            <span class="nav-link-inner--text">Login</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/registro" id="registro">
                            <i class="ni ni-circle-08"></i>
                            <span class="nav-link-inner--text">Registro</span>
                        </router-link>
                    </li>
                    <li v-if="auth == true" class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/profile">
                            <i class="ni ni-single-02"></i>
                            <span class="nav-link-inner--text">Profile</span>
                        </router-link>
                    </li>
                </ul>
            </template>
        </base-nav>
        <!-- Header -->
        <div class="header bg-gradient-color_principal py-7">
            <div class="header-body text-center mb-6">
                <div class="d-flex flex-row justify-content-center">                      
                    <div class="main-content pb-5" style="width:100%;">
                      <fade-transition :duration="200" origin="center top" mode="out-in">
                          <router-view></router-view>
                      </fade-transition>
                    </div>
                </div>
            </div>
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>
        <!-- Page content -->
        <footer class="py-5">
            <div class="container">
                <div class="row align-items-center justify-content-xl-between">
                    <div class="col-xl-6">
                        <div class="copyright text-center text-xl-left text-muted">
                            &copy; {{year}} <a href="#" class="font-weight-bold ml-1"
                                               target="_blank">UCV Developers</a>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <ul class="nav nav-footer justify-content-center justify-content-xl-end">
                            <li class="nav-item">
                                <a href="#" class="nav-link" target="_blank">UCV Developers</a>
                            </li>
                            <li class="nav-item"> 
                              <router-link to="/aboutus" class="nav-link">Nosotros</router-link>
                            </li>
                            <!-- <li class="nav-item">
                                <a href="#" class="nav-link" target="_blank">Blog</a>
                            </li> -->
                            <!-- <li class="nav-item">
                                <a href="#"
                                   class="nav-link" target="_blank">MIT License</a>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <!-- <div class="main-content" :data="sidebarBackground">

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div> -->
  <!-- </div> -->
</template>

<script>
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition,SlideYUpTransition } from 'vue2-transitions';
  
  import Swal from 'sweetalert2'

  export default {
    components: {
      ContentFooter,
      SlideYUpTransition,
      FadeTransition
    },  
    data() {
      return {
        year: new Date().getFullYear(),
        showMenu: false,
        auth: false,
        login: true,
      }
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
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    beforeMount(){
      Swal.fire({
        title: 'Cargando...',
        backdrop: 'rgba(255,255,255,1)',
        onBeforeOpen: () => {
          Swal.showLoading(); 
        }
      })
      let logueado = this.$store.getters.logueado;
      logueado.then((response) => {
          if(response.success == false){
              this.$router.push({name: 'HomeLayout'})
              Swal.close();
          }else{
              this.$router.push({name: 'HomeLayout'})
              Swal.close();
              Swal.fire({
                title: `Bienvenido otra vez\nEstamos preparando todo...`,
                backdrop: 'rgba(255,255,255,1)',
                timer: 1500,
                onBeforeOpen: () => {
                  Swal.showLoading(); 
                },
              })              
          }
      });
    }    
  };
</script>

<style lang="scss" scoped>

</style>