<template>
    <li :class="{active:active==node.id, inactive:active!=node.id}" @click.stop="$emit('setActive',node.id)">
        <div @mouseover="hover=true" @mouseleave="hover=false" class="item">
            <div v-if="edit" class="edit">
                <input v-model="value" @keyup.enter="save" @keyup.escape="cancelEdit" ref="input"/>
                <div class="actions">
                    <action key="save" icon="floppy-disk" @click.native="save"/>
                    <action key="cancel" icon="arrow-rotate-left" @click.native="cancelEdit"/>
                    <action key="remove" icon="xmark" @click.native="$emit('remove')"/>
                </div>
            </div>
            <div v-if="!edit">
                <span v-text="label" @dblclick="startEdit"/></span>
                <div class="actions" v-if="hover && editable">
                    <action key="movedown" :class="{inactive:!candown}" icon="arrow-down" @click.native="$emit('movedown')"/>
                    <action key="moveup" :class="{inactive:!canup}" icon="arrow-up" @click.native="$emit('moveup')"/>
                    <action key="add" icon="plus" @click.native="add"/>
                    <action key="edit" icon="pencil" @click.native="startEdit"/>
                    <action key="remove" icon="xmark" @click.native="$emit('remove')"/>
                </div>
            </div>
        </div>
        <tree :nodes="children" v-if="children.length > 0" ref="children" :active="active" :editable="editable" @setActive="$emit('setActive',arguments[0])"/>
    </li>
</template>
<script>
import {TreeNode} from "~/classes/TreeNode.js"
export default {
    props:['node','canup','candown','editable','active'],
    data(){
        return {
            children:this.node.children ?? [],
            value:this.node.label,
            hover:false,
            edit:false
        }
    },
    computed:{
        label(){
            if(this.node.label){
                return this.node.label;
            }
            return "...";
        }
    },
    methods:{
        startEdit(){
            if(!this.editable) {
                return;
            }
            this.edit=true;
            this.value = this.node.label;
            this.$nextTick(function(){
                this.$refs.input.focus();
                this.$refs.input.select();
            });
        },
        cancelEdit(){
            this.edit = false;
            this.hover = false;
        },
        save(){
            this.edit=false;
            this.hover = false;
            this.node.label = this.value;
            this.$emit('update',this.node);
        },
        add(){
            this.children.push(new TreeNode(this.$t('item')));
            this.$nextTick(function(){
                this.$refs.children.edit(this.children.length - 1);
            });
        }
    }
}
</script>
<style scoped>
    li>svg{
        margin-left:4px;
        color:gray;
    }
    .item{
        width:100%;
        min-height:24px;
        display:inline-block;
        margin-bottom:4px;
        position:relative;
    }
    .edit{
        width:100%;
    }
    .edit input{
        width:calc(100% - 90px);
        max-width:600px;
    }
    .actions{
        color:gray;
    }
    .actions .inactive{
        color:#DDD;
    }
    div{
        display:inline-block;
    }
</style>
