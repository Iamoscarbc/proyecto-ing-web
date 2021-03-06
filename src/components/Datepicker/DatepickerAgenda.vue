<template>
    <div class="d-flex flex-row justify-content-center">
        <transition name="datepicker-slide">
            <div class="datepicker" v-if="visible">
                <div class="datepicker__header">
                    <div class="datepicker__year">
                        {{year}}
                    </div>
                    <div class="datepicker__date">
                        {{date_formatted}}
                        <!-- <br>MIN 31 -->
                    </div>
                </div>
                <div class="datepicker__controls">
                    <div class="datepicker__month">{{ month.getFormatted() }}</div>
                    <button class="datepicker__next" @click="nextMonth()">
                        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
                    </button>
                    <button class="datepicker__prev" @click="prevMonth()">
                        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                    </button>
                </div>
                <div class="datepicker__week">
                    <div v-for="(day,i) in days" :key="i" class="datepicker__weekday">
                        {{day}}
                    </div>
                </div>
                <div class="datepicker__days">
                    <div class="datepicker__day" :style="{ width: month.getWeekStart() * 41 + 'px'}"></div>
                    <div class="datepicker__day" @click="selectDate(day)" v-for="(day,i) in month.getDays()" :key="i" :class="{selected: isSelected(day)}">
                        <span class="datepicker__day__effect"></span>
                        <span class="datepicker__day__text">{{day.format('D')}}</span>
                    </div>
                </div>
                <div class="datepicker__actions">
                    <button @click="cancel">Cancelar</button>
                    <button @click="submit">Ok</button>
                </div>
            </div>        
        </transition>
    </div>
</template>

<script>
import Month from './Modules/Month'
    export default {
        props:{
            date: {},
            visible: {type: Boolean, default:true}
        },
        data() {
            return {
                days:['L','M','M','J','V','S','D'],
                month: new Month(this.date.month(),this.date.year())
            }
        },
        methods:{
            isSelected(day){
                return this.date.unix() == day.unix()
            },
            selectDate(day){
                this.date = day.clone();
            },
            nextMonth(){
                let month = this.month.month + 1
                let year = this.month.year
                if(month > 11){
                    year += 1
                    month = 0;
                }
                this.month = new Month(month,year)
            },
            prevMonth(){
                let month = this.month.month - 1
                let year = this.month.year
                if(month < 0){
                    year -= 1
                    month = 11;
                }
                this.month = new Month(month,year)
            },
            submit(){
                this.$emit('change',this.date)
            },
            cancel(){
                this.$emit('cancel')
            }
        },
        computed:{
            year(){
                return this.date.format('YYYY')
            },
            date_formatted(){
                return this.date.format('dddd DD MMM')
            }
        }

    }
</script>

<style lang="scss">
    $header-height : 100px;
    $day-size : 41px;
    .datepicker{
        position: absolute;
        top: 100%;
        width: 315px;
        z-index: 5;
        background-color: #fff;
        box-shadow: 0 14px 45px rgba(0,0,0,0.25), 0 10px 18px rgba(0,0,0,0.22)
    }
    .datepicker__header{
        background-color: #0097a7;
        color: #fff;
        padding: 20px;
        height: $header-height;
    }
    .datepicker__year{
        opacity: 0.7;
        margin-bottom: 10px;
    }
    .datepicker__date{
        font-size:32px;
        line-height: 32px;
    }
    .datepicker__week{
        font-size:12px;
        line-height: 12px;
        color: rgba(0,0,0,0.8);
        padding: 0 14px;
    }
    .datepicker__weekday{
        float:left;
        width: $day-size;
    }
    .datepicker__days{
        margin:14px 14px 0;
        height: $day-size * 5;
    }
    .datepicker__day{
        width: $day-size;
        height: $day-size;
        float: left;
        text-align:center;
        line-height: $day-size;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        transition: color 450ms cubic-bezier(0.23,1,0.32,1) 0ms;
    }
    .datepicker__day__effect{
        position:absolute;
        display: flex;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgb(0,151,167);
        transition: all 450ms cubic-bezier(0.23,1,0.32,1) 0ms;
        transform: scale(0);
        opacity: 0;
    }
    .datepicker__day__text{
        position: relative;
    }
    .datepicker__day:hover{
        color: #fff;
        .datepicker__day__effect{
            transform: scale(1);
            opacity: 0.6;
        }
    }
    .datepicker__day.selected{
        color: #fff;
        .datepicker__day__effect{
            transform: scale(1);
            opacity: 1;
        }
    }
    .datepicker__controls{
        position: relative;
        height: 56px;
        line-height: 56px;
        text-align: center;

        button{
            position: relative;
            border:none;
            background-color: transparent;
            user-select: none;
            outline: none;
            cursor: pointer;
            width: 56px;
            height: 56px;
        }
        svg{
            width: 24px;
            height: 24px;
            fill: rgba(0,0,0,0.87)
        }
    }
    .datepicker__next{
        float: right;
    }
    .datepicker__prev{
        float: left;
    }
    .datepicker__month{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .datepicker__actions{
        text-align: right;
        padding: 8px;
    }
    .datepicker__actions button{
        border: none;
        background-color: transparent;
        display: inline-block;
        cursor: pointer;
        outline: none;
        color: #00bcd4;
        font-size:14px;
        text-transform: uppercase;
        font-weight: 500;
        min-width: 88px;
        line-height: 36px;
        text-align: center;
        -webkit-appearance: none;
        transition: all 0.3s;
        &:hover{
            background-color: rgba(153,153,153,0.2)
        }
    }
    .datepicker-slide-enter-active, .datepicker-slide-leave-active {
        opacity: 1;
        transition: all 0.3s;
        transform: translateY(0);
    }
    .datepicker-slide-leave-to, .datepicker-slide-enter{
        opacity: 0;
        transform: translateY(-15px);
    }
</style>