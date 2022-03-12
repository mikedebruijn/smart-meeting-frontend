<template>
  <div>
      <h1 v-text="$t('welcome')"/>
      <ul>
        <li v-for="item in items" v-text="item"/>
      </ul>
      <nuxt-link to="/meetings">Start</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: function(){
      return {
          items: [
            this.$t('welcome'),
            this.$t('meetingTemplates'),
            this.$t('presentationMode'),
            this.$t('collaborate'),
            this.$t('tagMinutes'),
            this.$t('groupMeetings'),
            this.$t('emailMinutes'),
          ]
      };
  }
}
</script>
