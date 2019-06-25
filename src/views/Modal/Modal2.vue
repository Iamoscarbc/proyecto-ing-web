<template>
    <div>
        <div>
            <b-modal id="modal-viajes" ref="my-modal" scrollable 
                :title="`Viajes Disponibles`" size="lg" hide-footer okTitle="Guardar">
                <div class="d-flex flex-column" v-if="arregloIda.length != 0">
                    <div class="d-flex flex-column align-items-start" v-if="arregloIda.length != 0" style="width:100%;">
                        <h3 class="text-default mb-2">Viajes de Ida:</h3>
                        <div class="d-flex flex-row justify-content-between p-2" v-for="(viaje,index) in arregloIda" :key="index"
                        style="border: solid 1px #32325d; margin-bottom:1rem;width:100%;">
                            <div class="d-flex flex-column">
                                <span class="text-danger">Hora Salida:</span>
                                <span class="text-default">{{viaje.horaSalida}}</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="text-danger">Lugar de Origen:</span>
                                <span class="text-default">{{viaje.Origen}}</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="text-danger">Lugar de Destino:</span>
                                <span class="text-default">{{viaje.Destino}}</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="text-danger">Precio</span>
                                <span class="text-default">{{viaje.precio}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start" v-if="arregloVuelta.length != 0" style="width:100%;">
                        <h3 class="text-default mb-2">Viajes de Vuelta:</h3>
                        <div class="d-flex flex-row justify-content-between p-2" v-for="(viaje,index) in arregloVuelta" :key="index"
                        style="border: solid 1px #32325d; margin-bottom:1rem;width:100%;">
                            <div class="d-flex flex-column">
                                <span class="text-danger">Hora Salida:</span>
                                <span class="text-default">{{viaje.horaSalida}}</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="text-danger">Lugar de Origen:</span>
                                <span class="text-default">{{viaje.Origen}}</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="text-danger">Lugar de Destino:</span>
                                <span class="text-default">{{viaje.Destino}}</span>
                            </div>
                            <div class="d-flex flex-column">
                                <span class="text-danger">Precio</span>
                                <span class="text-default">{{viaje.precio}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column" v-else>
                    No hay Resultados
                </div>
            </b-modal>
        </div> 
    </div>
</template>

<script>
    export default {
        props:{
            arregloIda:"",
            arregloVuelta:"",
        },
        data(){
            return {
                arreglo_tipos : [ ],
                click : false
            }
        },
        mounted(){

        },
        destroyed() {
            this.arregloIda = [];
            this.arregloVuelta = [];
        },
        computed:{
            
        },
        methods:{ 
            guardarForm(){
                let children = document.getElementsByClassName("dropdown-el")[0].children; 
                let opcion = "";
                for (let i = 0; i < children.length; i = i +2) {
                    const element = children[i];
                    if(element.checked == true){
                        opcion = element;
                    }
                }
                let tipo = opcion.value;
                console.log(tipo);
            }
        }
    }
</script>

<style>
    .modal-header{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 15px;
        padding-top: 15px;
        border-bottom: solid 1px #dee2e6;
    }
    .modal-title{
        font-size: 1.25rem;
    }
    .modal-body{
        padding-bottom: 5px;
    }
    .modal-footer{
        padding-top: 0px;
    }
</style>

<style>
    .dropdown-el {
    min-width: 12em;
    position: relative;
    display: inline-block;
    min-height: 2em;
    max-height: 2em;
    overflow: hidden;
    top: .5em;
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
    color: #444;
    outline: none;
    border: .06em solid #cccccc;
    border-radius: 1em;
    background-color: #ffffff;
    transition: 0.3s all ease-in-out;
    }
    .dropdown-el input:focus + label {
    background: #ffffff;
    }
    .dropdown-el input {
    width: 1px;
    height: 1px;
    display: inline-block;
    position: absolute;
    opacity: 0.01;
    }
    .dropdown-el label {
    border-top: .06em solid #d9d9d9;
    display: block;
    height: 2em;
    line-height: 2em;
    padding-left: 1em;
    padding-right: 3em;
    cursor: pointer;
    position: relative;
    transition: 0.3s color ease-in-out;
    }
    .dropdown-el label:nth-child(2) {
    margin-top: 2em;
    border-top: .06em solid #d9d9d9;
    }
    .dropdown-el input:checked + label {
    display: block;
    border-top: none;
    position: absolute;
    top: 0;
    width: 100%;
    }
    .dropdown-el input:checked + label:nth-child(2) {
    margin-top: 0;
    position: relative;
    }
    .dropdown-el::after {
    content: "";
    position: absolute;
    right: 0.8em;
    top: 0.9em;
    border: 0.3em solid #cccccc;
    border-color: #cccccc transparent transparent transparent;
    transition: .4s all ease-in-out;
    }
    .dropdown-el.expanded {
    margin-bottom: 11px;
    border: 0.06em solid #cccccc;
    background: #fff;
    border-radius: .25em;
    padding: 0;
    box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 5px 0px;
    max-height: 15em;
    }
    .dropdown-el.expanded label {
    border-top: .06em solid #d9d9d9;
    }
    .dropdown-el.expanded label:hover {
    color: #3694d7;
    }
    .dropdown-el.expanded input:checked + label {
    color: black;
    }
    .dropdown-el.expanded::after {
    transform: rotate(-180deg);
    top: .55em;
    }


</style>