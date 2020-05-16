<template>
  <nav class="w-100 cf tc teko f2">
    <router-link :class="`w-third fl pa2`" :to="{name: 'Home'}">Home</router-link>
    <router-link :class="`w-third fl pa2`" :to="{name: 'roominterface'}">Room</router-link>
    <router-link :class="`w-third fl pa2`" :to="{name: 'rules'}">Instructions</router-link>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  mounted() {
    //console.log(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.h-10{
  height: 10%;
}
.h-90{
  height: 90%
}
.h-20{
  height: 20%;
}
.h-80{
  height: 80%;
}

a:hover {
  background: silver;
  color: black;
}

a{
  color: black;
  background: white;
}

.router-link-exact-active {
  background: black;
  color: white;
}
</style>
