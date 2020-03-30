<template>
  <div class="w-100 vh-75 tc pa3">
    <div class="w-100 dt dt--fixed h-10">
      <div class="w-10 dtc"></div>
      <div class="w-40 dtc v-btm">Known to self</div>
      <div class="w-40 dtc v-btm">Not known to self</div>
    </div>
    <div class="h-90">
      <div class="w-100 dt dt--fixed h-50">
        <div class="w-10 dtc v-mid tr ph2">Known to others</div>
        <div class="w-40 dtc ba">
          <template v-for="(word, index) in arena">
            <span class="mh2 dib" :key="`arena-${index}`">{{word}}</span>
          </template>
        </div>
        <div class="w-40 dtc ba">
          <template v-for="(word, index) in blindspot">
            <span class="mh2 dib" :key="`blindspot-${index}`">{{word}}</span>
          </template>
        </div>
      </div>
      <div class="w-100 dt dt--fixed h-50">
        <div class="w-10 dtc v-mid tr ph2">Not known to others</div>
        <div class="w-40 dtc ba">
          <template v-for="(word, index) in facade">
            <span class="mh2 dib" :key="`facade-${index}`">{{word}}</span>
          </template>
        </div>
        <div class="w-40 dtc ba">
          <template v-for="(word, index) in unknowns">
            <span class="mh2 dib" :key="`unknowns-${index}`">{{word}}</span>
          </template>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'JohariWindow',
  computed: {
    arena () {
      return this.activePlayerResponse.filter(d=>this.otherPlayerResponses.includes(d))
    },
    facade (){
      return this.activePlayerResponse.filter(d=>!this.otherPlayerResponses.includes(d))
    },
    blindspot () {
      return this.otherPlayerResponses.filter(d=>!this.activePlayerResponse.includes(d))
    },
    unknowns () {
      return this.adjectives.filter(d=>!this.otherPlayerResponses.includes(d) && !this.activePlayerResponse.includes(d))
    },
    activePlayerResponse () {
      return this.responses.currentPlayer || []
    },
    otherPlayerResponses () {
      return this.responses.otherPlayers ?
        Array.from(new Set(this.responses.otherPlayers.flat())) : []
    },
    ...mapState([
      'responses',
      'adjectives'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h-10{
  height: 10%;
}
.h-90{
  height: 90%
}
.h-20{
  height: 20%;
}
.h-80{
  height: 80%;
}
</style>
