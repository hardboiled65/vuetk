<template>
  <div class="bl-window"
    :class="{
      'main-window': mainWindow,
      'sub-window': !mainWindow,
    }"
    :style="windowStyle"
    @click.capture="captureAll($event)">
    <div class="title-bar" ref="titleBar"
      v-if="!mainWindow"
      draggable="true"
      @dragstart="onDragstart($event)"
      @drag="onDrag($event)"
      @dragend.prevent="onDragend($event)"
      @click="captureAll($event)"> <!-- ??? -->
      <div class="buttons">
        <button
          v-if="setButtonWindowClose"
          @click="$emit('windowClose')"
          @mousedown.stop.prevent>X</button>
        <button
          v-if="setButtonWindowMinimize"
          @mousedown.stop.prevent>-</button>
      </div>
      <span class="title">{{ title }}</span>
      <div class="right-space">
      </div>
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
    <!-- DEBUG -->
    <div v-if="false">
      <div v-if="mainWindow">cursor: <span id="cursor"></span></div>
      <div v-if="mainWindow">start-rect: <span id="start-rect"></span></div>
      <div v-if="mainWindow">cur-rect: <span id="cur-rect"></span></div>
      <div v-if="mainWindow">offset: <span id="offset"></span></div>
    </div>
  </div>
</template>

<script>
  import BlMenuBar from './BlMenuBar'
  import BlWindowToolbar from './BlWindowToolbar'

  import { ApplicationWindow } from '@/classes/Window'

  export default {
    name: 'bl-window',

    components: {
      BlMenuBar,
      BlWindowToolbar,
    },

    props: {
      instance: {
        type: ApplicationWindow,
        required: false
      },

      menus: {
        type: Array,
        default: null
      },

      setButtonWindowClose: {
        type: Boolean,
        default: true
      },

      setButtonWindowMinimize: {
        type: Boolean,
        default: true
      },
    },

    data: () => ({
      title: 'App',
      dragging: false,

      documentDragoverHandler: null,
      cursorRect: {
        x: null,
        y: null
      },
      offsetRect: {
        x: null,
        y: null
      },
      wtf: 'wtf?',
    }),

    computed: {
      mainWindow() {
        return this.$parent.$parent === this.$root;
      },

      hasToolbar() {
        return Boolean(this.$slots.toolbar);
      },

      windowStyle() {
        let style = {};

        if (this.instance) {
          style.top = this.instance.y + 'px';
          style.left = this.instance.x + 'px';
        }

        return style;
      }
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

      //=========================
      // On developing
      //=========================
      /**
       * For debugging.
       */
      onTest(evt) {
        // eslint-disable-next-line
        console.log('test', evt);
      },

      onDragstart(evt) {
        this.dragging = true;
        const rect = evt.target.getBoundingClientRect();
        // console.log('dragstart', this.$_draggingRectX, this.$_draggingRectY);
        let ghost = document.createElement('img');
        // Transparent, 1px png for overwrite default image.
        ghost.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII=');
        evt.dataTransfer.setDragImage(ghost, 0, 0);
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', 'dragging');
        this.documentDragoverHandler = document.addEventListener(
          'dragover', (evt) => {
            this.cursorRect.x = evt.clientX;
            this.cursorRect.y = evt.clientY;
          });
      },

      onDrag(evt) {
        if (!this.cursorRect.x) {
          return;
        }
        const rect = evt.target.getBoundingClientRect();
        if (this.offsetRect.x === null) {
          this.offsetRect.x = this.cursorRect.x - rect.x;
          this.offsetRect.y = this.cursorRect.y - rect.y;
        }
        if (this.dragging) {
          //===============||
          // DEBUG START
          // -------------
          /*
          document.getElementById('cursor').innerHTML = this.cursorRect.x
            + ', ' + this.cursorRect.y;
          document.getElementById('start-rect').innerHTML = this.$_draggingRectX
            + ', ' + this.$_draggingRectY;
          document.getElementById('cur-rect').innerHTML = rect.x + ', ' + rect.y;
          document.getElementById('offset').innerHTML = this.offsetRect.x
            + ', ' + this.offsetRect.y;
          */
          // -------------
          // DUBUG END
          //===============||
          this.instance.x = this.cursorRect.x - this.offsetRect.x;
          this.instance.y = this.cursorRect.y - this.offsetRect.y;
        }
      },

      onDragend(evt) {
        this.dragging = false;
        document.removeEventListener('dragover', this.documentDragoverHandler);
        this.cursorRect.x = null;
        this.cursorRect.y = null;
        this.offsetRect.x = null;
        this.offsetRect.y = null;
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
    background-color: #e2dfde;
  }

  .bl-window .title-bar {
    height: 32px;
    background-color: #e2dfde;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .bl-window .title-bar:active {
    cursor: move;
  }

  .bl-window .title-bar.indicator {
    background-color: red;
  }

  .bl-window .title-bar button {
    height: 21px;
    width: 21px;
    border-radius: 25px;
  }

  .bl-window .title-bar .title {
    text-shadow: 0 0 10px #ffffff;
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