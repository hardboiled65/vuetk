<template>
  <div id="app">
    <main-window>
    </main-window>
  </div>
</template>

<script>
import MainWindow from './components/MainWindow.vue'

export default {
  name: 'app',
  components: {
    MainWindow,
  },

  created() {
    this.$vuetk.app = this;
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
