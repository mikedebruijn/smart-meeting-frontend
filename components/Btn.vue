<template>
    <div class="noselect button" v-text="value" :class="dynamicClass">
    </div>
</template>
<script>
export default {
    props:['value','inactive','floatright','floatleft'],
    computed:{
        dynamicClass(){
            return {
                inactive:this.active,
                right:this.floatright,
                left:this.floatleft,
            }
        }
    }
}
</script>

<style scoped>
.button{
    color:white;
    display:inline-block;
    padding:8px 16px;
    border-radius:16px;
    margin:0 8px 16px;
    background:#4ab2ff;
    transition:background 0.3s linear;
    cursor:pointer;
}
.button:hover{
    background:#0066af;
}
.button.left{
    float:left;
    margin-left:0;
}
.button.right{
    float:right;
    margin-right:0;
}
.button.disabled{
}
</style>
