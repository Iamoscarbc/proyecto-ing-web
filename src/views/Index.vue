<template>
    <div>
        <div class="d-flex flex-column align-items-center">
            <carouselIndex style="width:100%;"></carouselIndex>
            <div class="d-flex flex-column justify-content-around bg-default p-4 contenedor-cards">
                <b-tabs content-class="p-4 bg-tabs">
                    <b-tab title="Ida y Vuelta" active>
                        <div class="d-flex flex-column justify-content-center">
                            <div class="contenedor-ida-vuelta">                                
                                <!-- //Origen -->
                                <!-- <base-input class="input-group-alternative mb-3 tamaño-input"
                                        placeholder="Origen"
                                        type="text"
                                        addon-left-icon="ni ni-square-pin"
                                        v-model="model.origen">
                                </base-input> -->
                                <div class="d-flex flex-column align-items-center tamaño_select">
                                    <div class="d-flex flex-row align-items-center">
                                        <span>Origen:</span>
                                    </div>
                                    <div class="d-flex flex-row" style="width:100%;">
                                        <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                            <i class="ni ni-pin-3"></i>
                                        </span>
                                        <v-select :options="origen" class="bg-white" style="width:100%;" placeholder="Seleccione Origen" @input="cambio_Origen" :reduce="country => country.idOrigen" label="country"></v-select>
                                    </div>
                                </div>
                                <!-- //Destino -->
                                <!-- <base-input class="input-group-alternative mb-3 tamaño-input"
                                        placeholder="Destino"
                                        type="text"
                                        addon-left-icon="ni ni-curved-next"
                                        v-model="model.destino">
                                </base-input>-->
                                <div class="d-flex flex-column align-items-center tamaño_select">
                                    <div class="d-flex flex-row align-items-center">
                                        <span>Destino:</span>
                                    </div>
                                    <div class="d-flex flex-row" style="width:100%;">
                                        <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                            <i class="ni ni-pin-3"></i>
                                        </span>
                                        <v-select :options="destino" class="bg-white" style="width:100%;" placeholder="Seleccione Destino" @input="cambio_Destino" :reduce="country => country.idDestino" label="country"></v-select>
                                    </div>
                                </div>
                            </div>
                            <div class="contenedor-ida-vuelta">
                                <div class="d-flex flex-column">
                                    <span>Fecha de Ida:</span>
                                    <div class="d-flex flex-row">
                                        <span class="input-group-text" @click="calendar('ida')"><i class="ni ni-calendar-grid-58"></i></span>
                                        <datetime v-model="date_ida" :min-datetime="min_date_ida" :input-id="'ida'" @close="recargo" :input-class="'form-control'" style="width:100%;"></datetime>
                                    </div>
                                </div>
                                <div class="d-flex flex-column">
                                    <span>Fecha de Vuelta:</span>
                                    <div class="d-flex flex-row">
                                        <span class="input-group-text" @click="calendar('vuelta')"><i class="ni ni-calendar-grid-58"></i></span>
                                        <datetime v-model="date_regreso" :min-datetime="min_date_vuelta" :input-id="'vuelta'" :input-class="'form-control'" style="width:100%;"></datetime>
                                    </div>
                                </div>
                            </div>
                            <div class="contenedor-ida-vuelta">
                                <div class="d-flex flex-column" style="width:80%;">
                                    <span>Pasajeros</span>
                                    <div class="d-flex flex-row justify-content-between">
                                        <span style="cursor:pointer;" @click="abrir('adultos')">
                                            {{adultos}} Adultos 
                                            <svg aria-hidden="true" style="width: 7%;" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit fa-w-18 fa-lg"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" class=""></path></svg>
                                            </span>
                                        <span style="cursor:pointer;" @click="abrir('niños')">
                                            {{niños}} Niños 
                                            <svg aria-hidden="true" style="width: 7%;" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit fa-w-18 fa-lg"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" class=""></path></svg>
                                            </span>
                                        <span style="cursor:pointer;" @click="abrir('bebes')">
                                            {{bebes}} Bebés 
                                            <svg aria-hidden="true" style="width: 7%;" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit fa-w-18 fa-lg"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" class=""></path></svg>
                                            </span>
                                    </div>
                                    <div class="bg-white" style="display:none;" id="adultos">
                                        <span style="margin-left:90%;cursor:pointer;" @click="cerrar('adultos')">X</span>
                                        <div class="d-flex flex-row pr-4 pl-4 pb-4 justify-content-around">
                                            <span>Adultos: </span>
                                            <div style="cursor:pointer;" @click="restar('adultos')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-minus-circle fa-w-16 fa-fw fa-lg" style="color: red;"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" class=""></path></svg>
                                            </div>
                                            <span>{{adultos}}</span>                                        
                                            <div style="cursor:pointer;" @click="sumar('adultos')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus-circle fa-w-16 fa-fw fa-lg"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" class="" style="color: #172b4d;"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white" style="display:none;" id="niños">
                                        <span style="margin-left:90%;cursor:pointer;" @click="cerrar('niños')">X</span>
                                        <div class="d-flex flex-row pr-4 pl-4 pb-4 justify-content-around">
                                            <span>Niños: </span>
                                            <div style="cursor:pointer;" @click="restar('niños')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-minus-circle fa-w-16 fa-fw fa-lg" style="color: red;"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" class=""></path></svg>
                                            </div>
                                            <span>{{niños}}</span>                                        
                                            <div style="cursor:pointer;" @click="sumar('niños')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus-circle fa-w-16 fa-fw fa-lg"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" class="" style="color: #172b4d;"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white" style="display:none;" id="bebes">
                                        <span style="margin-left:90%;cursor:pointer;" @click="cerrar('bebes')">X</span>
                                        <div class="d-flex flex-row pr-4 pl-4 pb-4 justify-content-around">
                                            <span>Bebés: </span>
                                            <div style="cursor:pointer;" @click="restar('bebes')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-minus-circle fa-w-16 fa-fw fa-lg" style="color: red;"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" class=""></path></svg>
                                            </div>
                                            <span>{{bebes}}</span>                                        
                                            <div style="cursor:pointer;" @click="sumar('bebes')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus-circle fa-w-16 fa-fw fa-lg"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" class="" style="color: #172b4d;"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-center">
                                <button class="btn btn-danger tamaño_button" v-b-modal.modal-viajes @click="buscar('idayvuelta')">
                                    <svg aria-hidden="true" style="width:4%;" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16 fa-fw fa-lg"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg>
                                    Buscar Viajes
                                </button>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab title="Solo Ida">
                        <div class="d-flex flex-column justify-content-center">
                            <div class="contenedor-ida-vuelta">
                                <!-- //Origen -->
                                <!-- <base-input class="input-group-alternative mb-3 tamaño-input"
                                        placeholder="Origen"
                                        type="text"
                                        addon-left-icon="ni ni-square-pin"
                                        v-model="model.origen">
                                </base-input> -->
                                <div class="d-flex flex-column align-items-center tamaño_select">
                                    <div class="d-flex flex-row align-items-center">
                                        <span>Origen:</span>
                                    </div>
                                    <div class="d-flex flex-row" style="width:100%;">
                                        <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                            <i class="ni ni-pin-3"></i>
                                        </span>
                                        <v-select :options="origen" class="bg-white" style="width:100%;" placeholder="Seleccione Origen" @input="cambio_Origen" :reduce="country => country.idOrigen" label="country"></v-select>
                                    </div>
                                </div>
                                <!-- //Destino -->
                                <!-- <base-input class="input-group-alternative mb-3 tamaño-input"
                                        placeholder="Destino"
                                        type="text"
                                        addon-left-icon="ni ni-curved-next"
                                        v-model="model.destino">
                                </base-input>-->
                                <div class="d-flex flex-column align-items-center tamaño_select">
                                    <div class="d-flex flex-row align-items-center">                                        
                                        <span>Destino:</span>
                                    </div>
                                    <div class="d-flex flex-row" style="width:100%;">
                                        <span class="input-group-text" style="border-right: none; border-top-right-radius: initial; border-bottom-right-radius: initial;">
                                            <i class="ni ni-pin-3"></i>
                                        </span>
                                        <v-select :options="destino" class="bg-white" style="width:100%;" placeholder="Seleccione Destino" @input="cambio_Destino" :reduce="country => country.idDestino" label="country"></v-select>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-column align-items-center" style="margin-bottom:20px;">
                                <span>Fecha de Ida:</span>
                                <div class="d-flex flex-row">
                                    <span class="input-group-text" @click="calendar('soloida')"><i class="ni ni-calendar-grid-58"></i></span>
                                    <datetime v-model="date_ida" :min-datetime="min_date_ida" :input-id="'soloida'" :input-class="'form-control'" style="width:100%;"></datetime>
                                </div>
                            </div>
                            <div class="contenedor-ida-vuelta">
                                <div class="d-flex flex-column" style="width:80%;">
                                    <span>Pasajeros</span>
                                    <div class="d-flex flex-row justify-content-between">
                                        <span style="cursor:pointer;" @click="abrir('adultos2')">
                                            {{adultos}} Adultos 
                                            <svg aria-hidden="true" style="width: 7%;" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit fa-w-18 fa-lg"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" class=""></path></svg>
                                            </span>
                                        <span style="cursor:pointer;" @click="abrir('niños2')">
                                            {{niños}} Niños 
                                            <svg aria-hidden="true" style="width: 7%;" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit fa-w-18 fa-lg"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" class=""></path></svg>
                                            </span>
                                        <span style="cursor:pointer;" @click="abrir('bebes2')"> 
                                            {{bebes}} Bebés
                                            <svg aria-hidden="true" style="width: 7%;" focusable="false" data-prefix="fas" data-icon="edit" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-edit fa-w-18 fa-lg"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" class=""></path></svg>
                                            </span>
                                    </div>
                                    <div class="bg-white" style="display:none;" id="adultos2">
                                        <span style="margin-left:90%;cursor:pointer;" @click="cerrar('adultos2')">X</span>
                                        <div class="d-flex flex-row pr-4 pl-4 pb-4 justify-content-around">
                                            <span>Adultos: </span>
                                            <div style="cursor:pointer;" @click="restar('adultos')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-minus-circle fa-w-16 fa-fw fa-lg" style="color: red;"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" class=""></path></svg>
                                            </div>
                                            <span>{{adultos}}</span>                                        
                                            <div style="cursor:pointer;" @click="sumar('adultos')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus-circle fa-w-16 fa-fw fa-lg"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" class="" style="color: #172b4d;"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white" style="display:none;" id="niños2">
                                        <span style="margin-left:90%;cursor:pointer;" @click="cerrar('niños2')">X</span>
                                        <div class="d-flex flex-row pr-4 pl-4 pb-4 justify-content-around">
                                            <span>Niños: </span>
                                            <div style="cursor:pointer;" @click="restar('niños')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-minus-circle fa-w-16 fa-fw fa-lg" style="color: red;"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" class=""></path></svg>
                                            </div>
                                            <span>{{niños}}</span>                                        
                                            <div style="cursor:pointer;" @click="sumar('niños')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus-circle fa-w-16 fa-fw fa-lg"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" class="" style="color: #172b4d;"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-white" style="display:none;" id="bebes2">
                                        <span style="margin-left:90%;cursor:pointer;" @click="cerrar('bebes2')">X</span>
                                        <div class="d-flex flex-row pr-4 pl-4 pb-4 justify-content-around">
                                            <span>Bebés: </span>
                                            <div style="cursor:pointer;" @click="restar('bebes')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-minus-circle fa-w-16 fa-fw fa-lg" style="color: red;"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" class=""></path></svg>
                                            </div>
                                            <span>{{bebes}}</span>                                        
                                            <div style="cursor:pointer;" @click="sumar('bebes')">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus-circle fa-w-16 fa-fw fa-lg"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" class="" style="color: #172b4d;"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-row justify-content-center">
                                <button class="btn btn-danger tamaño_button" v-b-modal.modal-soloida @click="buscar('ida')">
                                    <svg aria-hidden="true" style="width:4%;" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16 fa-fw fa-lg"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg>
                                    Buscar Viajes
                                </button>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>           
            </div>
            <Modal2 :arregloIda="arregloIda" 
            :arregloVuelta="arregloVuelta" 
            :idviajesElegidos="idviajesElegidos" 
            @cambiarIdViajes="cambiarIdViajes($event)"></Modal2> 

            <Modal3 :arregloIda="arregloIda" 
            :idviajesElegidos="idviajesElegidos"
            @cambiarIdViajes="cambiarIdViajes($event)"></Modal3> 
            
            <router-view :idviajesElegidos="idviajesElegidos"
            :adultos="adultos"
            :ninos="niños"
            :bebes="bebes"></router-view>
        </div>
    </div>
