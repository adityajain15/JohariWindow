const randomstring = require("randomstring");
const Game = require('./Game')

class Manager {
  constructor() {
    this.rooms = {}
  }

  createGame () {
    const roomString = randomstring.generate(15)
    this.rooms[roomString] = new Game()
    return [roomString, this.rooms[roomString]]
  }

  findGame (id) {
    return this.rooms[id]
  }

  removeGame (id) {
    delete this.rooms[id]
  }

}

module.exports = Manager