 const adjectives = require('./assets/adjectives.js')

class Game{
  constructor(){
    this.activePlayer = ''
    this.host = ''
    this.players = []
    this.discardedPile = []
    this.gameStarted = false
    this.names = {}
    this.activePlayerResponse = []
    this.otherPlayerResponses = []
    this.hasResponded = []
  }

  // add input client
  addPlayer (socket) {
    if(!this.players.length) {
      this.host = socket.id
    }
    this.players.push(socket)
  }

  // remove input client
  removePlayer (id) {
    this.players = this.players.filter(d => d.id !== id)
    delete this.names[id]
  }

  findPlayer (id) {
    return this.players.find(d => d.id === id)
  }

  inGame (id) {
    return this.allPlayers().includes(id)
  }

  allPlayers() {
    return this.players.map(d=>d.id)
  }

  assignActivePlayer() {
    const candidates = this.players.filter(player => !this.discardedPile.includes(player.id))
    const selected = candidates[Math.floor(Math.random() * candidates.length)]
    this.activePlayer = selected.id
    this.discardedPile.push(selected.id)
  }

  getActivePlayer() {
    return this.activePlayer
  }

  assignHost() {
    const selected = this.players[Math.floor(Math.random() * this.players.length)]
    this.host = selected.id
  }

  getHost() {
    return this.host
  }

  hasPlayers() {
    return this.players.length
  }

  reset() {
    this.activePlayer = ''
    this.host = ''
    this.players = []
    this.discardedPile = []
    this.gameStarted = false
    this.names = {}
    this.activePlayerResponse = []
    this.otherPlayerResponses = []
    this.hasResponded = []
  }

  startGame() {
    this.gameStarted = true
  }

  addName(socketID, name) {
    this.names[socketID] = name
  }

  getNames() {
    return this.names
  }

  getAdjectives() {
    return adjectives
  }

  addResponse(response, id) {
    this.hasResponded.push(id)
    if(id === this.activePlayer) {
      this.activePlayerResponse = response
    } else {
      this.otherPlayerResponses.push(response)
    }
  }

  shouldSendResponses() {
    return (this.otherPlayerResponses.length + 1) === this.players.length
  }

  getResponses() {
    return {
      currentPlayer: this.activePlayerResponse,
      otherPlayers: this.otherPlayerResponses
    }
  }

  getResponders() {
    return this.hasResponded
  }

  printGameStatus() {
    console.log(`Queue length: ${this.players.length}`)
    console.log(`Queue: ${this.players.map(d=>d.id)}`)
    console.log(`Names: ${Object.values(this.names)}`)
    console.log(`Current host: ${this.getHost()}`)
    console.log(`Current player: ${this.getActivePlayer()}`)
    console.log(`Discarded pile: ${this.discardedPile}`)
    console.log(`----------------------------------------`)
  }
}

module.exports = Game