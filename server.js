// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
const history = require('connect-history-api-fallback')
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});
app.use(history())
// Tell server where to look for files
app.use(express.static('public'))

// Create socket connection
const io = require('socket.io')(server, {
  pingTimeout: 60000
});

const Manager = require('./Manager')
const manager = new Manager()

// Listen for individual clients to connect
io.sockets.on('connection',
  function (socket) {

    socket.on('createGame', function ({ name }) {
      // create game
      const [room, game] = manager.createGame()
      socket.join(room)
      socket.emit('roomInfo', { room })
      
      game.addPlayer(socket)
      game.addName(socket.id, name)
      io.to(room).emit('allPlayers', { players: game.allPlayers() })
      io.to(room).emit('allNames', { names: game.getNames() })
      io.to(room).emit('activeHost', { activeHost: game.getHost() })

      console.log(manager.rooms)
    })

    socket.on('joinGame', function ({name, room}) {
      const game = manager.findGame(room)
      if(!game) {
        socket.emit('roomInfo', { error: 'No room found!' })
        return
      }
      socket.join(room)
      socket.emit('roomInfo', { room })

      if (game.inGame(socket.id)) {
        game.addName(socket.id, name)
        io.to(room).emit('allNames', { names: game.getNames() })
        game.printGameStatus()
        return
      }
      game.addPlayer(socket)
      game.addName(socket.id, name)
      io.to(room).emit('allPlayers', { players: game.allPlayers() })
      io.to(room).emit('allNames', { names: game.getNames() })
      io.to(room).emit('activeHost', { activeHost: game.getHost() })
      if (game.hasStarted()) {
        socket.emit('activePlayer', { activePlayer: game.getActivePlayer() })
        socket.emit('getAdjectives', { adjectives: game.getAdjectives() })
        socket.emit('hasResponded', { responders: game.getResponders() })
      }
      game.printGameStatus()
      console.log(manager.rooms)
    })

    socket.on('startGame', function () {
      const room = Object.keys(socket.rooms)[1]
      const game = manager.findGame(room)
      if(socket.id !== game.getHost()) { return }
      game.startGame()
      game.assignActivePlayer()
      io.to(room).emit('activePlayer', { activePlayer: game.getActivePlayer() })
      io.to(room).emit('getAdjectives', { adjectives: game.getAdjectives() })
      game.printGameStatus()
    })

    socket.on('response', function ( {response} ) {
      const room = Object.keys(socket.rooms)[1]
      const game = manager.findGame(room)
      game.addResponse(response, socket.id)
      io.to(room).emit('hasResponded', { responders: game.getResponders() })
      if(game.shouldSendResponses()){
        io.to(room).emit('allResponses', { responses: game.getResponses() })
      }
    })

    socket.on('finishRound', function() {
      const room = Object.keys(socket.rooms)[1]
      const game = manager.findGame(room)
      if(socket.id !== game.getHost()) { return }
      game.nextRound()
      io.to(room).emit('activePlayer', { activePlayer: game.getActivePlayer() })
      io.to(room).emit('hasResponded', { responders: game.getResponders() })
      io.to(room).emit('allResponses', { responses: game.getResponses() })
      game.printGameStatus()
    })

    socket.on('disconnecting', function() {
      const roomArray = Object.keys(socket.rooms)
      if(roomArray.length <= 1 || roomArray.length > 2) {
        console.log('Not in a room or more than 2 rooms')
        console.log(roomArray)
        return
      }
      const room = roomArray[1]
      const game = manager.findGame(room)
      
      // remove the player from the game
      game.removePlayer(socket.id)
      
      // if game doesn't have any players left, reset and return
      if(!game.hasPlayers()) {
        manager.removeGame(room)
        return
      }
      
      if(game.getActivePlayer() === socket.id) {
        game.nextRound()
        io.to(room).emit('activePlayer', { activePlayer: game.getActivePlayer() })
        io.to(room).emit('hasResponded', { responders: game.getResponders() })
        io.to(room).emit('allResponses', { responses: game.getResponses() })
        game.printGameStatus()
      } else {
        if(game.removeFromResponders(socket.id)){
          io.to(room).emit('hasResponded', { responders: game.getResponders() })
        }
        if(game.shouldSendResponses()) {
          io.to(room).emit('allResponses', { responses: game.getResponses() })
        }
      }

      // need to remove their responses if they have already responded

      if(game.getHost() === socket.id) {
        game.assignHost()
        io.to(room).emit('activeHost', { activeHost: game.getHost() })
      }

      io.to(room).emit('allPlayers', { players: game.allPlayers() })
      io.to(room).emit('allNames', { names: game.getNames() })

      game.printGameStatus()
    })

    socket.on('leaveRoom', function() {
      const roomArray = Object.keys(socket.rooms)
      if(roomArray.length <= 1 || roomArray.length > 2) {
        console.log('Not in a room or more than 2 rooms')
        console.log(roomArray)
        return
      }
      const room = roomArray[1]
      socket.leave(room)
      const game = manager.findGame(room)
      
      // remove the player from the game
      game.removePlayer(socket.id)
      
      // if game doesn't have any players left, reset and return
      if(!game.hasPlayers()) {
        manager.removeGame(room)
        return
      }
      
      if(game.getActivePlayer() === socket.id) {
        game.nextRound()
        io.to(room).emit('activePlayer', { activePlayer: game.getActivePlayer() })
        io.to(room).emit('hasResponded', { responders: game.getResponders() })
        io.to(room).emit('allResponses', { responses: game.getResponses() })
        game.printGameStatus()
      } else {
        if(game.removeFromResponders(socket.id)){
          io.to(room).emit('hasResponded', { responders: game.getResponders() })
        }
        if(game.shouldSendResponses()) {
          io.to(room).emit('allResponses', { responses: game.getResponses() })
        }
      }

      // need to remove their responses if they have already responded

      if(game.getHost() === socket.id) {
        game.assignHost()
        io.to(room).emit('activeHost', { activeHost: game.getHost() })
      }

      io.to(room).emit('allPlayers', { players: game.allPlayers() })
      io.to(room).emit('allNames', { names: game.getNames() })

      game.printGameStatus()
    })
  })