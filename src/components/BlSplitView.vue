<template>
  <div class="bl-split-view"
    :class="splitViewClass"
    :style="splitViewStyle">
    <slot></slot>
  </div>
</template>

<script>
  import ViewMixin from '../mixins/ViewMixin'

  import SplitView from '../classes/SplitView'

  export default {
    name: 'bl-split-view',

    mixins: [
      ViewMixin,
    ],

    props: {
      instance: {
        type: SplitView,
        default: () => (new SplitView())
      },
    },

    data() {
      return {
        subviewResizing: false,
        dividerIndex: null,

        subviews: [],

        dividerElements: [],

        dividerRect: {
          x: null,
          y: null,
        },
        cursorRect: {
          x: null,
          y: null,
        },
        documentMousemoveHandler: null,
        documentMouseupHandler: null,
      };
    },

    computed: {
      //================
      // Vue class
      //================
      splitViewClass() {
        let cls = {
        };

        return cls;
      },

      //=================
      // Vue style
      //=================
      splitViewStyle() {
        let cls = Object.assign({}, this.viewStyle);

        return cls;
      },

      $_subviewsLength() {
        return this.subviews.length;
      },

      subviewBeforeDivider() {
        if (this.dividerIndex === null) {
          return null;
        }
        return this.subviews[this.dividerIndex];
      },

      subviewAfterDivider() {
        if (this.dividerIndex === null) {
          return null;
        }
        return this.subviews[this.dividerIndex + 1];
      },
    },

    watch: {
      subviewResizing(newVal) {
        if (!newVal && this.documentMouseupHandler) {
          document.removeEventListener('mouseup', this.documentMouseupHandler);
          this.documentMouseupHandler = null;
        }
      },
    },

    created() {
    },

    mounted() {
      for (let i = 0; i < this.$children.length; ++i) {
        this.subviews.push(this.$slots.default[i].componentInstance.instance);
      }
      this.createDividers();
    },

    updated() {
      // Re-create subview list.
      this.subviews = [];
      for (let i = 0; i < this.$children.length; ++i) {
        this.subviews.push(this.$slots.default[i].componentInstance.instance);
      }
      // Update dividers.
      this.destroyDividers();
      this.createDividers();
    },

    methods: {
      dividerMousedownHandler(evt) {
        this.subviewResizing = true;
        this.dividerRect.x = evt.clientX;
        this.dividerRect.y = evt.clientY;
        this.dividerIndex = this.$_getDividerIndexByElement(evt.target);

        this.documentMousemoveHandler = (evt) => {
          this.cursorRect.x = evt.clientX;
          this.cursorRect.y = evt.clientY;
          let offset = this.cursorRect.x - this.dividerRect.x;
          if (this.subviewBeforeDivider.rect.width >= 0 &&
              this.subviewAfterDivider.rect.width > 0) {
            console.log(this.subviewBeforeDivider.rect.width, this.subviewAfterDivider.rect.width);
            this.subviewBeforeDivider.rect.width += offset;
          }
          if (this.subviewAfterDivider.rect.width >= 0) {
            this.subviewAfterDivider.rect.width -= offset;
          }
          this.dividerRect.x = evt.clientX;
        };
        document.addEventListener('mousemove', this.documentMousemoveHandler);

        this.documentMouseupHandler = () => {
          this.subviewResizing = false;
          this.dividerIndex = null;
          this.dividerRect.x = null;
          this.dividerRect.y = null;
          if (this.documentMousemoveHandler) {
            document.removeEventListener('mousemove', this.documentMousemoveHandler);
            this.documentMousemoveHandler = null;
          }
        };
        document.addEventListener('mouseup', this.documentMouseupHandler);
      },

      createDividers() {
        for (let i = 1; i < this.$_subviewsLength; ++i) {
          let divider = document.createElement('div');
          divider.className = 'divider';

          // Add event listeners.
          divider.addEventListener('mousedown', this.dividerMousedownHandler);

          // Insert divider.
          const parent = this.$slots.default[i].elm.parentNode;
          parent.insertBefore(divider, this.$slots.default[i].elm);
          this.dividerElements.push(divider);
        }
      },

      destroyDividers() {
        const dividers = this.dividerElements;
        const length = dividers.length;
        for (let i = length - 1; i >= 0; --i) {
          dividers[i].removeEventListener('mousedown',
            this.dividerMousedownHandler);
          dividers[i].remove();
          dividers.pop();
        }
      },

      $_getDividerIndexByElement(el) {
        let idx = 0;
        for (let i = 0; i < this.dividerElements.length; ++i) {
          if (el === this.dividerElements[i]) {
            break;
          }
          ++idx;
        }
        return idx;
      },
    }
  }
</script>

<style>
  .bl-split-view .divider {
    width: 1px;
    background-color: red;
    position: relative;
    cursor: col-resize;
    flex-shrink: 0;
  }

  .bl-split-view .divider::before {
    content: '';
    position: absolute;
    background-color: rgba(0, 255, 0, 0.5);
    height: 100%;
    width: 9px;
    left: -4px;
    z-index: 1;
  }
</style>

<style scoped>
  .bl-split-view {
    display: flex;
  }
</style>