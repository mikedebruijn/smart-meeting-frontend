<template>
    <div class="minute" @click="startEdit" @keyup.stop 
    @mouseover="hover=true" @mouseleave="hover=false"
    >
        <h3 class="date" v-text="date" v-if="date"/>
        <p v-if="!minute.editing">
            <fa icon="star" v-if="minute.highlight"/> {{minute.body}}
        </p>
        <areainput :model="body" @update="body=arguments[0]" @done="doneEdit" v-else ref="area"/>
        <div class="actions noselect" v-if="hover" @click.stop>
            <action icon="gavel" @click.native="$emit('decision')" key="decision"/>
            <action :icon="['far','star']" @click.native="minute.highlight=false" key="highlight"  v-if="minute.highlight"/>
            <action icon="star" @click.native="minute.highlight=true" key="unset-highlight" v-else/>
            <action icon="xmark" @click.native="remove" key="remove"/>
        </div>
    </div>
</template>

<script>
export default {
    props:['initMinute', 'blockEdit'],
    data(){
        return {
            canEdit:this.blockEdit ? false : true,
            minute:this.initMinute,
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
                    message:this.$t('confirmRemoveMinute'),
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
            this.minute.editing = false;
            this.minute.body = this.body;
            if (this.body.length == 0) {
                this.removed = true;
                this.$emit('remove');
            } else {
                this.$emit('update', this.minute);
            }
        },
        startEdit(){
            if(!this.canEdit) {
                return;
            }
            this.body = this.minute.body;
            this.minute.editing = true;
        }
    },
    computed:{
        highlight(){
            return this.minute.highlight;
        },
        date(){
            if(!this.minute.date) {
                return;
            }
            return this.minute.formattedDate();
        }
    },
    watch:{
        highlight(){
            console.log(this.minute);
            this.minute.store();
        }
    }
}
</script>

<style scoped>
.minute{
    box-sizing:border-box;
    margin-bottom:4px;
    background:white;
    color:#777;
    border-radius:8px;
    padding:8px;
    position:relative;
    cursor:pointer;
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
