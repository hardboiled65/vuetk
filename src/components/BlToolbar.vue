<template>
  <div class="bl-toolbar"
    v-if="instance"
    :class="toolbarClass">
    <slot></slot>
  </div>
</template>

<script>
  import ViewMixin from '../mixins/ViewMixin'

  import Toolbar from '../classes/Toolbar'

  export default {
    name: 'bl-toolbar',

    mixins: [
      ViewMixin
    ],

    props: {
      instance: {
        type: Toolbar,
        required: true
      },
    },

    computed: {
      toolbarClass() {
        const displayMode = this.instance.displayMode;
        let cls = Object.assign({
          'icon-and-label': displayMode === Toolbar.DisplayMode.IconAndLabel,
          'icon-only': displayMode === Toolbar.DisplayMode.IconOnly,
          'label-only': displayMode === Toolbar.DisplayMode.LabelOnly,
        }, this.viewClass);

        return cls;
      },
    }
  }
</script>

<style>
  .bl-toolbar {
    height: 40px;
    background-color: grey;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .bl-toolbar.icon-and-label {
    height: 54px;
    min-height: 54px;
  }

  .bl-toolbar.icon-only {
    height: 40px;
    min-height: 40px;
  }

  .bl-toolbar.label-only {
    height: 30px;
    min-height: 30px;
  }
</style>