<template>
    <div class="d-flex flex-column contenedor-reserva bg-white p-4" style="border-radius:10px;">
        <div class="d-flex flex-row justify-content-between">
            <h1 class="text-danger" v-if="this.idviajesElegidos.length == 2">Ida y Vuelta</h1>
            <h1 class="text-danger" v-else>Solo Ida</h1>
            <h1 class="text-default">FORMULARIO PARA RESERVA</h1>
            <button class="btn btn-danger" @click="cancelar()">Cancelar Reserva</button>
        </div>
        <div class="d-flex flex-row justify-content-between mt-3 mb-3" v-if="this.idviajesElegidos.length == 2">
            <div class="d-flex flex-column" style="width:47%;">
                <span class="text-danger d-flex flex-row alig-items-center" style="width:100%;max-height:27px;" 
                :title="idviajesElegidos[0].Origen+`-`+idviajesElegidos[0].Destino" >
                    Ida:
                    <span class="text-default" style="text-overflow:ellipsis;overflow:hidden;">{{idviajesElegidos[0].Origen}} - {{idviajesElegidos[0].Destino}}</span>
                </span>                
                <span class="text-danger d-flex flex-row alig-items-center">
                    Hora de Ida: 
                    <span class="text-default pl-2"> {{idviajesElegidos[0].horaSalida}}</span>
                </span>
            </div>
            <div class="d-flex flex-column" style="width:47%;">
                <span class="text-danger d-flex flex-row alig-items-center" style="width:100%;max-height:27px;"
                :title="idviajesElegidos[1].Origen+`-`+idviajesElegidos[1].Destino">
                    Vuelta:
                    <span class="text-default" style="text-overflow:ellipsis;overflow:hidden;">{{idviajesElegidos[1].Origen}} - {{idviajesElegidos[1].Destino}}</span>
                </span>             
                <span class="text-danger d-flex flex-row alig-items-center">
                    Hora de Vuelta: 
                    <span class="text-default pl-2"> {{idviajesElegidos[1].horaSalida}}</span>
                </span>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-between mt-3 mb-3" v-else>
            <div class="d-flex flex-column" style="width:100%;">
                <span class="text-danger d-flex flex-row alig-items-center"  style="width:100%;max-height:24px;"
                :title="idviajesElegidos[0].Origen+`-`+idviajesElegidos[0].Destino">
                    Ida:
                    <span class="text-default" style="text-overflow:ellipsis;overflow:hidden;">{{idviajesElegidos[0].Origen}} - {{idviajesElegidos[0].Destino}}</span>
                </span>             
                <span class="text-danger d-flex flex-row alig-items-center">
                    Hora de Ida: 
                    <span class="text-default pl-2"> {{idviajesElegidos[0].horaSalida}}</span>
                </span>
            </div>
        </div>
        <div class="d-flex flex-column align-items-start">
            <h2>Información de Pasajeros</h2>
            <div class="d-flex flex-column align-items-start p-2" style="width:100%;">
                <h3>Adultos: {{adultos}}</h3>
                <div class="bg-tabs mb-3 p-4" v-for="(valor,i) in adultos" :key="i" style="width:100%;border-radius: 10px;">
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <base-input class="input-group-alternative mb-3 "
                                    :inputClasses="`nombres`"
                                    style="max-width:45%;"
                                    placeholder="Nombres"
                                    type="text"
                                    addon-left-icon="ni ni-circle-08">
                        </base-input>
                        <base-input class="input-group-alternative mb-3 "
                                    :inputClasses="`apellidos`"
                                    style="max-width:45%;"
                                    placeholder="Apellidos"
                                    type="text"
                                    addon-left-icon="ni ni-circle-08">
                        </base-input>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-badge"></i>
                            </span>
                            <v-select :options="tipoDoc" `
                                    class="bg-white" 
                                    style="width:100%;" 
                                    :reduce="tipoDoc => tipoDoc" 
                                    label="tipoDoc" 
                                    placeholder="Selecciona tu Documento"
                                    :input-id="`tipo_documento_adulto`+i"></v-select>
                        </div>
                        <base-input class="input-group-alternative mb-0 "
                                    :inputClasses="`numero_documento`"
                                    style="max-width:45%;"
                                    placeholder="Número de Documento"
                                    addon-left-icon="ni ni-badge"
                                    type="number"
                                    min="10000000" max="99999999">
                        </base-input>
                    </div>
                </div>
            </div>
            <div v-if="ninos != 0" class="d-flex flex-column align-items-start p-2" style="width:100%;">
                <h3>Niños: {{ninos}}</h3>
                <div class="bg-tabs mb-3" v-for="(valor,i) in ninos" :key="i" style="width:100%;border-radius: 10px;">
                    a
                </div>
            </div>
            <div v-if="bebes != 0" class="d-flex flex-column align-items-start p-2" style="width:100%;">
                <h3>Bebés: {{bebes}}</h3>
                <div class="bg-tabs mb-3" v-for="(valor,i) in bebes" :key="i" style="width:100%;border-radius: 10px;">
                    a
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            idviajesElegidos: "",
            adultos: "",
            ninos: "",
            bebes: ""
        },
        data() {
            return {
                tipoDoc:[
                    { tipoDoc: "DNI"},
                    { tipoDoc: "Pasaporte"}
                ],                
            }
        },
        mounted() {

        },
        methods: {
            cancelar(){
                this.$router.push({name: 'index'})
            }
        },
    }
</script>

<style>
    .contenedor-reserva{
        margin-top: 2rem;
        width:80%;
    }
</style>