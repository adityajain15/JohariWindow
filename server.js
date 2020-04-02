const Game = require('./Game')
const game = new Game()

// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'))

// Create socket connection
let io = require('socket.io')(server, {
  pingTimeout: 60000
});

// Listen for individual clients to connect
io.sockets.on('connection',
  function (socket) {

    socket.on('name', function ({ name }) {
      game.addPlayer(socket)
      game.addName(socket.id, name)
      socket.join('game')
      io.to('game').emit('allPlayers', { players: game.allPlayers() })
      io.to('game').emit('allNames', { names: game.getNames() })
      io.to('game').emit('activeHost', { activeHost: game.getHost() })
      if (game.hasStarted()) {
        socket.emit('activePlayer', { activePlayer: game.getActivePlayer() })
        socket.emit('getAdjectives', { adjectives: game.getAdjectives() })
        socket.emit('hasResponded', { responders: game.getResponders() })
      }
      game.printGameStatus()
    })

    socket.on('startGame', function () {
      if(socket.id !== game.getHost()) { return }
      game.startGame()
      game.assignActivePlayer()
      io.to('game').emit('activePlayer', { activePlayer: game.getActivePlayer() })
      io.to('game').emit('getAdjectives', { adjectives: game.getAdjectives() })
      game.printGameStatus()
    })

    socket.on('response', function ( {response} ) {
      game.addResponse(response, socket.id)
      io.to('game').emit('hasResponded', { responders: game.getResponders() })
      if(game.shouldSendResponses()){
        io.to('game').emit('allResponses', { responses: game.getResponses() })
      }
    })

    socket.on('finishRound', function() {
      if(socket.id !== game.getHost()) { return }
      game.nextRound()
      io.to('game').emit('activePlayer', { activePlayer: game.getActivePlayer() })
      io.to('game').emit('hasResponded', { responders: game.getResponders() })
      io.to('game').emit('allResponses', { responses: game.getResponses() })
      game.printGameStatus()
    })

    socket.on('disconnect', function() {
      if(!game.inGame(socket.id)) {
        return
      }
      
      // remove the player from the game
      game.removePlayer(socket.id)
      
      // if game doesn't have any players left, reset and return
      if(!game.hasPlayers()) {
        game.reset()
        game.printGameStatus()
        return
      }
      
      if(game.getActivePlayer() === socket.id) {
        game.nextRound()
        io.to('game').emit('activePlayer', { activePlayer: game.getActivePlayer() })
        io.to('game').emit('hasResponded', { responders: game.getResponders() })
        io.to('game').emit('allResponses', { responses: game.getResponses() })
        game.printGameStatus()
      } else {
        if(game.removeFromResponders(socket.id)){
          io.to('game').emit('hasResponded', { responders: game.getResponders() })
        }
        if(game.shouldSendResponses()) {
          io.to('game').emit('allResponses', { responses: game.getResponses() })
        }
      }

      // need to remove their responses if they have already responded

      if(game.getHost() === socket.id) {
        game.assignHost()
        io.to('game').emit('activeHost', { activeHost: game.getHost() })
      }

      io.to('game').emit('allPlayers', { players: game.allPlayers() })
      io.to('game').emit('allNames', { names: game.getNames() })

      game.printGameStatus()
    })
  })