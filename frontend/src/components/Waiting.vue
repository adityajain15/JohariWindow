<template>
  <div v-if="activeHost === id">
    <span>You are the host</span>
    <button @click="startGame" class="pointer">start</button>
  </div>
  <div v-else>
    <span>Waiting for the host to start</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Waiting',
  computed: mapState([
    'id',
    'activeHost'
  ]),
  methods: {
    startGame() {
      this.$socket.emit('startGame')
    }
  }
}
</script>