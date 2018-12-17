<template>
  <span class="bl-label"
    :class="labelClass">
    <span>{{ instance.text }}</span>
  </span>
</template>

<script>
  import ControlMixin from '../mixins/ControlMixin'

  import Label from '../classes/Label'

  export default {
    name: 'bl-label',

    mixins: [
      ControlMixin,
    ],

    props: {
      text: {
        type: String,
        default: null
      },

      instance: {
        type: Label,
        default: () => (new Label())
      },
    },

    computed: {
      labelClass() {
        let cls = Object.assign({
          'selectable': this.instance.selectable,
        }, this.controlClass);

        return cls;
      },
    },

    watch: {
      text(newVal, oldVal) {
        if (oldVal !== null) {
          this.instance.text = newVal;
        }
      },
    },

    created() {
      if (this.text !== null) {
        this.instance.text = this.text;
      }
    },
  }
</script>

<style scoped>
  .bl-label {
    user-select: none;
  }

  .bl-label.selectable {
    user-select: auto;
  }
</style>