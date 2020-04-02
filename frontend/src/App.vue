<template>
  <div id="app" class="w-100 opensans">
    <router-view id="router-view" class="min-vh-100 mw8 center pt2 pb5"/>
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffcc00;
}

#router-view{
  background-color: white;
}

.deeppink{
  color: deeppink;
}

.bg-deeppink {
  background: deeppink;
}

.teko {
  font-family: 'Teko', sans-serif;
}

.opensans {
  font-family: 'Open Sans', sans-serif;
}

button {
  border: 2px solid black;
  border-radius: 4px;
}
</style>