</template>

<script>
    import Modal2 from './Modal/Modal2'
    import Modal3 from './Modal/Modal3'
    import { SlideYUpTransition } from 'vue2-transitions'
    // import datepicker from '../components/Datepicker/Datepicker'
    import carouselIndex from './Carousel/CarouselIndex.vue'
    export default {
        data(){
            return{
                date_ida : "",
                min_date_ida: "",
                date_regreso: this.date_vuelta,
                origen : [ ],
                destino: [ ],
                origenElegido: "",
                destinoElegido: "",
                adultos: 1,
                niños: 0,
                bebes: 0,
                cantidadPasajeros: 1,
                arregloIda: [],
                arregloVuelta: [],
                idviajesElegidos: [ ]
            }
        },
        components:{
            carouselIndex,
            Modal2,
            Modal3,
            SlideYUpTransition
        },
        beforeMount(){
            let f = new Date();
            this.min_date_ida = f.toISOString();
            // this.min_date_vuelta = f.toISOString();
            f.setDate(f.getDate()+1);
            this.date_ida = f.toISOString();
            this.date_regreso = f.toISOString();
            // this.date_vuelta = f.toISOString();
        },
        mounted() {   
            let _this = this;         
            // let datatime = document.getElementsByClassName("vdatetime-input");
            // for (let i = 0; i < 3; i++) {
            //     const element = datatime[i];
            //     element.className = "vdatetime-input form-control"
            //     if(i == 3){
            //         element.style="45%";
            //     }
            // }
            let arrayOrigen = [];
            let arrayDestino = [];
            this.$store.dispatch('recuperarOrigen').then(response => {
                if(response.success == true){
                    response.data.forEach(element => {
                        let arreglo_temp = {country:` ${element.departamento},${element.distrito},${element.direccion}`, idOrigen: `${element.idOrigen}`}
                        arrayOrigen.push(arreglo_temp)
                    });
                    _this.origen = arrayOrigen;
                }
            });
            this.$store.dispatch('recuperarDestino').then(response => {
                if(response.success == true){
                    response.data.forEach(element => {
                        let arreglo_temp2 = {country:` ${element.departamento},${element.distrito},${element.direccion}`, idDestino: `${element.idDestino}`}
                        arrayDestino.push(arreglo_temp2)
                    });
                    _this.destino = arrayDestino;
                }
            });
            // datatime.forEach(element => {
            //     element.className = "vdatetime-input form-control";
            // });
        },
        computed:{
            date_vuelta(){
                return this.date_ida;
            },
            min_date_vuelta(){
                return this.date_ida;
            }
        },
        methods:{
            cambiarIdViajes(event){
                this.idviajesElegidos = event;
            },
            recargo(){
                this.date_regreso = this.date_ida;
            },
            cambio_Origen(param){
                let _this = this;
                let newArreglo = [];
                let arrayDestino = [];
                this.$store.dispatch('recuperarDestino').then(response => {
                    if(response.success == true){
                        response.data.forEach(element => {
                            let arreglo_temp2 = {country:` ${element.departamento},${element.distrito},${element.direccion}`, idDestino: `${element.idDestino}`}
                            arrayDestino.push(arreglo_temp2)
                        });
                        arrayDestino.forEach(element => {
                            if(element.idDestino == param){
                                _this.origenElegido = element;
                            }else{
                                newArreglo.push(element)
                            }
                        });
                    }
                });                
                _this.destino = newArreglo;
            },
            cambio_Destino(param){
                let _this = this;
                _this.destino.forEach(element => {
                    if(element.idDestino == param){
                        _this.destinoElegido = element;
                    }
                })
            },
            calendar(param){
                let datetime = document.getElementById(param);
                datetime.click();
            },
            sumar(param){
                if(this.cantidadPasajeros < 9){
                    if(param == 'adultos'){
                        this.adultos = this.adultos + 1;
                    }else if(param == 'niños'){
                        this.niños = this.niños + 1;
                    }else{
                        if(this.bebes < this.adultos){
                            this.bebes = this.bebes + 1;
                        }
                    }
                }
                this.cantidadPasajeros = this.adultos + this.niños + this.bebes;
                
            },
            restar(param){  
                if(param == 'adultos'){           
                    if(this.adultos > 1){
                        this.adultos = this.adultos - 1;                
                    }
                }else if(param == 'niños'){
                    if(this.niños >= 1){
                        this.niños = this.niños - 1;
                    }
                }else{
                    if(this.bebes >= 1){
                        this.bebes = this.bebes - 1;
                    }
                }           
                this.cantidadPasajeros = this.adultos + this.niños + this.bebes;
            },
            abrir(param){
                let parametro = document.getElementById(param);
                parametro.style.display = "block";
            },
            cerrar(param){
                let parametro = document.getElementById(param);
                parametro.style.display = "none";
            },
            buscar(param){
                let _this = this;
                if(param == "ida"){
                    let cantidadPasajeros = this.adultos + this.niños + this.bebes;
                    let fechaSalida = this.date_ida.split("T");
                    this.$store.dispatch('get_viajes',{
                        idOrigen: _this.origenElegido["idDestino"],
                        idDestino: _this.destinoElegido["idDestino"],
                        cantPasajeros: cantidadPasajeros,
                        fechaSalida: fechaSalida[0],
                    }).then(response => {
                        if(response.success == true){
                            _this.arregloIda = response.data;
                        }else{
                            console.log("ERROR")
                            console.log(response)
                        }
                    });
                }else{
                    let cantidadPasajeros = this.adultos + this.niños + this.bebes;
                    let fechaSalida = this.date_ida.split("T");
                    let fechaVuelta = this.date_regreso.split("T");
                    this.$store.dispatch('get_viajes',{
                        idOrigen: _this.origenElegido["idDestino"],
                        idDestino: _this.destinoElegido["idDestino"],
                        cantPasajeros: cantidadPasajeros,
                        fechaSalida: fechaSalida[0],
                    }).then(response => {
                        if(response.success == true){
                            _this.arregloIda = response.data;
                            this.$store.dispatch('get_viajes',{
                                idOrigen: _this.destinoElegido["idDestino"],
                                idDestino: _this.origenElegido["idDestino"],
                                cantPasajeros: cantidadPasajeros,
                                fechaSalida: fechaVuelta[0],
                            }).then(response => {
                                if(response.success == true){
                                    _this.arregloVuelta = response.data;                                  
                                }else{                            
                                    console.log("ERROR")
                                    console.log(response)
                                }
                            });
                        }else{                            
                            console.log("ERROR")
                            console.log(response)
                        }
                    });
                }
            }
        }   
    }

