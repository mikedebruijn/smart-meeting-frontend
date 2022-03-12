<template>
    <div id="meeting">
        <h1 v-text="title"/>
        <div class="well">
            <h2>{{$t('generalInfo')}}</h2>
            <div class="form">
                <div>
                    <label for="subject" v-text="$t('subject')"/>
                    <input name="subject" v-model="subject" placehoder:="$t('subject')">
                </div>
                <div>
                    <label for="date" v-text="$t('datetime')"/>
                    <input type="datetime-local" step="300" name="date" v-model="date" placehoder:="$t('date')">
                </div>
                <div>
                    <label for="location" v-text="$t('location')"/>
                    <input type="location" name="location" v-model="location" placehoder:="$t('location')">
                </div>
            </div>
        </div>
        <participants :init="participants" ref="participants" v-if="mounted"/>
        <div class="well agenda">
            <h2>{{$t('agenda')}} <action icon="plus" @click.native="addItem"/></h2>
            <tree :nodes="agendaNodes" ref="agenda" v-if="mounted" :editable="true"/>
        </div>
        <btn :value="$t('save')" floatright="1" @click.native="save"/>
    </div>
</template>
<script>
import {v4 as uuidv4} from "uuid"
import {TreeNode} from "~/classes/TreeNode.js"
import {Participant} from "~/classes/Participant.js"
import {Agenda} from "~/classes/Agenda.js"
export default {
    props:['new', 'initId'],
    data(){
        return {
            mounted:false,
            id:this.initId,
            subject:"",
            date:"",
            location:"",
            agendaNodes: [],
            participants: [],
        }
    },
    mounted(){
        if(this.initId){
            // load existing
            let agenda = Agenda.load(this.initId);
            this.subject = agenda.subject;
            this.date = agenda.date;
            this.location = agenda.location;
            this.agendaNodes = agenda.items;
            this.participants = agenda.participants;
        } else {
            let agenda = new Agenda();
            agenda.setDateNow();
            // initialize with default values
            this.id = agenda.id;
            this.date = agenda.date;
            this.agendaNodes = [
                new TreeNode('intro'),
                new TreeNode('anyOtherBusiness'),
                new TreeNode('questionsBeforeClosure'),
                new TreeNode('closure'),
            ];
            this.participants = [
                new Participant(this.$t('Participant')),
            ];
        }
        this.mounted = true;
    },
    computed:{
        title(){
            if(this.initId) {
                return this.$t('editMeeting');
            }
            return this.$t('createMeeting');
        },
    },
    methods:{
        save(){
            let agenda = new Agenda();
            agenda.id = this.id;
            agenda.subject = this.subject;
            agenda.date = this.date;
            agenda.location = this.location;
            agenda.participants = this.$refs.participants.participants;
            agenda.items = this.agendaNodes;
            agenda.store();
            this.$router.push('/meetings');
        },
        addItem(){
            this.agendaNodes.push(new TreeNode(this.$t('agenda item')));
            this.$nextTick(function(){
                this.$refs.agenda.edit(this.agendaNodes.length - 1);
            });
        }
    }
}
</script>
