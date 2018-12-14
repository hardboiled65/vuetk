<template>
  <div class="bl-window" tabindex="0"
    :class="windowClass"
    :style="windowStyle">
    <span class="edge-top"
      v-if="!mainWindow && resizingAllowed">
    </span>
    <span class="edge-right"
      v-if="!mainWindow && resizingAllowed">
    </span>
    <span class="edge-bottom"
      v-if="!mainWindow && resizingAllowed">
    </span>
    <span class="edge-left"
      v-if="!mainWindow && resizingAllowed">
    </span>
    <!-- Window title bar -->
    <div class="title-bar" ref="titleBar"
      v-if="!mainWindow"
      draggable="true"
      @mousedown.stop="onMousedown($event)"
      @mousemove="onMousemove($event)"
      @mouseup.stop="onMouseup($event)"
      @dragstart="onDragstart($event)"
      @drag="onDrag($event)"
      @dragend.prevent="onDragend($event)">
      <div class="buttons">
        <button class="button-window-close"
          v-if="setButtonWindowClose"
          @click="$emit('windowClose')"
          @mousedown.stop>X</button>
        <button class="button-window-minimize"
          v-if="setButtonWindowMinimize"
          :disabled="!model.minimizeButton.enabled"
          @click="$emit('windowMinimize')"
          @mousedown.stop>-</button>
      </div>
      <span class="title">{{ model.title }}</span>
      <div class="right-space">
      </div>
    </div>
    <div
      v-if="hasMenuBar">
      <slot name="menuBar"></slot>
    </div>
    <bl-toolbar
      v-if="hasToolbar"
      :instance="toolbar">
      <slot name="toolbar">
      </slot>
    </bl-toolbar>
    <!-- Window's body -->
    <bl-view
      constant="windowBody">
      <slot name="body">
      </slot>
    </bl-view>
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
  import BlToolbar from './BlToolbar'
  import BlView from './BlView'

  import ViewMixin from '../mixins/ViewMixin'

  import { ApplicationWindow } from '../classes/Window'
  import Toolbar from '../classes/Toolbar'
  import View from '../classes/View'
  import Image from '../classes/Image'

  export default {
    name: 'bl-window',

    components: {
      BlToolbar,
      BlView,
    },

    mixins: [
      ViewMixin,
    ],

    props: {
      constant: {
        type: String,
        default: null
      },

      instance: {
        type: ApplicationWindow,
        default: () => (
          new ApplicationWindow(ApplicationWindow.WindowType.AppWindow)
        )
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
      moving: false,
      toolbar: null,

      windowResizeHandler: null,
      documentDragoverHandler: null,
      documentMousemoveHandler: null,
      cursorRect: {
        x: null,
        y: null
      },
      offsetRect: {
        x: null,
        y: null
      },
      movingImpl: 0, // 0: mousedown, 1: dragstart
    }),

    computed: {
      model() {
        if (this.constant !== null) {
          return ApplicationWindow[this.constant];
        }
        return this.instance;
      },

      hasMenuBar() {
        return Boolean(this.$slots.menuBar);
      },

      hasToolbar() {
        return (Boolean(this.$slots.toolbar) || this.toolbar);
      },

      resizingAllowed() {
        return (this.model.type !== ApplicationWindow.WindowType.Alert);
      },

      //==================
      // Instance type
      //==================
      mainWindow() {
        return this.model.type === ApplicationWindow.WindowType.AppWindow;
      },

      //=================
      // Vue class
      //=================
      windowClass() {
        const {
          WindowType,
          WindowState,
        } = ApplicationWindow;

        return {
          'main-window': this.mainWindow,
          'sub-window': !this.mainWindow,
          'document-window': this.model.type === WindowType.DocumentWindow,
          'app-window': this.model.type === WindowType.AppWindow,
          'panel': this.model.type === WindowType.Panel,
          'dialog': this.model.type === WindowType.Dialog,
          'alert': this.model.type === WindowType.Alert,
          'key': this.model.state === WindowState.Key,
          'inactive': this.model.state === WindowState.Inactive,
        };
      },

      //================
      // Vue style
      //================
      windowStyle() {
        let style = {};

        if (this.instance) {
          style.top = this.instance.y + 'px';
          style.left = this.instance.x + 'px';
        }

        return style;
      },

      modal() {
        return this.sharedState.modal;
      },

      posibleMinimumWidth() {
        return 60;
      },

      posibleMinimumHeight() {
        return 60;
      },
    },

    watch: {
      title(newVal) {
        if (this.mainWindow) {
          document.title = newVal;
        }
      },

      'model.title'(newVal) {
        this.title = newVal;
      },
    },

    created() {
      if (this.instance.type === ApplicationWindow.WindowType.AppWindow) {
        this.instance.state = ApplicationWindow.WindowState.Main;
      }

      if (this.model.state === ApplicationWindow.WindowState.Inactive) {
        this.model.state = ApplicationWindow.WindowState.Key;
      }

      if (this.mainWindow) {
        document.title = this.title;
        let favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = Image.SystemImage.applicationIcon.src('16x16');
        document.head.appendChild(favicon);
      }

      if (this.hasToolbar) {
        this.toolbar = new Toolbar();
      }

      // Sync values for constant.
      if (this.constant) {
        if (this.constant === 'aboutPanel') {
          this.model.title = 'About App';
        }
      }
    },

    mounted() {
      if (!this.$el.classList.contains('bl-window')) {
        this.$el.classList.add('bl-window');
      }
      this.$el.addEventListener('click', this.captureAll, true);
      this.$el.addEventListener('contextmenu', e => {
        e.preventDefault();
      });

      this.model.rect.width = this.$el.offsetWidth;
      this.model.rect.height = this.$el.offsetHeight;

      // If the window integrated with browser(tab, window), add resize
      // handler to the `window` object.
      if (this.model.type === ApplicationWindow.WindowType.AppWindow) {
        if (this.windowResizeHandler === null) {
          this.windowResizeHandler = (evt) => {
            this.model.rect.width = this.$el.offsetWidth;
            this.model.rect.height = this.$el.offsetHeight;
          };
          window.addEventListener('resize', this.windowResizeHandler);
        }
      }
    },

    destroyed() {
      if (this.windowResizeHandler) {
        window.removeEventListener('resize', this.windowResizeHandler);
        this.windowResizeHandler = null;
      }
    },

    methods: {
      captureAll(evt) {
        const path = evt.composedPath
          ? evt.composedPath()
          : this.$_composedPath(evt);
        // Capture when menu opened.
        if (this.sharedState.menuOpened) {
          for (let i = 0; i < path.length; ++i) {
            if (path[i].className && path[i].className.includes('bl-menu')) {
              return;
            }
          }
          this.sharedState.menuOpened = false;
          // evt.stopPropagation();
        }
        // Capture when modal opened.
        if (this.sharedState.modalOpened) {
          for (let i = 0; i < path.length; ++i) {
            if (path[i].className && path[i].className.includes('bl-alert')) {
              return;
            }
          }
          this.$vuetk.state.modal._vm.$refs.window.$emit('windowBlink');
          evt.stopPropagation();
        }
      },

      blinkWindowTitleBar() {
        let intervalId = setInterval(() => {
          const classList = this.$refs.titleBar.classList;
          if (!classList.contains('indicator')) {
            classList.add('indicator');
          } else {
            classList.remove('indicator');
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

      /**
       * Polyfill for Event.prototype.composedPath.
       */
      $_composedPath(evt) {
        let path = [];
        let el = evt.target;
        while (el) {
          path.push(el);
          el = el.parentElement;
        }
        return path;
      },

      onMousedown(evt) {
        if (this.movingImpl !== 0) {
          return;
        }

        this.moving = true;

        this.cursorRect.x = evt.clientX;
        this.cursorRect.y = evt.clientY;

        const rect = this.$refs.titleBar.getBoundingClientRect();
        this.offsetRect.x = this.cursorRect.x - rect.x;
        this.offsetRect.y = this.cursorRect.y - rect.y;

        if (!this.documentMousemoveHandler) {
          this.documentMousemoveHandler = (evt) => {
            this.cursorRect.x = evt.clientX;
            this.cursorRect.y = evt.clientY;
            this.instance.x = this.cursorRect.x - this.offsetRect.x;
            this.instance.y = this.cursorRect.y - this.offsetRect.y;
          };
          document.addEventListener('mousemove', this.documentMousemoveHandler);
        }
      },

      onMousemove(evt) {
        if (this.movingImpl !== 0) {
          return;
        }
        if (!this.moving) {
          return;
        }
        return;

        // const rect = this.$refs.titleBar.getBoundingClientRect();
        // this.instance.x = this.cursorRect.x - this.offsetRect.x;
        // this.instance.y = this.cursorRect.y - this.offsetRect.y;
      },

      onMouseup(evt) {
        if (this.movingImpl !== 0) {
          return;
        }
        this.moving = false;
        document.removeEventListener('mousemove', this.documentMousemoveHandler);
        this.documentMousemoveHandler = null;
      },

      onDragstart(evt) {
        if (this.movingImpl !== 1) {
          evt.preventDefault();
          return;
        }

        this.moving = true;
        // const rect = evt.target.getBoundingClientRect();
        // console.log('dragstart', this.$_draggingRectX, this.$_draggingRectY);
        let ghost = document.createElement('img');
        // Transparent, 1px png for overwrite default image.
        ghost.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAC0lEQVQImWNgAAIAAAUAAWJVMogAAAAASUVORK5CYII=');
        evt.dataTransfer.setDragImage(ghost, 0, 0);
        if (evt.dataTransfer.setDragImage) {
          evt.dataTransfer.setDragImage(ghost, 0, 0);
        }
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', 'dragging');
        this.documentDragoverHandler = document.addEventListener(
          'dragover', (evt) => {
            this.cursorRect.x = evt.clientX;
            this.cursorRect.y = evt.clientY;
          });
      },

      onDrag(evt) {
        if (this.movingImpl !== 1)
          return;

        if (!this.cursorRect.x) {
          return;
        }
        const rect = evt.target.getBoundingClientRect();
        if (this.offsetRect.x === null) {
          this.offsetRect.x = this.cursorRect.x - (rect.x || rect.left);
          this.offsetRect.y = this.cursorRect.y - (rect.y || rect.top);
        }
        if (this.moving) {
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
        if (this.movingImpl !== 1)
          return;

        this.moving = false;
        document.removeEventListener('dragover', this.documentDragoverHandler);
        this.cursorRect.x = null;
        this.cursorRect.y = null;
        this.offsetRect.x = null;
        this.offsetRect.y = null;
      },

      //=======================
      // Keyboard events
      //=======================
      onKeydown() {
        if (this.sharedState.menuOpened) {
          // console.log('menu down');
        }
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

  .bl-window {
    user-select: none;
    background-color: #e2dfde;
    display: flex;
    flex-direction: column;
  }

  .bl-window:focus {
    outline: none;
  }

  .bl-window.main-window {
    width: 100%;
    height: 100%;
  }

  .bl-window.alert {
    background-color: #ECECEC;
  }

  .bl-window.alert .bl-view {
    pointer-events: auto;
  }

  .bl-window.key {
    z-index: 1;
  }
</style>

<style scoped>
  .bl-window .title-bar {
    height: 32px;
    background-color: #e2dfde;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
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

  .bl-window .title-bar button:active {
    background-color: green;
  }

  .bl-window .title-bar .title {
    text-shadow: 0 0 10px #ffffff;
  }

  .bl-window.inactive .title-bar .title {
    color: lightgrey;
  }

  .sub-window {
    position: absolute;
    top: 100px;
    left: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px grey;
  }

  .bl-window .edge-top, .edge-right, .edge-bottom, .edge-left {
    position: absolute;
    background-color: transparent;
  }

  .bl-window .edge-top, .edge-bottom {
    width: 100%;
    height: 5px;
  }

  .bl-window .edge-right, .edge-left {
    height: 100%;
    width: 5px;
  }

  .bl-window .edge-top {
    top: -5px;
    cursor: n-resize;
  }

  .bl-window .edge-right {
    right: -5px;
    cursor: e-resize;
  }

  .bl-window .edge-bottom {
    bottom: -5px;
    cursor: s-resize;
  }

  .bl-window .edge-left {
    left: -5px;
    cursor: w-resize;
  }
</style>
