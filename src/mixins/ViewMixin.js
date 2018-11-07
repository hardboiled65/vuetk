export default {
  props: {},

  data() {
    return {
      sharedState: this.$bl.state,
    };
  },

  computed: {
    viewClass() {
      let cls = {
        'bl-view': true
      };

      if (this.sharedState.menuOpened || this.sharedState.modalOpened) {
        cls['pointer-events-none'] = true;
      }
      return cls;
    },
  },

  created() {
  }
}
