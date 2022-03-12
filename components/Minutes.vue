<template>
    <div v-if="agenda">
        <div class="minute-list">
            <div @click="add" class="add-minute noselect create">
                <action icon="plus"/> {{$t('createMinute')}}
            </div>
            <minute v-for="(minute,n) in minutes" :key="minute.id" :init-minute="minute" @update="update(n, arguments[0])" @remove="remove(n)" @decision="$emit('decision',minute)"/>
        </div>
    </div>
</template>
<script>
import {Minute} from "~/classes/Minute.js"
export default{
    props:['agenda'],
    data(){
        return {
            minutes:[]
        };
    },
    mounted(){
        if(this.agenda){
            this.minutes = this.agenda.minutes;
        }
    },
    computed:{
        createMinute(){
            let minute = new Minute();
            minute.date = null;
            minute.body = this.$t('createMinute');
            return minute;
        }
    },
    watch:{
        agenda:(value, old) => {
            this.minutes = value.items;
        }
    },
    methods:{
        add(){
            let minute = new Minute();
            minute.editing = true;
            minute.agendaId = this.agenda.id;
            minute.store();
            this.minutes.splice(0,0,minute);
        },
        update(n, minute){
            this.minutes.splice(n,1,minute);
            this.minutes[n].store();
        },
        remove(n){
            console.log(this.minutes[n]);
            this.minutes[n].remove();
            this.minutes.splice(n,1);
        }
    }
}
</script>
<style scoped>
.create{
    cursor:pointer;
    background:#CCC;
}
.add-minute{
    border-radius:8px;
    padding:8px;
    box-sizing:border-box;
    margin-bottom:8px;
    font-size:16px;
    color:#555;
}
</style>
