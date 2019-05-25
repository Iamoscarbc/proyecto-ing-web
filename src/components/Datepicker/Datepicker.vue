<template>
    <div class="datepicker__container">
        <label @click="showDatepicker" style="color:white;">{{date_formatted}}</label>
        <!-- <label :name="name">{{date_raws}}</label> -->
        <datepicker-agenda :date="date" :visible="isvisible" @change="selectDate" @cancel="hideDatepicker"></datepicker-agenda>
    </div>
</template>

<script>
import datepickerAgenda from './DatepickerAgenda'
import moment from 'moment'
moment.locale('es')
    export default {
        components:{
            datepickerAgenda
        },  
        props:{
            value: {type: String, required:true},
            format: {type: String, default:'YYYY-MM-DD'},
            name: {type: String},
        },
        data() {
            return {
                isvisible: false,
                date: moment(this.value, 'YYYY-MM-DD')
            }
        },
        methods:{
            changeDate(date){
                this.date = date;
            },
            selectDate(date){
                this.date = date;
                this.hideDatepicker()
            },
            showDatepicker(){
                this.isvisible = true;
            },
            hideDatepicker(){
                this.isvisible = false;
            }
        },
        computed:{
            date_formatted(){
                return this.date.format(this.format)
            },
            date_raws(){
                return this.date.format('YYYY-MM-DD')
            }
        },
    }
</script>

<style>
    .datepicker__container{
        position:relative;
        font-family: Roboto, sans-serif;
    }
    *{
        box-sizing: border-box;
    }
</style>