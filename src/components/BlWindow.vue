<template>
  <div class="bl-window"
    :class="{
      'main-window': mainWindow,
      'sub-window': !mainWindow,
    }"
    @click.capture="captureAll($event)">
    <div class="title-bar"
      v-if="!mainWindow">
      <span class="title">{{ title }}</span>
    </div>
    <bl-menu-bar
      v-if="menus"
      :menus="menus">
    </bl-menu-bar>
    <bl-window-toolbar
      v-if="hasToolbar">
      <slot name="toolbar">
      </slot>
    </bl-window-toolbar>
    <!-- Window's body -->
    <slot name="body">
    </slot>
    <!-- Other components out of window view -->
    <slot></slot>
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
    },

    mounted() {
      this.$el.addEventListener('contextmenu', e => {
        e.preventDefault();
      });
    },

    methods: {
      captureAll(evt) {
        // console.log('BlWindow: click captured');
        if (this.$bl.app.menu || this.$bl.app.modal) {
          this.$bl.app.menu = null;
          // evt.stopPropagation();
        }
      }
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

  .bl-view.pointer-events-none {
    pointer-events: none;
  }
</style>

<style scoped>
  .bl-window {
    user-select: none;
    overflow: hidden;
  }

  .bl-window .title-bar {
    height: 20px;
    background-color: lightgrey;
  }

  .bl-window .title-bar.alert {
    background-color: red;
  }

  .main-window {
    width: 100%;
    height: 100%;
  }

  .sub-window {
    position: absolute;
    top: 100px;
    left: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px grey;
  }
</style>