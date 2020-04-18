import Vue from 'vue'
import Vuex from 'vuex'
import { newResponse, playerJoin, playerLeave, gameBegin } from '@/assets/sounds'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    names: {},
    players: [],
    activePlayer: '',
    activeHost: '',
    id: '',
    adjectives: [],
    hasResponded: [],
    currentPlayerResponse: [],
    otherPlayerResponses: {}
  },
  mutations: {
    SOCKET_allPlayers (state, { players }) {
      if(state.players.length < players.length) {
        playerJoin.play()
      } else {
        playerLeave.play()
      }
      state.players = players
    },
    SOCKET_allNames (state, { names }) {
      state.names = names
    },
    SOCKET_activePlayer (state, { activePlayer }) {
      if(!state.activePlayer.length) { gameBegin.play() }
      state.activePlayer = activePlayer
    },
    SOCKET_activeHost (state, { activeHost }) {
      state.activeHost = activeHost
    },
    SOCKET_connect (state) {
      state.id = this._vm.$socket.id
    },
    SOCKET_getAdjectives (state, { adjectives }) {
      state.adjectives = adjectives
    },
    SOCKET_hasResponded (state, { responders }) {
      if(state.hasResponded.length < responders.length ) { newResponse.play() }
      state.hasResponded = responders
    },
    SOCKET_allResponses (state, { responses }) {
      const { currentPlayer, otherPlayers } = responses
      state.currentPlayerResponse = currentPlayer
      state.otherPlayerResponses = otherPlayers
    }
  },
  actions: {
    dsad({commit}, {names}) {
      this.names = names
    }
  }
})
