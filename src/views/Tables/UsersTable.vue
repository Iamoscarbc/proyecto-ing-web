<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <!-- <base-button type="primary" size="sm">See all</base-button> -->
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>Imagen</th>
          <th>Nombre de Usuario</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Tipo</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
            <th scope="row">
                <div class="media align-items-center">
                    <a href="#" class="avatar rounded-circle mr-3">
                        <img v-if="row.imagen"  :src="row.imagen">
                        <img v-else  src="img/brand/man.png">
                    </a>
                    <div class="media-body">
                        <span class="name mb-0 text-sm">{{row.title}}</span>
                    </div>
                </div>
            </th>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <i :class="`bg-success`"></i>
                    <span class="status">{{row.username}}</span>
                </badge>
            </td>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" style="text-transform:capitalize">{{row.nombres}}</span>
                </badge>
            </td>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" style="text-transform:capitalize">{{row.apellidos}}</span>
                </badge>
            </td>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" v-if="row.idRol == 1">Master</span>
                    <span class="status" v-else-if="row.idRol == 2">Administrador</span>
                    <span class="status" v-else>Cliente</span>
                </badge>
            </td>
            <!-- <td>
                <div class="d-flex align-items-center">
                <span class="completion mr-2">{{row.completion}}%</span>
                <div>
                    <base-progress :type="row.statusType"
                                :show-percentage="false"
                                class="pt-0"
                                :value="row.completion"/>
                </div>
                </div>
            </td> -->
            <td class="text-right">
                <base-dropdown class="dropdown"
                            position="right" style="cursor:pointer">
                  <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-ellipsis-v"></i>
                  </a>

                  <template>
                      <button class="dropdown-item" v-b-modal.modal-editar @click="obtenerId(row.id)">Configuración</button>
                  </template>
                </base-dropdown>
            </td>
        </template>

      </base-table>
    </div>

    <Modal1 :id_user="id_user" :tableData="tableData"></Modal1>    

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <!-- <base-pagination :total="total"></base-pagination> -->
    </div>

  </div>
</template>
<script>
import Modal1 from '../Modal/Modal1'
  export default {
    name: 'users-table',
    components:{
      Modal1
    },
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        tableData: [],
        total: 1,
        id_user: "",
      }
    },
    beforeCreate() {
        let token = this.$store.state.token;
        let _this = this;
        if(token){
            this.$store.dispatch('recuperarUsers',{
                jwt: token
            }).then(response => {
                if(response.success == true){
                    _this.tableData = response.data;
                    _this.total = response.data.length;
                    console.log(response.data);
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
    },
    methods:{
        obtenerId(id){
          this.id_user = id;
        }
    },
    computed: {
        tableData_cargando(){
            return this.tableData.length;
        }
    },
  }
</script>
<style>
</style>
