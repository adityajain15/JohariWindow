<template>
  <div class="w-80 center ba">
      <div class="striped--light-gray">
        <div class="w-10 dib teko">{{ names[activePlayer] }}</div>
        <template v-for="(response, index) in currentPlayerResponse">
          <div class="dib cellWidth opensans" :key="`active-player-response-${index}`">{{ response }}</div>
        </template>
      </div>
      <template v-for="(player, index) in otherPlayerResponses">
        <div :key="`other-player-${index}`" class="striped--light-gray  w-100">
          <div class="w-10 dib teko">Player {{ index + 1 }}</div>
          <template v-for="(response, indexB) in player">
            <div class="cellWidth dib opensans" :key="`other-player-${index}-response-${indexB}`">{{ response }}</div>
          </template>
        </div>
      </template>
      
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
  width: calc(90% / 6);
}
</style>
