<template>
    <div>
        <div>
            <b-modal id="modal-editar" ref="my-modal" scrollable 
                :title="`Configuración del Usuario `+buscar_User.username"                 
                @ok="guardarForm" ok-only okTitle="Guardar">
                <div class="d-flex flex-column">
                    <!-- <label>{{buscar_User.id}}</label> -->
                    <label style="text-transform:capitalize">Nombres: {{buscar_User.nombres}}</label>
                    <label style="text-transform:capitalize">Apellidos: {{buscar_User.apellidos}}</label>
                    <div class="d-flex flex-row justify-content-around align-items-center" style="width: 60%;">
                        <label for="tipo" style="flex-grow:1;margin:0">Tipo: </label>
                        <select name="tipo" id="tipo" style="flex-grow:2;margin-right:5px;">
                            <option :value="index" v-for="(value,index) in listaTipos" :key="index" :selected="value[1]">{{value[0]}}</option>
                        </select>
                    </div>
                    <!-- <button @click="listaTipos()">CLICK</button> -->
                    <div class="d-flex flex-row justify-content-around align-items-start" style="width: 60%;">
                        <label for="estado" style="flex-grow:1;margin:0;margin-top: 12px;">Estado: </label>
                        <span class="dropdown-el" id="estado" @click="funcion_dropdown()">
                            <input type="radio" name="estado" value="Seleccionar" checked id="Seleccionar">
                            <label for="Seleccionar" @click="forLabel('Seleccionar')">Seleccionar</label>
                            <input type="radio" name="estado" value="Habilitado" id="Habilitado">
                            <label for="Habilitado" @click="forLabel('Habilitado')">Habilitado</label>
                            <input type="radio" name="estado" value="Inhabilitado" id="Inhabilitado">
                            <label for="Inhabilitado" @click="forLabel('Inhabilitado')">Inhabilitado</label>
                        </span>
                    </div>
                </div>
            </b-modal>
        </div> 
    </div>
</template>

<script>
// $('.dropdown-el').click(function(e) {
//   e.preventDefault();
//   e.stopPropagation();
//   $(this).toggleClass('expanded');
//   $('#'+$(e.target).attr('for')).prop('checked',true);
// });
// let dropdown = document.getElementsByClassName("dropdown-el");
// document.addEventListener("click",function() {
//     dropdown.classList.remove('expanded');
// })
// $(document).click(function() {
//   $('.dropdown-el').removeClass('expanded');
// });
    export default {
        props:{
            id_user:"",
            tableData:"",
        },
        data(){
            return {
                arreglo_tipos : [ ],
                click : false
            }
        },
        mounted(){

        },
        computed:{
            buscar_User(){
                let arreglo_user = []
                this.tableData.forEach(element => {
                    if(this.id_user == element.id){
                        arreglo_user.push(element);
                    }
                });
                return arreglo_user[0];
            },           
            listaTipos(){
                let arreglo = [                    
                    ["Seleccionar",""],
                    ["Master",""],
                    ["Administrador",""],
                    ["Cliente",""]
                ]
                for (let i = 0; i < arreglo.length; i++) {
                    const element = arreglo[i];
                    if(i == this.buscar_User.tipo){
                        element[1] = "selected";
                    }else{
                        element[1] = "";
                    }                    
                }
                return arreglo;
            }
        },
        methods:{ 
            funcion_dropdown(){   
                if(this.click == false){
                    let dropdown = document.getElementsByClassName("dropdown-el"); 
                    if(dropdown[0].className == 'dropdown-el expanded'){
                        dropdown[0].className = 'dropdown-el'; 
                    }else{
                        dropdown[0].className = 'dropdown-el expanded';    
                    }
                    this.click = true;
                    // (document.getElementById(e.target).getAttribute("for")).setAttribute("checked",true);

                }else{
                    this.click = false;
                }
                // dropdown.classList.add('expanded');
            },
            forLabel(param){
                let children = document.getElementsByClassName("dropdown-el")[0].children; 
                for (let i = 0; i < children.length; i = i +2) {
                    const element = children[i];
                    if(element.value == param){
                        document.getElementById(param).setAttribute("checked",true);
                    }else{
                        document.getElementById(element.value).setAttribute("checked",false);
                    }
                    // console.log(element);
                }
                // console.log(dropdown);
            },
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
            },
            funcion_guardar(){
                console.log('cerrar');
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