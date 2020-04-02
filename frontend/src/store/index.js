import Vue from 'vue'
import Vuex from 'vuex'

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
    otherPlayerResponses: []
  },
  mutations: {
    SOCKET_allPlayers (state, { players }) {
      state.players = players
    },
    SOCKET_allNames (state, { names }) {
      state.names = names
    },
    SOCKET_activePlayer (state, { activePlayer }) {
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
