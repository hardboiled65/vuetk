export default {
  props: {},

  data() {
    return {
      sharedState: this.$vuetk.state,
    };
  },

  computed: {
    viewClass() {
      let cls = {
        'bl-view': true
      };

      if (this.sharedState.menuOpened || this.sharedState.modal !== null) {
        cls['pointer-events-none'] = true;
      }
      return cls;
    },
  },

  created() {
  }
}
