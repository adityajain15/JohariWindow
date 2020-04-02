<template>
  <div class="mv2 measure center">
    <h2 class="tc teko f2">Players</h2>
    <template v-for="(player, index) in players">
      <span :key="`player-${index}`" class="ba pa1 ma2 dib opensans" :style="`background: ${activePlayer === player ? 'deeppink' : 'white'};`">{{names[player]}}{{ hasResponded.includes(player) ? '✓' : '' }}</span>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'QueueVisualization',
  computed: mapState([
    'names',
    'players',
    'activePlayer',
    'hasResponded'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
