<template>
  <div class="bl-menu"
    :class="{
      'menu-bar-menu': type === $bl.Menu.MenuBarMenu,
      'context-menu': type === $bl.Menu.ContextMenu,
    }">{{ name }}
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'bl-menu',

    props: {
      type: {
        type: Number,
        required: true,
        validator: (value) => {
          return Object.values(Vue.prototype.$bl.Menu).includes(value);
        }
      },

      name: {
        type: String,
        default: null
      },

      items: {
        type: Array,
        required: true
      }
    },

    data: () => ({
      opened: false,
    }),

    computed: {
    },
  }
</script>

<style scoped>
  .bl-menu {
    display: table-cell;
    user-select: none;
  }

  .bl-menu.menu-bar-menu {
    padding: 0 10px;
  }
</style>