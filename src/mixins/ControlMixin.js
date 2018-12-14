import ViewMixin from './ViewMixin'

export default {
  props: {
    enabled: {
      type: Boolean,
      default: null
    },
  },

  mixins: [
    ViewMixin,
  ],

  data() {
    return {
    };
  },

  computed: {
    //================
    // Vue class
    //================
    controlClass() {
      let cls = {
      };

      if (this.sharedState.menuOpened || this.sharedState.modal !== null) {
        // cls['pointer-events-none'] = true;
      }
      return cls;
    },

    //=================
    // Vue style
    //=================
    controlStyle() {
      let style = {};

      if (this.$_ViewMixin_stick > 0 && this.$_ViewMixin_stick !== 0b1111) {
        style.position = 'absolute';
        if (this._anchorTop !== null) {
          style.top = `${this._anchorTop}px`;
        }
        if (this._anchorRight !== null) {
          style.right = `${this._anchorRight}px`;
        }
        if (this._anchorBottom !== null) {
          style.bottom = `${this._anchorBottom}px`;
        }
        if (this._anchorLeft !== null) {
          style.left = `${this._anchorLeft}px`;
        }
      } else if (this.$_ViewMixin_stick === 0b1111) {
        style.display = 'absolute';
        style.boxSizing = 'border-box';
        style.width = '100%';
        style.height = '100%';
        style.paddingTop = `${this._anchorTop}px`;
        style.paddingRight = `${this._anchorRight}px`;
        style.paddingBottom = `${this._anchorBottom}px`;
        style.paddingLeft = `${this._anchorLeft}px`;
      }

      return style;
    },
  },

  watch: {
    enabled(newVal, oldVal) {
      if (oldVal !== null) {
        this.instance.enabled = newVal;
      }
    },
  },

  created() {
    if (this.enabled !== null) {
      this.instance.enabled = this.enabled;
    }
  }
}
