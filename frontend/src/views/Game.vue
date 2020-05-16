<template>
  <div class="game">
    <NavBar/>
    <router-view id="room-router-view"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'Game',
  components: {
    NavBar
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('leaveRoom')
    this.$socket.emit('leaveRoom')
    next()
  }
}
</script>
