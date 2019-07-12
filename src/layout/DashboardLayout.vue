<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
    >
      <template slot="links">
        <sidebar-item v-if="this.$store.state.data.idRol == 1 || this.$store.state.data.idRol == 2"
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />

        <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
        <!-- <sidebar-item :link="{name: 'Maps', icon: 'ni ni-pin-3 text-orange', path: '/maps'}"/> -->
        <!-- <sidebar-item v-if="this.$store.state.data.idRol == 1 || this.$store.state.data.idRol == 2" :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/> -->
        <sidebar-item v-if="this.$store.state.data.idRol == 1 || this.$store.state.data.idRol == 2" :link="{name: 'Listado de Usuarios', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>
        <sidebar-item :link="{name: 'Historial de Viajes', icon: 'ni ni-books text-green', path: '/historial'}"/>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">

      <div @click="toggleSidebar">
        <!-- <dashboard-navbar></dashboard-navbar> -->
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
import jwt from 'jsonwebtoken'
  
  import Swal from 'sweetalert2'

  export default {
    components: {
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
          sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
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
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    beforeMount(){
      this.$store.state.data = jwt.decode(localStorage.getItem("TKbGciOAiUbG1NiJ9iJIV1I")).data
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
              this.$router.push({name: 'login'})
              Swal.close();
          }else{
              this.$router.push({name: 'DashboardLayout'})
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
<style lang="scss">
</style>
