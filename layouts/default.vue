<template>
    <div>
        <client-only>
            <vue-confirm-dialog ref="dialog"/>
        </client-only>
        <Nuxt/>
    </div>
</template>
<script>
export default {
    mounted(){
        document.addEventListener('keyup', e => this.$refs.dialog.handleKeyUp(e));
    },
    beforeDestrou(){
        document.removeEventListener('keyup', e => this.$refs.dialog.handleKeyUp(e));
    }
}
</script>
