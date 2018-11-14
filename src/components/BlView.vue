<template>
  <section
    :class="viewClass"
    :style="viewStyle"
    @click="$emit('click', $event)">
    <slot></slot>
  </section>
</template>

<script>
  import ViewMixin from '../mixins/ViewMixin'

  import View from '../classes/View'

  export default {
    name: 'bl-view',

    mixins: [
      ViewMixin
    ],

    props: {
      constant: {
        type: String,
        default: null
      },

      instance: {
        type: View,
        default: () => (new View())
      },
    },

    computed: {
      _constant() {
        if (this.constant) {
          return View[this.constant];
        }
        return null;
      },

      _anchorTop() {
        return this.constant ? this._constant.anchorTop : this.anchorTop;
      },

      _anchorRight() {
        return this.constant ? this._constant.anchorRight : this.anchorRight;
      },

      _anchorBottom() {
        return this.constant ? this._constant.anchorBottom : this.anchorBottom;
      },

      _anchorLeft() {
        return this.constant ? this._constant.anchorLeft : this.anchorLeft;
      }
    }
  }
</script>

<style>
  .bl-view {
    display: flex;
    position: relative;
  }
</style>