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
        <div class="w-40 dtc ba relative">
          <div v-for="(word, index) in arena" class="dib mh2" :key="`arena-${index}`">
            <span class="mr1">{{word}}</span>
            <span v-for="(player, j) in getPlayers(word)" class="dib tc v-mid playerCircle" :key="`a-${index}-${j}`">
              {{player}}
            </span>
          </div>
          <div class="absolute bottom-0 right-0 tr silver">
            <span class="teko f3">Arena</span>
          </div>
        </div>
        <div class="w-40 dtc ba relative">
          <div class="absolute bottom-0 right-0 tr silver">
            <span class="teko f3">Blindspot</span>
          </div>
          <div v-for="(word, index) in blindspot" class="dib mh2" :key="`blindspot-${index}`">
            <span class="mr1">{{word}}</span>
            <span v-for="(player, j) in getPlayers(word)" class="dib tc v-mid playerCircle" :key="`s-${index}-${j}`">
              {{player}}
            </span>
          </div>
        </div>
      </div>
      <div class="w-100 dt dt--fixed h-50">
        <div class="w-10 dtc v-mid tr ph2 teko f4">Not known to others</div>
        <div class="w-40 dtc ba relative">
          <template v-for="(word, index) in facade">
            <span class="mh2 dib opensans" :key="`facade-${index}`">{{word}}</span>
          </template>
          <div class="absolute bottom-0 right-0 tr silver">
            <span class="teko f3">Facade</span>
          </div>
        </div>
        <div class="w-40 dtc ba relative">
          <template v-for="(word, index) in unknowns">
            <span class="mh2 dib opensans" :key="`unknowns-${index}`">{{word}}</span>
          </template>
          <div class="absolute bottom-0 right-0 tr silver">
            <span class="teko f3">Unknowns</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'JohariWindow',
  methods: {
    getPlayers(word) {
      const players = []
      for(let i = 0; i < this.otherPlayerResponses.length; i++) {
        if(this.otherPlayerResponses[i].includes(word)) {
          players.push(i + 1)
        }
      }
      return players
    }
  },
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
      return Object.values(this.otherPlayerResponses).length ? Array.from(new Set(Object.values(this.otherPlayerResponses).flat())) : []
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

.playerCircle{
  height: 15px;
  width: 15px;
  border: 1px solid black;
  border-radius: 100px;
  padding: 2px;
  font-size: 12px;
}
</style>
