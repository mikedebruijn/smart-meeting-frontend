<template>
<div id="meetings">
    <nuxt-link to="/" v-text="$t('Home')"/>
    <nuxt-link to="/meetings/create" v-text="$t('New meeting')"/>
    <h1 v-text="meetings"/>
    <MeetingList/>
</div>
</template>

<script>
export default {
data(){
    return {
        meetings:"Meetings"
    }
}
}
</script>
