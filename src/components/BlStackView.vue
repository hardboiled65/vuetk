<template>
  <div class="bl-stack-view"
    :class="stackViewClass">
    <slot></slot>
  </div>
</template>

<script>
  import ViewMixin from '../mixins/ViewMixin'

  import StackView from '../classes/StackView'

  export default {
    name: 'bl-stack-view',

    mixins: [
      ViewMixin,
    ],

    props: {
      instance: {
        type: StackView,
        default: () => (new StackView())
      },
    },

    computed: {
      horizontal() {
        return this.instance.orientation === StackView.Orientation.Horizontal;
      },

      vertical() {
        return this.instance.orientation === StackView.Orientation.Vertical;
      },

      //================
      // Vue class
      //================
      stackViewClass() {
        let cls = {
          'horizontal': this.horizontal,
          'vertical': this.vertical,
        };

        return cls;
      },
    }
  }
</script>

<style scoped>
  .bl-stack-view {
    display: flex;
  }

  .bl-stack-view.horizontal {
    flex-direction: row;
  }

  .bl-stack-view.vertical {
    flex-direction: column;
  }
</style>