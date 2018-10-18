<template>
  <div class="bl-window"
    :class="{
      'main-window': mainWindow,
    }">
    <bl-menu-bar
      v-if="menus"
      :menus="menus">
    </bl-menu-bar>
    <slot name="toolbar">
      <bl-window-toolbar
        v-if="hasToolbar">
      </bl-window-toolbar>
    </slot>
    <slot name="body">
    </slot>
  </div>
</template>

<script>
  import BlMenuBar from './BlMenuBar'
  import BlWindowToolbar from './BlWindowToolbar'

  export default {
    name: 'bl-window',

    components: {
      BlMenuBar,
      BlWindowToolbar,
    },

    props: {
      menus: {
        type: Array,
        default: null
      },
    },

    data: () => ({
      title: 'App',
    }),

    computed: {
      mainWindow() {
        return this.$parent.$parent === this.$root;
      },

      hasToolbar() {
        return Boolean(this.$slots.toolbar);
      },
    },

    watch: {
      title(newVal) {
        document.title = newVal;
      },
    },

    created() {
      document.title = this.title;
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .bl-window {
  }

  .main-window {
    width: 100%;
    height: 100%;
  }
</style>