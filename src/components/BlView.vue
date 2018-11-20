<template>
  <section
    :class="blViewClass"
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

      layoutType: {
        type: Symbol,
        default: null
      },

      orientation: {
        type: Symbol,
        default: null
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
      },

      //================
      // Vue class
      //================
      blViewClass() {
        const inst = this._constant || this.instance;
        let cls = Object.assign({
          'flexbox': inst.layout.type === View.Layout.LayoutType.Flexbox,
          'grid': inst.layout.type === View.Layout.LayoutType.Grid,
          'horizontal': inst.layout.orientation === View.Layout.Orientation.Horizontal,
          'vertical': inst.layout.orientation === View.Layout.Orientation.Vertical,
        }, this.viewClass);

        return cls;
      }
    }
  }
</script>

<style>
  .bl-view {
    display: flex;
    position: relative;
  }

  .bl-view.flexbox.horizontal {
    flex-direction: row;
  }

  .bl-view.flexbox.vertical {
    flex-direction: column;
  }
</style>