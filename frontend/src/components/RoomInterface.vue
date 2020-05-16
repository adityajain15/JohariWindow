<template>
  <div>
    <QueueVisualization class="mv3"/>
    <template v-if="waitingForHost">
      <Waiting/>
    </template>
    <div v-else>
      <template v-if="!submitted">
        <Instructions/>
        <adjectiveList/>
      </template>
      <template v-else>
        <button v-if="activeHost === id" @click="finishRound" class="center tc db mv4 pointer">Finish Round</button>
        <JohariWindow class="ph3"/>
        <DialogueQuestions v-if="currentPlayerResponse.length + Object.values(otherPlayerResponses).length >= players.length" class="w-80 center pv4"/>
        <ResponseList v-if="currentPlayerResponse.length + Object.values(otherPlayerResponses).length >= players.length" class="pv4"/>
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
import ResponseList from '@/components/ResponseList.vue'
import DialogueQuestions from '@/components/DialogueQuestions.vue'

export default {
  name: 'RoomInterface',
  components: {
    QueueVisualization,
    Waiting,
    Instructions,
    adjectiveList,
    JohariWindow,
    ResponseList,
    DialogueQuestions
  },
  computed: {
    submitted() {
      return this.hasResponded.includes(this.id)
    },
    waitingForHost() {
      return this.activePlayer === ''
    },
    ...mapState([
      'activeHost',
      'activePlayer',
      'id',
      'hasResponded',
      'currentPlayerResponse',
      'otherPlayerResponses',
      'players'
    ])
  },
  methods: {
    finishRound() {
      this.$socket.emit('finishRound')
    }
  }
}
</script>
