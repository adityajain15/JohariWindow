 const adjectives = require('./assets/modernAdjectives')

class Game{
  constructor(){
    this.activePlayer = ''
    this.host = ''
    this.players = []
    this.discardedPile = []
    this.gameStarted = false
    this.names = {}
    this.activePlayerResponse = []
    this.otherPlayerResponses = {}
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

  inGame (id) {
    return this.allPlayers().includes(id)
  }

  allPlayers() {
    return this.players.map(d=>d.id)
  }

  assignActivePlayer() {
    if(this.discardedPile.length >= this.players.length) { this.gameFinishHack() }
    const candidates = this.players.filter(player => !this.discardedPile.includes(player.id))
    const selected = candidates[Math.floor(Math.random() * candidates.length)]
    this.activePlayer = selected.id
    this.discardedPile.push(selected.id)
  }

  gameFinishHack () {
    this.discardedPile = []
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
    this.otherPlayerResponses = {}
    this.hasResponded = []
  }

  startGame() {
    this.gameStarted = true
  }

  hasStarted () {
    return this.gameStarted
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

  nextRound() {
    this.assignActivePlayer()
    this.activePlayerResponse = []
    this.otherPlayerResponses = {}
    this.hasResponded = []
  }

  addResponse(response, id) {
    this.hasResponded.push(id)
    if(id === this.activePlayer) {
      this.activePlayerResponse = response
    } else {
      this.otherPlayerResponses[id] = response
    }
  }

  shouldSendResponses() {
    return this.players.every(player => this.hasResponded.includes(player.id))
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

  removeFromResponders(id) {
    if(this.hasResponded.includes(id)){
      delete this.otherPlayerResponses[id]
      this.hasResponded = this.hasResponded.filter(d=> d !== id)
      return true
    }
    return false
  }

  printGameStatus() {
    console.log(`Queue length: ${this.players.length}`)
    console.log(`Queue: ${this.players.map(d=>d.id)}`)
    console.log(`Responders: ${this.hasResponded}`)
    console.log(`Names: ${Object.values(this.names)}`)
    console.log(`Current host: ${this.getHost()}`)
    console.log(`Current player: ${this.getActivePlayer()}`)
    console.log(`Discarded pile: ${this.discardedPile}`)
    console.log(`----------------------------------------`)
  }
}

module.exports = Game