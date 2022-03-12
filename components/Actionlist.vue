<template>
    <div v-if="agenda">
        <div class="action-list">
        </div>
    </div>
</template>
<script>
import {Action} from "~/classes/Action.js"
export default{

            //<action v-for="(action,n) in actions" :key="action.id" :initaction="action" @update="update(n, arguments[0])" @remove="remove(n)" @action="$emit('action',action)"/>
    props:['agenda'],
    data(){
        return {
            actions:[]
        };
    },
    mounted(){
        if(this.agenda){
            this.actions = this.agenda.actions;
        }
    },
    computed:{
    },
    watch:{
        agenda:(value, old) => {
            this.actions = value.items;
        }
    },
    methods:{
        add(){
            let action = new Action();
            action.editing = true;
            action.agendaId = this.agenda.id;
            action.store();
            this.actions.splice(0,0,action);
        },
        update(n, action){
            this.actions.splice(n,1,action);
            this.actions[n].store();
        },
        remove(n){
            console.log(this.actions[n]);
            this.actions[n].remove();
            this.actions.splice(n,1);
        }
    }
}
</script>
<style scoped>
.create{
    cursor:pointer;
    background:#CCC;
}
</style>
