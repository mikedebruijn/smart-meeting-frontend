<template>
    <textarea v-model="body" ref="area" @blur="$emit('done')" @keyup.escape="$emit('done')"/>
</template>
<script>
export default {
    props:['model'],
    data(){
        return {body:this.model};
    },
    mounted(){
        this.$nextTick(() => {
            this.fixHeight();
            this.$refs.area.focus();
            this.$refs.area.select();
        });
    },
    methods:{
        fixHeight() {
            let area = this.$refs.area;
            area.style.height = "auto";
            let h = area.scrollHeight;
            if(h < 36) {
                h = 36;
            }
            area.style.height = (h + 8) + 'px';
            area.scrollTop = 0;
        },
    },
    watch:{
        body(){
            this.fixHeight();
            this.$emit('update',this.body);
        }
    }
}
</script>
