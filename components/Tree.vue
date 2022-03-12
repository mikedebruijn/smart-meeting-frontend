<template>
    <ol class="tree noselect" @mouseover="hover=true" @mouseleave="hover=false">
        <tree-node v-for="(node,n) in nodes" :key="node.id" :node="node" :active="active" :editable="editable"
            :canup="n>0"
            :candown="n<nodes.length - 1"
            @remove="remove(n)"
            @movedown="move('down',n)"
            @moveup="move('up',n)"
            @setActive="$emit('setActive',arguments[0])"
            ref="nodes"/>
    </ol>
</template>
<script>
export default{
    props:['nodes','active','editable'],
    data(){
        return {
            hover:false
        }
    },
    methods:{
        edit(n){
            this.$refs.nodes[n].startEdit();
        },
        move(direction, node){
            let insert = node;
            if(direction == "down"){
                console.log(this.nodes.length);
                if(node < this.nodes.length - 1) {
                    insert = node + 1;
                    console.log(insert);
                }
            } else if(direction == "up"){
                if(node > 0) {
                    insert = node - 1;
                }
            }
            let extract = this.nodes.splice(node,1);
            this.nodes.splice(insert,0,extract[0]);
        },
        remove(node){
            this.nodes.splice(node,1);
        }
    }
}
</script>
