<template>
  <div class="mv2 center">
    
    <!--<h2 class="tc teko f3">Players</h2>-->
    <div class="w-80 center tc">
      <span class="ba pa1 ma2 dib activeHost">Current Host</span>
      <span class="ba pa1 ma2 dib activePlayer">Current Subject</span>
    </div>
    <div class="w-80 center tc">
      <template v-for="(player, index) in players">
        <span :key="`player-${index}`" class="ba pa1 ma2 dib" :style="`border-color: ${activeHost === player ? 'deeppink' : 'black'}; background: ${activePlayer === player ? 'deeppink' : 'white'};`">{{names[player]}}{{ hasResponded.includes(player) ? '✓' : '' }}</span>
      </template>
    </div>
    
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
    'hasResponded',
    'activeHost'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activeHost {
  border-color: deeppink;
}

.activePlayer {
  background: deeppink;
}
</style>
