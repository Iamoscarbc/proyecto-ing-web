<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />

        <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
        <sidebar-item :link="{name: 'Maps', icon: 'ni ni-pin-3 text-orange', path: '/maps'}"/>
        <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/>
        <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>

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
  
  import Swal from 'sweetalert2'
  const axios = require('axios');

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
    // beforeMount(){
    //     let token = this.$store.state.token; 
    //     let dominio = "http://35.236.27.209/php_api_jwt/api";
    //     localStorage.setItem("dominio",dominio);
    //     let _this = this;
    //     if(token){
    //       if(this.isJson(token)){
    //         let token_parseado = JSON.parse(token);
    //         if(token_parseado.data){
    //           if(token_parseado.data.jwt){  
    //             Swal.fire({
    //               title: 'Cargando...',
    //               backdrop: 'rgba(255,255,255,1)',
    //               onBeforeOpen: () => {
    //                 Swal.showLoading(); 
    //               }
    //             })
    //             axios({
    //                 method: 'post',
    //                 url: dominio+'/model/functions/validate_token.php',
    //                 data :{
    //                     jwt: token_parseado.data.jwt
    //                 },
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //                 }
    //             }).then(function (response){
    //                 if(response.data.success == false){
    //                   _this.$router.replace("/login");
    //                   localStorage.removeItem("eyJ0eXAiOV1QiLCJhbGciOiJIUzI1NiJ9IU"); 
    //                   Swal.close()           
    //                 }else{
    //                   _this.$router.replace("/home");        
    //                   let data = JSON.stringify(response.data.data);     
    //                   localStorage.setItem("data",data);
    //                   Swal.close()
    //                 }                   
    //             }).catch(function (error) {
    //                 Swal.fire({
    //                     type: 'error',
    //                     title: 'Error de servidor ' + error,
    //                     showConfirmButton:false,
    //                     backdrop: 'rgba(255,255,255,1)',
    //                     timer: 1500,
    //                     onClose: () => {
    //                       _this.$router.replace("/login");
    //                     }
    //                 })
    //             });
    //           }else{
    //             this.$router.replace("/login");
    //           }
    //         }else{
    //           this.$router.replace("/login");
    //         }
    //       }else{
    //         this.$router.replace("/login");
    //       }  
    //     }else{
    //       this.$router.replace("/login");
    //     }
    // },
  };
</script>
<style lang="scss">
</style>
