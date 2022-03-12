<template>
    <div class="participant" @mouseover="hovered=true" @mouseleave="hovered=false">
        <div v-if="!edit" @dblclick="startEdit">
                <span>{{participant.name}}</span>
                <span class="email" v-text="formattedEmail"/>
                <span class="job" v-text="jobTitle" v-if="jobTitle"/>
                <action icon="pencil" v-if="hovered" @click.native="startEdit"/>
                <action icon="xmark" v-if="hovered" @click.native="remove"/>
        </div>
        <div v-else @keyup.enter="save" @keyup.escape="cancelEdit">
            <input v-model="name" :placeholder="$t('name')" ref="nameinput"/>
            <input v-model="email" ref="emailinput" :placeholder="$t('email')"/>
            <input v-model="jobTitle" ref="jobtitleinput" :placeholder="$t('jobTitle')"/>
            <action icon="floppy-disk" @click.native="save"/>
            <action icon="arrow-rotate-left" @click.native="cancelEdit"/>
            <action icon="xmark" @click.native="remove"/>
        </div>
    </div>
</template>
<script>
export default {
    props:['participant'],
    mounted(){
        console.log(this.participant.jobtitle);
    },
    data(){
        return {
            jobTitle:this.participant.jobTitle,
            name:this.participant.name,
            email:this.participant.email,
            hovered:false,
            edit:false
        }
    },
    computed:{
        formattedEmail(){
            if(!this.participant.email) {
                return '';
            }
            return '<'+this.participant.email+'>'
        }
    },
    methods:{
        startEdit(){
            this.edit=true;
            this.name=this.participant.name;
            this.email=this.participant.email;
            this.jobTitle=this.participant.jobTitle;
            this.$nextTick(function(){
                this.$refs.nameinput.focus();
                this.$refs.nameinput.select();
            });
        },
        cancelEdit(){
            this.edit=false;
            this.hover=false;
        },
        save(){
            this.participant.name = this.name;
            this.participant.email = this.email;
            this.participant.jobTitle = this.jobTitle;
            this.edit=false;
            this.hover=false;
            this.$emit('afterSave');
        },
        remove(){
            this.$emit('remove');
        }
    }
}
</script>
<style scoped>
.participant{
    padding:0 16px;
    box-sizing:border-box;
    border-radius:16px;
    line-height:32px;
    display:inline-block;
    margin-right:8px;
    position:relative;
    background:white;
    margin-bottom:8px;
}
.participant span{
    margin:0;
    vertical-align:middle;
}
.participant svg{
    font-size:14px;
    margin-left:2px;
}
.participant .email{
    font-style:italic;
    font-size:0.8em;
}
.participant .job{
    line-height:100%;
    text-transform:uppercase;
    font-size:0.8em;
}
</style>
