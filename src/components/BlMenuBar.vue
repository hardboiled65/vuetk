<template>
  <div class="bl-menu-bar"
    :class="{
    }">
    <bl-menu
      v-for="menu in menus" :key="menu"
      :type="$bl.Menu.MenuBarMenu"
      :name="menu"
      :items="[]">
    </bl-menu>
  </div>
</template>

<script>
  import BlMenu from './BlMenu'

  export default {
    name: 'bl-menu-bar',

    components: {
      BlMenu,
    },

    props: {
      menus: {
        type: Array,
        required: true
      },
    },

    computed: {
    }
  }
</script>

<style scoped>
  .bl-menu-bar {
    display: block;
    height: 22px;
    background-color: grey;
  }
</style>