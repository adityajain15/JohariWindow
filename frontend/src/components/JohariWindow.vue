<template>
  <div class="w-100 vh-75 tc f6">
    <div class="w-100 dt dt--fixed h-10">
      <div class="w-10 dtc"></div>
      <div class="w-40 dtc v-btm teko f4">Known to self</div>
      <div class="w-40 dtc v-btm teko f4">Not known to self</div>
    </div>
    <div class="h-90">
      <div class="w-100 dt dt--fixed h-50">
        <div class="w-10 dtc v-mid tr ph2 teko f4">Known to others</div>
        <div class="w-40 dtc ba">
          <template v-for="(word, index) in arena">
            <span class="mh2 dib opensans" :key="`arena-${index}`">{{word}}</span>
          </template>
        </div>
        <div class="w-40 dtc ba">
          <template v-for="(word, index) in blindspot">
            <span class="mh2 dib opensans" :key="`blindspot-${index}`">{{word}}</span>
          </template>
        </div>
      </div>
      <div class="w-100 dt dt--fixed h-50">
        <div class="w-10 dtc v-mid tr ph2 teko f4">Not known to others</div>
        <div class="w-40 dtc ba">
          <template v-for="(word, index) in facade">
            <span class="mh2 dib opensans" :key="`facade-${index}`">{{word}}</span>
          </template>
        </div>
        <div class="w-40 dtc ba">
          <template v-for="(word, index) in unknowns">
            <span class="mh2 dib opensans" :key="`unknowns-${index}`">{{word}}</span>
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
      return this.currentPlayerResponse.filter(d=>this.distinctOtherPlayerResponses.includes(d))
    },
    facade (){
      return this.currentPlayerResponse.filter(d=>!this.distinctOtherPlayerResponses.includes(d))
    },
    blindspot () {
      return this.distinctOtherPlayerResponses.filter(d=>!this.currentPlayerResponse.includes(d))
    },
    unknowns () {
      return this.currentPlayerResponse.length || this.distinctOtherPlayerResponses.length ? 
        this.adjectives.filter(d=>!this.distinctOtherPlayerResponses.includes(d) && !this.currentPlayerResponse.includes(d)) : []
    },
    distinctOtherPlayerResponses () {
      return this.otherPlayerResponses.length ? Array.from(new Set(this.otherPlayerResponses.flat())) : []
    },
    ...mapState([
      'currentPlayerResponse',
      'otherPlayerResponses',
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
