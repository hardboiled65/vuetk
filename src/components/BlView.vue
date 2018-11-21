<template>
  <section
    :class="blViewClass"
    :style="blViewStyle"
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

      width: {
        type: [Number, String],
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
      },

      blViewStyle() {
        let style = Object.assign({}, this.viewStyle);

        const inst = this._constant || this.instance;
        if (inst.rect.width !== null) {
          style.width = `${inst.rect.width}px`;
          style.flexShrink = '0';
        } else {
          style.width = '0';
          style.flexGrow = '1';
        }

        if (this.constant === 'WindowBody') {
          style.width = '100%';
        }

        return style;
      }
    },

    created() {
      if (this.width !== null) {
        this.instance.rect.width = this.width;
      }
    },
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