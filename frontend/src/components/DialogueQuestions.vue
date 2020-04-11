<template>
  <div id="dialogueWrapper" class="lh-copy">
    <h3 class="tc teko f3">Questions to consider</h3>
    <span>It is time to discuss the choices that you and your peers have made. Take note of the adjectives that have been arranged on the different quadrants of the Johari Window.</span>
    <ul>
      <li>What surprised you? What didn’t surprise you? What mystifies you?</li>
      <template v-if="myTurn">
        <li>What does your blindspot look like? Might there be a reason that your peers percieve those traits within you, while you do not? Have your peers misidentified these traits within you?</li>
        <li>What does your facade look like? Might there be a reason that you percieve these traits within you, while your peers do not? Do you believe that you express those traits to your peers? Or could it be the case that the traits do not apply?</li>
        <li>Are there any unknown traits that may apply to you, that neither you or your peers have identified?</li>
        <li>Do you and your peers think about these traits in the same way? What does it mean for someone to be Kind? Or Warm? Did the semantics of the adjectives influence your choices? Did the semantics hold you back from not picking a trait?</li>
      </template>
      <template v-else>
        <li>What does the blindspot look like? Might there be a reason that your peers percieve those traits within the subject, while the subject does not? Have your peers misidentified these traits within the subject?</li>
        <li>What does the facade look like? Might there be a reason that the subject percieves these traits within themselves, while your peers do not? Do you believe that the subject adequately expresses those traits to you and your peers? Or could it be the case that the traits do not apply?</li>
        <li>Are there any unknown traits that may apply to the subject that the group has not identified?</li>
        <li>Does the group think about these traits in the same way? What does it mean for someone to be Kind? Or Warm? Did the semantics of the adjectives influence your choices? Did the semantics hold you back from not picking a trait?</li>
      </template>
    </ul>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DialogueQuestions',
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
ul {
  list-style: disc;
}
</style>
