<template>
    <div>
        <!-- Header -->
        <!-- <div class="header bg-gradient-color_principal py-7 py-lg-8">
            <div class="container">
                <div class="header-body text-center mb-6">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 col-md-6">
                            <h1 class="text-white" style="text-transform:capitalize">{{title_auth}}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div> -->
        <div>
            <carouselIndex></carouselIndex>
        </div>
        <div>
            <datepicker value="2016-02-02" format="DD/MM/YYYY" name="start"></datepicker>
            <!-- <datepicker value="2010-02-02" name="end"></datepicker> -->
        </div>
        <!-- <div class="d-flex flex-row justify-content-around">
            <datetime v-model="fechaIda"
            :min-datetime="minDateIda"
            input-class="Datepicker"></datetime>
            <datetime v-model="fechaVuelta"
            :min-datetime="minDateVuelta"></datetime>
        </div> -->
    </div>
</template>

<script>
import datepicker from '../components/Datepicker/Datepicker'
import carouselIndex from './Carousel/CarouselIndex.vue'
    export default {
        data(){
            return{
                fechaIda : "",
                minDateIda: "",
                fechaVuelta : "",
                minDateVuelta: "",
                picker: new Date().toISOString().substr(0, 10),
                landscape: false,
                reactive: false
            }
        },
        components:{
            carouselIndex,
            datepicker
        },
        beforeMount(){
            let f = new Date();
            let mes = ""
            if((f.getMonth() +1) <= 9){
                mes = "0"+(f.getMonth() +1);
            }else{
                mes = (f.getMonth() +1)
            }
            this.fechaIda = f.getFullYear()+"-"+mes+"-"+(f.getDate()+1)+"T00:00:00.000Z"
            this.minDateIda = f.getFullYear()+"-"+mes+"-"+(f.getDate())+"T00:00:00.000Z"
            this.fechaVuelta = f.getFullYear()+"-"+mes+"-"+(f.getDate()+1)+"T00:00:00.000Z"
            this.minDateVuelta = f.getFullYear()+"-"+mes+"-"+(f.getDate()+1)+"T00:00:00.000Z"
        },   
    }
</script>

<style>
    .Datepicker{
        border: none;
        padding-top: 8px;
        padding-bottom: 8px;
        text-align: center;
        border-radius: 4px;
    }
</style>