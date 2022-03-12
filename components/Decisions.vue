<template>
    <div v-if="agenda">
        <div class="decision-list">
            <decision v-for="(decision,n) in decisions" :key="decision.id" :initdecision="decision" @update="update(n, arguments[0])" @remove="remove(n)" @decision="$emit('decision',decision)"/>
        </div>
    </div>
</template>
<script>
import {Decision} from "~/classes/Decision.js"
export default{
    props:['agenda'],
    data(){
        return {
            decisions:[]
        };
    },
    mounted(){
        if(this.agenda){
            this.decisions = this.agenda.decisions;
        }
    },
    computed:{
    },
    watch:{
        agenda:(value, old) => {
            this.decisions = value.items;
        }
    },
    methods:{
        add(){
            let decision = new Decision();
            decision.editing = true;
            decision.agendaId = this.agenda.id;
            decision.store();
            this.decisions.splice(0,0,decision);
        },
        update(n, decision){
            this.decisions.splice(n,1,decision);
            this.decisions[n].store();
        },
        remove(n){
            console.log(this.decisions[n]);
            this.decisions[n].remove();
            this.decisions.splice(n,1);
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
