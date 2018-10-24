export default {
  props: {},

  computed: {
    viewClass() {
      let cls = {
        'bl-view': true
      };

      if (this.$bl.app.menu || this.$bl.app.modal) {
        cls['pointer-events-none'] = true;
      }
      return cls;
    },
  },

  created() {
  }
}
