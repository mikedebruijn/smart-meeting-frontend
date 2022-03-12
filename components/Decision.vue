<template>
    <div class="decision" @click="startEdit" @keyup.stop 
    @mouseover="hover=true" @mouseleave="hover=false"
    >
        <h3 class="date" v-text="date" v-if="date"/>
        <p v-if="!decision.editing">{{decision.body}}</p>
        <areainput :model="body" v-else @update="body=arguments[0]" @done="doneEdit"/>
        <textarea v-model="body" v-else ref="area" @blur="doneEdit" @keyup.escape="doneEdit"/>
        <div class="actions noselect" v-if="hover" @click.stop>
            <action icon="xmark" @click.native="remove" key="unset-highlight"/>
        </div>
    </div>
</template>

<script>
import textarea from "~/mixins/textarea.js"
export default {
    props:['initdecision', 'blockEdit'],
    mixins:[textarea],
    data(){
        return {
            decision:this.initdecision,
            body:'',
            removed:false,
            hover:false,
        }
    },
    methods:{
        remove(){
            this.$confirm(
                {
                    title:this.$t('confirmationRequired'),
                    message:this.$t('confirmRemoveDecision'),
                    button: {
                        no: this.$t('cancel'),
                        yes: this.$t('confirm'),
                    },
                    callback: confirm => {
                        if(confirm) {
                            this.$emit('remove');
                        }
                    }
                }
            );
        },
        doneEdit(){
            if (this.removed) {
                return;
            }
            this.decision.editing = false;
            this.decision.body = this.body;
            if (this.body.length == 0) {
                this.removed = true;
                this.$emit('remove');
            } else {
                this.$emit('update', this.decision);
            }
        },
        startEdit(){
            this.body = this.decision.body;
            this.decision.editing = true;
        }
    },
    computed:{
        date(){
            if(!this.decision.date) {
                return;
            }
            return this.decision.formattedDate();
        }
    },
}
</script>

<style scoped>
.decision{
    box-sizing:border-box;
    margin-bottom:4px;
    background:#EEE;
    color:#777;
    border-radius:8px;
    padding:8px;
    position:relative;
}
textarea{
    width:100%;
    resize:vertical;
    box-sizing:border-box;
    border:1px solid #CCC;
    border-radius:8px;
    padding:4px 8px;
}
.date{
    font-size:12px;
    margin:0 0 4px;
}
p{
    font-size:16px;
    margin:0;
    white-space: pre-line
}
.actions{
    position:absolute;
    font-size:18px;
    top:0;right:0;
    padding:4px 8px;
}
</style>
