export default {
  props: {},

  data() {
    return {
      sharedState: this.$vuetk.state,
    };
  },

  computed: {
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
      if (this.instance._anchor.top !== null &&
          this.instance._anchor.right !== null &&
          this.instance._anchor.bottom !== null &&
          this.instance._anchor.left !== null) {
        return '1';
      }
      return false;
    },
  },

  created() {
  }
}
