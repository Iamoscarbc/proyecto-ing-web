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
                    <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-circle-08"></i>
                            </span>
                            <input type="text" class="form-control nombres_adulto"
                                    placeholder="Nombres"
                                    style="max-width:100%;">
                        </div>
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-circle-08"></i>
                            </span>
                            <input type="text" class="form-control apellidos_adulto"
                                    placeholder="Apellidos"
                                    style="max-width:100%;">
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-badge"></i>
                            </span>
                            <select :id="`tipo_documento_adulto_oculto`+i" class="form-control" style="width:0%;" v-show="i==-1">
                                <option value="DNI">DNI</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </select>
                            <v-select :options="tipoDoc"
                                    class="bg-white" 
                                    style="width:100%;" 
                                    :reduce="tipoDoc => tipoDoc" 
                                    label="tipoDoc" 
                                    placeholder="Selecciona tu Documento"
                                    :input-id="`tipo_documento_adulto`+i"
                                    @input="cambio_TipoDoc(`${i}`,$event,`adulto`)"></v-select>
                        </div>
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-badge"></i>
                            </span>
                            <input type="number" min="10000000" max="99999999" 
                                    class="form-control numero_documento_adulto"
                                    placeholder="Número de Documento"
                                    style="max-width:100%;">
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="ninos != 0" class="d-flex flex-column align-items-start p-2" style="width:100%;">
                <h3>Niños: {{ninos}}</h3>
                <div class="bg-tabs mb-3 p-4" v-for="(valor,i) in ninos" :key="i" style="width:100%;border-radius: 10px;">
                    <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-circle-08"></i>
                            </span>
                            <input type="text" class="form-control nombres_nino"
                                    placeholder="Nombres"
                                    style="max-width:100%;">
                        </div>
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-circle-08"></i>
                            </span>
                            <input type="text" class="form-control apellidos_nino"
                                    placeholder="Apellidos"
                                    style="max-width:100%;">
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-badge"></i>
                            </span>
                            <select :id="`tipo_documento_nino_oculto`+i" class="form-control" style="width:0%;" v-show="i==-1">
                                <option value="DNI">DNI</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </select>
                            <v-select :options="tipoDoc"
                                    class="bg-white" 
                                    style="width:100%;" 
                                    :reduce="tipoDoc => tipoDoc" 
                                    label="tipoDoc" 
                                    placeholder="Selecciona tu Documento"
                                    :input-id="`tipo_documento_nino`+i"
                                    @input="cambio_TipoDoc(`${i}`,$event,`nino`)"></v-select>
                        </div>
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-badge"></i>
                            </span>
                            <input type="number" min="10000000" max="99999999" 
                                    class="form-control numero_documento_nino"
                                    placeholder="Número de Documento"
                                    style="max-width:100%;">
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="bebes != 0" class="d-flex flex-column align-items-start p-2" style="width:100%;">
                <h3>Bebés: {{bebes}}</h3>
                <div class="bg-tabs mb-3 p-4" v-for="(valor,i) in bebes" :key="i" style="width:100%;border-radius: 10px;">
                    <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-circle-08"></i>
                            </span>
                            <input type="text" class="form-control nombres_bebe"
                                    placeholder="Nombres"
                                    style="max-width:100%;">
                        </div>
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-circle-08"></i>
                            </span>
                            <input type="text" class="form-control apellidos_bebe"
                                    placeholder="Apellidos"
                                    style="max-width:100%;">
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center">
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-badge"></i>
                            </span>
                            <select :id="`tipo_documento_bebe_oculto`+i" class="form-control" style="width:0%;" v-show="i==-1">
                                <option value="DNI">DNI</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </select>
                            <v-select :options="tipoDoc"
                                    class="bg-white" 
                                    style="width:100%;" 
                                    :reduce="tipoDoc => tipoDoc" 
                                    label="tipoDoc" 
                                    placeholder="Selecciona tu Documento"
                                    :input-id="`tipo_documento_bebe`+i"
                                    @input="cambio_TipoDoc(`${i}`,$event,`bebe`)"></v-select>
                        </div>
                        <div class="d-flex flex-row"
                                    style="width:45%;">
                            <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                <i class="ni ni-badge"></i>
                            </span>
                            <input type="number" min="10000000" max="99999999" 
                                    class="form-control numero_documento_bebe"
                                    placeholder="Número de Documento"
                                    style="max-width:100%;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-row justify-content-end align-items-center" style="width:100%;">
                <span class="text-default pr-4">Revisar que todos los campos esten llenos, por favor</span>
                <button class="btn btn-danger" @click="reservar()">Reservar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
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
            },
            cambio_TipoDoc(i,param,tipo){
                if(tipo=="adulto"){
                    let oculto = document.getElementById("tipo_documento_adulto_oculto"+i).value = param.tipoDoc;
                }else if(tipo == "nino"){
                    let oculto = document.getElementById("tipo_documento_nino_oculto"+i).value = param.tipoDoc;
                }else{
                    let oculto = document.getElementById("tipo_documento_bebe_oculto"+i).value = param.tipoDoc; 
                }
            },
            reservar(){
                let passangersData = []
                for (let i = 0; i < this.adultos; i++) {
                    let nombres_adulto = document.getElementsByClassName("nombres_adulto")[i].value;
                    let apellidos_adulto = document.getElementsByClassName("apellidos_adulto")[i].value;
                    let tipo_documento_adulto = document.getElementById("tipo_documento_adulto_oculto"+i).value;
                    let numero_documento_adulto = document.getElementsByClassName("numero_documento_adulto")[i].value;
                    let json_adulto = {
                        nombres: nombres_adulto,
                        apellidos: apellidos_adulto,
                        tipoDocumento: tipo_documento_adulto,
                        numDocumento: numero_documento_adulto,
                        idTipoPasaje: 1
                    }
                    passangersData.push(json_adulto)
                }
                for (let i = 0; i < this.ninos; i++) {
                    let nombres_nino = document.getElementsByClassName("nombres_nino")[i].value;
                    let apellidos_nino = document.getElementsByClassName("apellidos_nino")[i].value;
                    let tipo_documento_nino = document.getElementById("tipo_documento_nino_oculto"+i).value;
                    let numero_documento_nino = document.getElementsByClassName("numero_documento_nino")[i].value;
                    let json_nino = {
                        nombres: nombres_nino,
                        apellidos: apellidos_nino,
                        tipoDocumento: tipo_documento_nino,
                        numDocumento: numero_documento_nino,
                        idTipoPasaje: 2
                    }
                    passangersData.push(json_nino)
                }
                for (let i = 0; i < this.bebes; i++) {
                    let nombres_bebe = document.getElementsByClassName("nombres_bebe")[i].value;
                    let apellidos_bebe = document.getElementsByClassName("apellidos_bebe")[i].value;
                    let tipo_documento_bebe = document.getElementById("tipo_documento_bebe_oculto"+i).value;
                    let numero_documento_bebe = document.getElementsByClassName("numero_documento_bebe")[i].value;
                    let json_bebe = {
                        nombres: nombres_bebe,
                        apellidos: apellidos_bebe,
                        tipoDocumento: tipo_documento_bebe,
                        numDocumento: numero_documento_bebe,
                        idTipoPasaje: 3
                    }
                    passangersData.push(json_bebe)
                }
                let _this = this;
                let idViajeIda = _this.idviajesElegidos[0].idViaje;
                let idViajeVuelta = 0
                if(_this.idviajesElegidos.length != 1){
                    idViajeVuelta = _this.idviajesElegidos[1].idViaje;
                }
                this.$store.dispatch('generar_reserva',{
                    idViajeIda: idViajeIda,
                    idViajeVuelta: idViajeVuelta,
                    cantAdultos: _this.adultos,
                    cantNinos: _this.ninos,
                    cantBebes: _this.bebes,
                    passangersData: passangersData
                }).then(response => {
                    if(response.success==false){
                        Swal.fire({
                            type: 'error',
                            title: "Su reserva no fue guardada con éxito, intentelo nuevamente más tarde",
                            showConfirmButton:false,                            
                            timer: 1500,  
                        })
                    }else{
                        Swal.fire({
                            type: 'success',
                            title: "Su reserva fue guardada con éxito.",
                            html: `<h2 class="text-dark">Su número de reserva es: <span class="text-danger">${response.idVenta}</span></h2>
                                    <h3>¿Desea Enviar su ticket al correo?</h3><br/>
                                  <input class="form-control" placeholder="Correo Electrónico" type="email" id="emailEnvio"><br/>
                                  <span class="text-danger" id="observacion" style="display:none;">No es un correo electrónico válido</span></br>
                                  <div class="d-flex flex-row justify-content-between">
                                    <button class="btn btn-default" id="confirmarEnvio">Confirmar</button>
                                    <button class="btn btn-danger" id="cancelarEnvio">Cancelar</button>
                                  </div>`,
                            showConfirmButton : false,
                            onBeforeOpen: () => {

                                const confirmarEnvio = document.getElementById('confirmarEnvio')
                                const cancelarEnvio = document.getElementById('cancelarEnvio')

                                confirmarEnvio.addEventListener('click', () => {
                                    const emailEnvio = document.getElementById("emailEnvio").value;
                                    const observacion = document.getElementById("observacion")
                                    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                                    if (emailRegex.test(emailEnvio)){ 
                                        observacion.style.display = "none";      
                                        _this.$store.dispatch('sendEmail',{
                                            ticket: response.idVenta,
                                            destinatario: emailEnvio,
                                        }).then(response2 =>{
                                            Swal.fire({
                                                type: 'success',
                                                title: "Se enviará el correo hacia "+emailEnvio,
                                                timer: 2500,
                                                showConfirmButton: false
                                            })
                                            _this.$router.replace("/index");
                                        })                  
                                    }else{
                                        observacion.style.display = "";
                                    }
                                })

                                cancelarEnvio.addEventListener('click', () => {
                                    const observacion = document.getElementById("observacion")
                                    observacion.style.display = "none";  
                                    Swal.close()
                                    Swal.fire({
                                        type: 'warning',
                                        title: "No se enviará ningún correo",
                                        showCloseButton: true,
                                        showConfirmButton: false
                                    })
                                })
                            },
                        })
                    }
                })
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