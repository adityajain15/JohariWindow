const Game = require('./game.js')
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
let io = require('socket.io').listen(server);

// Listen for individual clients to connect
io.sockets.on('connection',
  function (socket) {
    
    /*socket.emit('setPrompt', { prompt: game.getPrompt() })
    socket.emit('initialState', { canvas: game.getCanvasState() })
    io.sockets.emit('allPlayers', { players: game.allPlayers() })
    socket.emit('currentPlayer', { currentPlayer: game.getCurrentPlayer() })*/

    socket.on('name', function ({ name }) {
      game.addPlayer(socket)
      game.addName(socket.id, name)
      socket.join('game')
      io.to('game').emit('allPlayers', { players: game.allPlayers() })
      io.to('game').emit('allNames', { names: game.getNames() })
      io.to('game').emit('activeHost', { activeHost: game.getHost() })
      game.printGameStatus()
    })

    socket.on('startGame', function () {
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
      game.assignActivePlayer()
      io.to('game').emit('activePlayer', { currentPlayer: game.getActivePlayer() })
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
        game.assignActivePlayer()
        io.to('game').emit('activePlayer', { activePlayer: game.getActivePlayer() })
      }

      if(game.getHost() === socket.id) {
        game.assignHost()
        io.to('game').emit('activeHost', { activeHost: game.getHost() })
      }

      io.to('game').emit('allPlayers', { players: game.allPlayers() })
      io.to('game').emit('allNames', { names: game.getNames() })

      game.printGameStatus()
    })
  })