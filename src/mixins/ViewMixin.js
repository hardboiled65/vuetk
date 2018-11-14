const Stick = {
  Top: 0b0001,
  Right: 0b0010,
  Bottom: 0b0100,
  Left: 0b1000
};

export default {
  props: {
    anchorTop: {
      type: Number,
      default: null
    },

    anchorRight: {
      type: Number,
      default: null
    },

    anchorBottom: {
      type: Number,
      default: null
    },

    anchorLeft: {
      type: Number,
      default: null
    },
  },

  data() {
    return {
      sharedState: this.$vuetk.state,
    };
  },

  computed: {
    _anchorTop() {
      return this.anchorTop;
    },

    _anchorRight() {
      return this.anchorRight;
    },

    _anchorBottom() {
      return this.anchorBottom;
    },

    _anchorLeft() {
      return this.anchorLeft;
    },

    //================
    // Vue class
    //================
    viewClass() {
      let cls = {
        'bl-view': true
      };

      if (this.sharedState.menuOpened || this.sharedState.modal !== null) {
        cls['pointer-events-none'] = true;
      }
      return cls;
    },

    //=================
    // Vue style
    //=================
    viewStyle() {
      let style = {
        flexGrow: this.$_ViewMixin_flexGrow,
      };
      if (this.$_ViewMixin_flexGrow === '1') {
        style.height = '100%';
      }

      return style;
    },

    $_ViewMixin_flexGrow() {
      if (this._anchorTop !== null &&
          this._anchorRight !== null &&
          this._anchorBottom !== null &&
          this._anchorLeft !== null) {
        return '1';
      }
      return false;
    },

    $_ViewMixin_stick() {
      let stick = 0;
      stick |= (this._anchorTop !== null) ? Stick.Top : 0;
      stick |= (this._anchorRight !== null) ? Stick.Right : 0;
      stick |= (this._anchorBottom !== null) ? Stick.Bottom : 0;
      stick |= (this._anchorLeft !== null) ? Stick.Left : 0;
      return stick;
    },
  },

  created() {
  }
}
