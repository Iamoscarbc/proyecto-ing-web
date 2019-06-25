<template>
    <div>
        <div class="d-flex flex-direction: row;" style=" width:100%;height:400px;overflow:hidden;">
            <img src="https://i.imgur.com/gVmdWYc.png" alt="" style="width:100%;height:700px;">
        </div>
        <div class="d-flex flex-column align-items-center">
            <div class="d-flex flex-row justify-content-around" style="width:80%;margin-top:30px;margin-bottom:30px;">
                <div class="card-group" style="min-width:90%;">
                    <router-link class="card" style="cursor:pointer;" :to="`/aboutus/`+data.path" v-for="(data,i) in arreglo1" :key="i">
                        <div class="card-body" :id="data.path" >
                            <span class="card-title">{{data.title}}</span>
                            <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                            <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                            </div>
                    </router-link>
                </div>
            </div>
        </div>
        <slide-y-up-transition mode="out-in" origin="center top">
            <router-view></router-view>
        </slide-y-up-transition>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
  import { SlideYUpTransition } from 'vue2-transitions'
    export default {
        components: {
        SlideYUpTransition
        },
        data() {
            return {
                arreglo1:[
                    {
                        title:"Reseña Histórica",
                        path:"historia"
                    },
                    {
                        title:"Nuestros Transportes",
                        path:"transportes"
                    },
                    {
                        title:"Algunos de Nuestros destinos",
                        path:"destinos"
                    }
                ],
                arreglo2:[
                    {
                        title:"Reseña Histórica"
                    },
                    {
                        title:"Nuestros Transportes"
                    },
                    {
                        title:"Algunos de Nuestros destinos"
                    }
                ]
            }
        },
        methods:{
            active(id){
                let elemento = document.querySelectorAll('#'+id)[0];
                elemento.className = "card active router-link-active"
                console.log(elemento);
            }
        }
    }
</script>

<style scope>
    .card:hover{
        background-color: #150067;
        color:white !important;        
    }
    .card .active-card{
        background-color: #150067;
        color:white !important;
    }
    .margin-card{
        margin-top:30px;
    }
    @media (max-width:575px){
        .margin-card{
            margin-top:0px;
        }
    }
</style>