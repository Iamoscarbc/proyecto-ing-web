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
          <th># Viaje</th>
          <th>Tipo Viaje</th>
          <th>Fecha de Compra</th>
          <th>Origen (Ida)</th>
          <th>Destino (Ida)</th>
          <th>Origen (Vuelta)</th>
          <th>Destino (Vuelta)</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
            <th scope="row">
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" style="text-transform:capitalize">{{row.idVenta}}</span>
                </badge>
            </th>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" style="text-transform:capitalize" v-if="vueltaOrigen == null">Solo Ida</span>
                    <span class="status" style="text-transform:capitalize" v-else>Ida y Vuelta</span>
                </badge>
            </td>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" style="text-transform:capitalize">{{row.fechaCompra}}</span>
                </badge>
            </td>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" style="text-transform:capitalize">{{row.idaOrigen}}</span>
                </badge>
            </td>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" style="text-transform:capitalize">{{row.idaDestino}}</span>
                </badge>
            </td>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" style="text-transform:capitalize" v-if="vueltaOrigen == null">-</span>
                    <span class="status" style="text-transform:capitalize" v-else>{{row.vueltaOrigen}}</span>
                </badge>
            </td>
            <td>
                <badge class="badge-dot mr-4" :type="`bg-success`">
                    <span class="status" style="text-transform:capitalize" v-if="vueltaDestino == null">-</span>
                    <span class="status" style="text-transform:capitalize" v-else>{{row.vueltaDestino}}</span>
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
            <!-- <td class="text-right">
                <base-dropdown class="dropdown"
                            position="right" style="cursor:pointer">
                  <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-ellipsis-v"></i>
                  </a>

                  <template>
                      <button class="dropdown-item" v-b-modal.modal-editar @click="obtenerId(row.id)">Configuración</button>
                  </template>
                </base-dropdown>
            </td> -->
        </template>

      </base-table>
    </div>

    <!-- <Modal1 :id_user="id_user" :tableData="tableData"></Modal1>     -->

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <!-- <base-pagination :total="total"></base-pagination> -->
    </div>

  </div>
</template>
<script>
// import Modal1 from '../Modal/Modal1'
  export default {
    name: 'historial',
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
            this.$store.dispatch('get_pasajes',{
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
