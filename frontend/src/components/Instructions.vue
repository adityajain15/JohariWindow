<template>
  <div id="instructionWrapper" class="h-25 tc opensans lh-copy">
    <div v-if="myTurn">
      <span class="db"><span class="deeppink">You</span> are the subject</span>
      <span class="db">Pick no more than 6 adjectives that describe you from the list below</span>
      <span class="db">Your peers will also select a list of adjectives to describe you</span>
      <span class="db">When you are finished, click submit and wait for others to submit their responses</span>
    </div>
    <div v-else>
      <span class="db"><span class="deeppink">{{names[activePlayer]}}</span> is the subject</span>
      <span class="db">Pick no more than 6 adjectives that describe <span class="deeppink">{{names[activePlayer]}}</span> from the list below</span>
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
