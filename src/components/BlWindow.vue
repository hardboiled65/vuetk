<template>
  <div class="bl-window"
    :class="{
      'main-window': mainWindow,
      'sub-window': !mainWindow,
    }"
    @click.capture="captureAll($event)">
    <div class="title-bar" ref="titleBar"
      v-if="!mainWindow"
      @click="captureAll($event)">
      <button
        v-if="hasButtonWindowClose"
        @click="$emit('windowClose')">X</button>
      <button>-</button>
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

      hasButtonWindowClose: {
        type: Boolean,
        default: true
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
        // Capture when menu opened.
        if (this.$bl.app.menu) {
          if (evt.target.className === 'bl-menu-item-node') {
            if (!evt.target.parentNode.className.includes('enabled')) {
              evt.stopPropagation();
              return;
            }
          }
          if (evt.target.className.split(' ').includes('bl-menu')) {
            return;
          }
          this.$bl.app.menu = null;
          // evt.stopPropagation();
        }
        // Capture when modal opened.
        if (this.$bl.app.modal) {
          const path = evt.composedPath();
          for (let i = 0; i < path.length; ++i) {
            if (path[i].className && path[i].className.includes('bl-alert')) {
              return;
            }
          }
          this.$bl.app.$refs.alert.$refs.window.$emit('windowBlink');
          evt.stopPropagation();
        }
      },

      blinkWindowTitleBar() {
        let intervalId = setInterval(() => {
          const classList = this.$refs.titleBar.classList;
          if (!classList.contains('indicator')) {
            this.$refs.titleBar.classList.add('indicator');
          } else {
            this.$refs.titleBar.classList.remove('indicator');
          }
        }, 50);
        setTimeout(() => {
          clearInterval(intervalId);
          this.$refs.titleBar.classList.remove('indicator');
        }, 500);
      },
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

  .bl-window .title-bar.indicator {
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