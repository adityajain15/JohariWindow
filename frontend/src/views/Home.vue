<template>
  <div class="w-100">
    <div id="homeWrapper" class="w-70 center">
      <h1 class="teko tc f1">The Johari Window</h1>
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
      <input v-model="name" ref="name" @keyup.enter="submit" placeholder="Enter your name" class="db center">
      <button @click="submit" class="center mv3 db">Submit</button>
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
      name: ''
    }
  },
  mounted(){
    this.$refs.name.focus()
  },
  methods: {
    submit: function (e) {
      this.$socket.emit('name', { name: this.name })
      this.$router.push('/game')
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
