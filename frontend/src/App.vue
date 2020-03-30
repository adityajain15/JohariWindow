<template>
  <div id="app" class="w-100">
    <router-view id="router-view" class="min-vh-100 mw8 center pv2"/>
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
</style>
