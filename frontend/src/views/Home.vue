<template>
  <div class="dt w-100">
    <div class=" v-mid dtc white ph3 ph4-l">
      <input v-model="name" ref="name" @keyup.enter="submit" placeholder="Enter your name" class="db center">
      <button @click="submit" class="center db">Submit</button>
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
