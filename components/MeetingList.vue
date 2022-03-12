<template>
<table>
    <thead>
        <tr>
            <th v-for="header in headers" v-text="header"/>
        </tr>
    </thead>
    <tbody v-if="body">
        <tr v-for="(row,n) in body">
            <td v-for="cell in row" v-text="cell"/>
            <td class="actions">
                <action icon="eye" @click.native="view(n)"/>
                <action icon="copy" @click.native="copy(n)"/>
                <action icon="pencil" @click.native="edit(n)"/>
                <action icon="xmark" @click.native="remove(n)"/>
            </td>
        </tr>
    </tbody>
</table>
</template>
<script>
import {Agenda} from "~/classes/Agenda.js"
export default {
    data(){
        return {
            headers:["Date","Meeting","Group","#attendees","#minutes","#actions","#decisions",this.$t('Actions')],
            agendas:[],
        }
    },
    mounted(){
        console.log(this.agendas);
        this.agendas = Agenda.loadAll();
        console.log(this.agendas);
    },
    computed:{
        body:function(){
            this.agendas.sort((a,b) => a.date - b.date);
            let rows = this.agendas.reduce((result,agenda) => {
                let date = '-';
                console.log(agenda.date);
                if(agenda.date) {
                    date = Intl.DateTimeFormat('en', { hour: "numeric", minute: "numeric", hour12: false }).format(new Date(agenda.date)) 
                }
                result.push([
                    date,
                    agenda.subject,
                    agenda.group,
                    agenda.participants.length,
                    agenda.minutes.length,
                    agenda.actions.length,
                    agenda.decisions.length,
                ]);
                return result;
            },[]);
            return rows;
        }
    },
    methods:{
        view(n){
            this.$router.push('/meetings/play/'+this.agendas[n].id);
        },
        edit(n){
            this.$router.push('/meetings/edit/'+this.agendas[n].id);
        },
        copy(n){
            this.$confirm(
                {
                    title: this.$t('confirmationRequired'),
                    message: this.$t('confirmCopyAgenda'),
                    button: {
                        no: this.$t('cancel'),
                        yes: this.$t('confirm')
                    },
                    callback: confirm => {
                        if (confirm) {
                            let copy = this.agendas[n].copy();
                            copy.store();
                            this.agendas.push(copy);
                        }
                    }
                },
            );
        },
        remove(n){
            this.$confirm(
                {
                    title: this.$t('confirmationRequired'),
                    message: this.$t('confirmRemoveAgenda'),
                    button: {
                        no: this.$t('cancel'),
                        yes: this.$t('confirm')
                    },
                    callback: confirm => {
                        if (confirm) {
                            Agenda.remove(this.agendas[n].id);
                            this.agendas.splice(n,1);
                        }
                    }
                },
            );
        }
    }

}
</script>
