<template>
<div class="box">
    <div class="container">
        <h2>
            <action v-if="icon" :icon="icon" class="icon"/> {{title}}
        </h2>
        <div class="inner">
            <slot/>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:['title','icon']
}
</script>
<style scoped>
.icon{
    margin-right:4px;
}
</style>
