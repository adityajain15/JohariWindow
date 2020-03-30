<template>
  <div class="game">
    <QueueVisualization/>
    <div v-if="waitingForHost" class="ma2">
      <Waiting/>
    </div>
    <div v-else>
      <Instructions/>
      <template v-if="!submitted">
        <adjectiveList/>
      </template>
      <template v-else>
        <JohariWindow/>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'
import QueueVisualization from '@/components/QueueVisualization.vue'
import Waiting from '@/components/Waiting.vue'
import Instructions from '@/components/Instructions.vue'
import adjectiveList from '@/components/adjectiveList.vue'
import JohariWindow from '@/components/JohariWindow.vue'

export default {
  name: 'Game',
  components: {
    QueueVisualization,
    Waiting,
    Instructions,
    adjectiveList,
    JohariWindow
  },
  computed: {
    submitted() {
      return this.hasResponded.includes(this.id)
    },
    waitingForHost() {
      return this.activePlayer === ''
    },
    ...mapState([
      'activePlayer',
      'id',
      'hasResponded'
    ])
  }
}
</script>
