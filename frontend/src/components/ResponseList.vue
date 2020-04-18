<template>
  <div class="w-80 center">
    <h3 class="tc teko f3 pv2">Responses</h3>
    <div class="pv2">
      <span class="teko f4">{{ names[activePlayer] }}</span>
      <div class="w-100">
        <template v-for="(response, index) in currentPlayerResponse">
          <span class="dib cellWidth" :key="`active-player-response-${index}`">{{ response }}</span>
        </template>
      </div>
    </div>
    <div v-for="(player, index) in otherPlayerResponses" class="pv2" :key="`player-wrapper-${index}`">
      <span class="db f4 teko">{{names[index]}}</span>
      <div class="w-100">
        <template v-for="(response, indexB) in player">
          <div class="cellWidth dib" :key="`other-player-${index}-response-${indexB}`">{{ response }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ResponseList',
  computed: mapState([
    'names',
    'players',
    'activePlayer',
    'currentPlayerResponse',
    'otherPlayerResponses'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cellWidth {
  width: calc(100% / 6);
}
</style>
