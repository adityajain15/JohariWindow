<template>
  <div class="pa3 ma3 cf">
    <div id="adjectiveList" class="w-50 fl" style="white-space: pre-line;">
      <template v-for="(adjective, index) in adjectives">
        <button :key="`adjective-${index}`" :class="`dib ba pa1 ma1 pointer ${hasBeenSelected[index] ? 'bg-deeppink grow' : selected.length >=6 ? 'bg-moon-gray' : 'bg-white grow'}`" @click="select(adjective)">{{adjective}}</button>
      </template>
    </div>
    <div class="w-50 vh-50 fl flex items-center justify-center">
      <div class="tc">
        <div class="w-100">
          <span v-if="error.length" class="db">{{error}}</span>
          <template v-if="selected.length">
            <span class="db b">You have chosen:</span>
            <template v-for="(adj, index) in selected">
              <span class="db" :key="`chosen-${index}`">{{adj}}</span>
            </template>
          </template>
        </div>
        <button v-if="selected.length" class="dib mt4 pointer grow bw3" @click="sendResponses">Submit</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'adjectiveList',
  data () {
    return {
      selected: [],
      error: ''
    }
  },
  computed: {
    hasBeenSelected(){
      return this.adjectives.map(adj => this.selected.includes(adj))
    },
    ...mapState([
      'adjectives'
    ])
  },
  methods: {
    select (adjective) {
      if(this.selected.includes(adjective)) {
        this.error = ''
        this.selected = this.selected.filter(d=> d !== adjective)
      } else {
        if(this.selected.length === 6) {
          this.error = 'You cannot select more than 6 adjectives'
          return
        }
        this.selected.push(adjective)
      }
    },
    sendResponses () {
      this.$socket.emit('response', { response: this.selected })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  border: 2px solid black;
  border-radius: 4px;
}
</style>
