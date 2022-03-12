<template>
    <div class="agenda-container">
        <div class="header">
            <h1 v-text="subject"/>
            <p v-text="subheader"/>
        </div>
        <div v-if="agenda" class="agenda-inner">
            <box :title="$t('agenda')" class="agenda" :icon="['far','calendar-days']">
                <tree :nodes="nodes" :active="activeItem" @setActive="activeItem=arguments[0]"/>
            </box>
            <box :title="$t('minutes')" class="agenda-minutes" :icon="['far','pen-to-square']">
                <minutes :agenda="agenda" ref="minutes" @decision="newDecision"/>
            </box>
            <box :title="$t('decisions')" class="agenda-decisions" icon="gavel">
                <decisions :agenda="agenda"/>
            </box>
            <box :title="$t('actions')" class="agenda-actions" :icon="['far','square-check']">
                <actionlist :agenda="agenda"/>
            </box>
        </div>
        <div class="agenda-bg"></div>
    </div>
</template>
<script>
import {Agenda} from "~/classes/Agenda.js"
import {Decision} from "~/classes/Decision.js"
export default{
    data(){
        return {
            agenda: null,
            activeItem:null,
            subheader:null,
            nodes:[],
        }
    },
    mounted(){
        this.agenda = Agenda.load(this.$route.params.id);
        this.nodes = this.agenda.items;
        this.subheader = this.agenda.formattedDate() + ', ' + this.agenda.location;
        if(this.agenda.items.length > 0) {
            this.activeItem = this.agenda.items[0].id;
        }
        document.addEventListener('keyup', this.handleKeyUp);
    },
    methods:{
        newDecision(minute){
            let decision = new Decision(this.agenda.id);
            decision.body = minute.body;
            decision.store();
            this.agenda.decisions.splice(0,0,decision);
        },
        handleKeyUp(e){
            if(e.keyCode == 32) {
                this.nextNode();
            }
        },
        nextNode(){
            let found = false; // set to true during traversal
            let active = null; // if found, set next node as active
            // traverse nodes
            let path = [];
            let traverse = (node) => {
                console.log(node.label);
                if(found) {
                    active = node.id;
                    return true;
                }
                if (node.id == this.activeItem) {
                    found = true;
                }
                for(var i=0; i<node.children.length; i++){
                    if(traverse(node.children[i])) {
                        return true;
                    }
                }
            }
            traverse({id:null,children:this.nodes});
            this.activeItem = active;
        }
    },
    computed:{
        subject(){
            if(this.agenda){
                return this.agenda.subject;
            }
        }
    },
    beforeDestroy(){
        document.removeEventListener('keyup', this.handleKeyUp);
    }
}
</script>
