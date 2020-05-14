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
        <div class="w-50 dib v-top">
          <h2 class="f2 teko tc">Create a room</h2>
          <input v-model="name" @keyup.enter="submit" ref="createName" placeholder="Enter your name" class="db center">
          <button @click="createGame" class="center mv3 db">Create Room</button>
        </div>
        <div class="w-50 dib v-top">
          <h2 class="f2 teko tc">Join an existing room</h2>
          <input v-model="name" ref="joinName" placeholder="Enter your name" class="db center">
          <input v-model="room" ref="roomid" placeholder="Enter room id" class="db center">
          <button @click="joinGame" class="center mv3 db">Join Room</button>
          


        </div>
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
      room: ''
    }
  },
  mounted(){
    this.room = this.$route.query.room ? this.$route.query.room : ''
  },
  methods: {
    joinGame: function (e) {
      if(this.room.length) {
        this.$socket.emit('joinGame', { room: this.room, name: this.name === '' ? undefined : this.name })
      }
    },
    createGame: function (e) {
      this.$socket.emit('createGame', { name: this.name === '' ? undefined : this.name })
    }
  },
  sockets: {
    roomInfo: function ({room, error}) {
      if(error) {
        console.log('No room found!')
      } else {
        this.$router.push(`/room/${room}`)
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
