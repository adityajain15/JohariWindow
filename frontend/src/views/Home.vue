<template>
  <div class="w-100 pv4">
    <div id="homeWrapper" class="w-70 center">
      <h1 class="teko tc f1 db mv1">The Johari Window</h1>
      <blockquote cite="https://en.wikipedia.org/wiki/Johari_window" class="mv5">
        <p>
          The Johari window is a technique that helps people better understand 
          their relationship with themselves and others. It was created by 
          psychologists Joseph Luft (1916–2014) and Harrington Ingham (1916–1995) 
          in 1955, and is used primarily in self-help groups and corporate settings 
          as a heuristic exercise. Luft and Ingham named their model "Johari" 
          using a combination of their first names.
        </p>
        <footer><cite>Wikipedia</cite></footer>
      </blockquote>
      <div>
        <div class="w-50 dib v-top tc">
          <h2 class="f2 teko">Create a room</h2>
          <div class="db b">
            <label for="createname">Name</label>
            <input v-model="name" @keyup.enter="submit" name="createname" ref="createName" placeholder="Enter your name" class="ml2">
          </div>
          <button @click="createGame" class="center mv3 db">Create Room</button>
        </div>
        <div class="w-50 dib v-top tc">
          <h2 class="f2 teko">Join an existing room</h2>
          <div class="db b pb2">
            <label for="name">Name</label>
            <input v-model="name" name="name" ref="joinName" placeholder="Enter your name" class="ml2">
          </div>
          <div class="db b">
            <label for="roomid">Room ID</label>
            <input v-model="room" name="roomid" ref="roomid" placeholder="Enter room id" class="ml2">
          </div>
          <button @click="joinGame" class="center mv3 db">Join Room</button>
        </div>
        <span v-if="error" class="red b tc db">{{error}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      name: '',
      room: '',
      error: ''
    }
  },
  mounted(){
    if(this.$route.query.room) {
      this.room = this.$route.query.room
      this.$refs.joinName.focus()
    }
    
  },
  methods: {
    joinGame: function (e) {
      if(!this.name.length) {
        this.error = 'You must enter a name'
      } else if (!this.room.length) {
        this.error = 'You must enter a room ID'
      } else {
        this.$socket.emit('joinGame', { room: this.room, name: this.name })
      }
    },
    createGame: function (e) {
      if(!this.name.length) {
        this.error = 'You must enter a name'
      } else {
        this.$socket.emit('createGame', { name: this.name })
      }
    }
  },
  sockets: {
    roomInfo: function ({room, error}) {
      if(error) {
        this.error = error
      } else {
        this.$router.push(`/${room}`)
      }
    }
  }
}
</script>

<style scoped>
blockquote {
    font-size: 18px;
    position: relative;
    color: #383838;
}

blockquote cite {
    color: #999999;
    font-size: 14px;
    display: block;
    margin-top: 5px;
}

blockquote cite:before {
    content: "\2014 \2009";
}
</style>
