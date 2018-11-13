import ViewMixin from './ViewMixin'

export default {
  props: {},

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
        cls['pointer-events-none'] = true;
      }
      return cls;
    },

    //=================
    // Vue style
    //=================
    controlStyle() {
      return {
      };
    },
  },

  created() {
  }
}
