<template>
    <fa :icon="icon" class="action" :class="{hover:hover}" @mouseover="hover=true" @mouseleave="hover=false"/>
    </div>
</template>

<script>
export default {
    props:['icon'],
    data(){
        return {
            hover:false
        };
    }
}
</script>
<style scoped>
.action{
    cursor:pointer;
}
.hover{
    color:blue;
}
</style>