</script>

<style>
    .tamaño_select{
        width:49%;   
    }
    .tamaño_button{
        width:40%;
    }
    .vs__dropdown-menu::-webkit-scrollbar{
        width: 4px;
        height: 4px;
    }
    .vs__dropdown-menu::-webkit-scrollbar-thumb{
        background: #000000;
        border-radius: 10px;
    }
    .Datepicker{
        border: none;
        padding-top: 8px;
        padding-bottom: 8px;
        text-align: center;
        border-radius: 4px;
    }
    .contenedor-cards .nav li{
        width: 50%;
    }
    .bg-tabs{
        background-color: #f8f9fe !important;
        border-bottom-left-radius: 0.375rem;
        border-bottom-right-radius: 0.375rem;
    }
    .nav-link:hover{
        color:#525f7f !important;
    }
    .contenedor-cards{
        width:70%;
        /* position: absolute; */
        /* top: 70%; */
    }    
    .tamaño-input{
        width:45%;
    }
    .contenedor-ida-vuelta{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 990px){
        .contenedor-ida-vuelta{
            display: flex;
            flex-direction: column;
            align-items: center;  
            margin-bottom: 15px;          
        }
        .tamaño-input{
            width:85%;
        }
        .tamaño_select{
            width:75%;
        }
        .tamaño_button{
            width:50%;
        }
    }
    @media screen and (max-width: 650px){
        .contenedor-cards{
            width:80%;
        }
        .tamaño-input{
            width:85%;
        }
        .tamaño_button{
            width:60%;
        }
        .tamaño_select{
            width:95%;
        }
    }
    @media screen and (max-width: 450px){
        .contenedor-cards{
            width:100%;
        }
        .tamaño-input{
            width:100%;
        }
        .tamaño_button{
            width:80%;
        }
    }
    .tab-content > .active{
        outline: 0
    }
    .select-box {
  position: relative;
  display: block;
  width: 100%;
  margin: 0 auto;
  font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial', sans-serif;
  font-size: 18px;
  color: #60666d;
  margin-bottom: 3rem;
}
@media (min-width: 768px) {
  .select-box {
    width: 70%;
  }
}
@media (min-width: 992px) {
  .select-box {
    width: 50%;
  }
}
@media (min-width: 1200px) {
  .select-box {
    width: 30%;
  }
}
.select-box__current {
  position: relative;
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;
}
.select-box__current:focus + .select-box__list {
  opacity: 1;
  -webkit-animation-name: none;
          animation-name: none;
}
.select-box__current:focus + .select-box__list .select-box__option {
  cursor: pointer;
  margin: 0 !important;
}
.select-box__current:focus .select-box__icon {
  -webkit-transform: translateY(-50%) rotate(180deg);
          transform: translateY(-50%) rotate(180deg);
}
.select-box__icon {
  position: absolute;
  top: 50%;
  right: 15px;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  width: 20px;
  opacity: 0.3;
  transition: 0.2s ease;
}
.select-box__value {
  display: flex;
}
.select-box__input {
  display: none;
}
.select-box__input:checked + .select-box__input-text {
  display: block;
}
.select-box__input-text {
  display: none;
  width: 100%;
  margin: 0;
  padding: 15px;
  background-color: #fff;
}
.select-box__list {
  position: absolute;
  width: 100%;
  padding: 0;
  list-style: none;
  opacity: 0;
  -webkit-animation-name: HideList;
          animation-name: HideList;
  -webkit-animation-duration: 0.5s;
          animation-duration: 0.5s;
  -webkit-animation-delay: 0.5s;
          animation-delay: 0.5s;
  -webkit-animation-fill-mode: forwards;
          animation-fill-mode: forwards;
  -webkit-animation-timing-function: step-start;
          animation-timing-function: step-start;
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
}
.select-box__option {
  display: block;
  padding: 15px;
  background-color: #fff;
}
.select-box__option:hover, .select-box__option:focus {
  color: #546c84;
  background-color: #fbfbfb;
}

@-webkit-keyframes HideList {
  from {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
  }
  to {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
  }
}

@keyframes HideList {
  from {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
  }
  to {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
  }
}

</style>