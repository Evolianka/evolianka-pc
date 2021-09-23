<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import api from './api/desktop'
export default {
  async mounted() {

    const token = this.$cookies.get('x-token')
    const sessionId = this.$cookies.get('x-session-id')
    api.axios.defaults.headers.common['x-token'] = token
    api.axios.defaults.headers.common['session-id'] = sessionId

  }
}
</script>

<style lang="scss">
@import "@/assets/style/reset";

</style>
