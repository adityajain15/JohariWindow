<template>
  <div id="instructionWrapper" class="h-25 tc opensans">
    <div v-if="myTurn">
      <span class="db">It is <span class="deeppink">your</span> turn</span>
      <span class="db">Pick a maximum of 6 adjectives that describe <span class="deeppink">you</span> from the list below</span>
      <span class="db">When you are finished, click submit and wait for others to submit their responses</span>
    </div>
    <div v-else>
      <span class="db">It is <span class="deeppink">{{names[activePlayer]}}</span>’s turn</span>
      <span class="db">Pick a maximum of 6 adjectives that describe <span class="deeppink">{{names[activePlayer]}}</span> from the list below</span>
      <span class="db">When you are finished, click submit and wait for others to submit their responses</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Instructions',
  computed: {
    myTurn () {
      return this.id === this.activePlayer
    },
    ...mapState([
      'id',
      'names',
      'activePlayer'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
