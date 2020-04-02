<template>
  <div v-if="activeHost === id" class="vh-75 dt w-100">
    <div class="v-mid tc dtc lh-copy">
      <span class="db ">You are the host</span>
      <span class="db ">Wait for all players to join, and then start the game</span>
      <button @click="startGame" class="mv3 pointer">Start Game</button>
    </div>
  </div>
  <div v-else class="vh-75 dt w-100">
    <span class="v-mid tc dtc lh-copy">Waiting for the host to start the game</span>
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