<template>
  <div id="app">
    <bl-window
      :menus="menus">
      <template slot="toolbar">
        <div>Toolbar</div>
        <bl-button></bl-button>
      </template>
    </bl-window>
  </div>
</template>

<script>
import BlWindow from './components/BlWindow'
import BlButton from './components/BlButton'

export default {
  name: 'app',
  components: {
    BlWindow,
    BlButton,
  },

  data: () => ({
    menus: [
      'File', 'Edit', 'Help',
    ],
  }),
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
