<template>
    <div class="well">
        <h2>
            {{$t('participants')}}
            <action icon="plus" @click.native="add"/>
        </h2>
        <participant v-for="(participant,n) in participants" :key="participant.id" :participant="participant" @remove="remove(n)" @afterSave="sort" ref="participants"/>
    </div>
</template>
<script>
import {Participant} from "~/classes/Participant"
export default {
    props:['init'],
    data(){
        return {
            tmp_id:100,
            participants:this.init
        }
    },
    mounted(){
        this.sort();
    },
    methods:{
        sort(){
            this.participants.sort(function(a,b){
                var aName = a.name.toUpperCase();
                var bName = b.name.toUpperCase();
                if(bName < aName) {
                    return 1;
                } else if (bName > aName) {
                    return -1;
                }
            });
        },
        add(){
            this.tmp_id++;
            let participant = new Participant('_'+this.$t('name'));
            participant.edit = true;
            this.participants.splice(0, 0, participant);
            this.$nextTick(function(){
                this.$refs.participants[this.$refs.participants.length - 1].startEdit();
            });
        },
        remove(n){
            this.participants.splice(n,1);
        }
    }
}
</script>

