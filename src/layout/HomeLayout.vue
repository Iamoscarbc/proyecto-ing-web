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
              name: 'Inicio',
              icon: 'ni ni-planet text-primary',
              path: '/index',
            }"
          />
          <sidebar-item :link="{name: 'Nosotros', icon: 'ni ni-single-02 text-yellow', path: '/aboutus'}"/>
          <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-orange', path: '/login'}"/> 
          <sidebar-item :link="{name: 'Registro', icon: 'ni ni-circle-08 text-blue', path: '/registro'}"/>
          <!-- <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>  -->

        </template>
      </side-bar>
    <div class="main-content" :data="sidebarBackground">

      <div @click="toggleSidebar">
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