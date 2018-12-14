<template>
  <div class="bl-toolbar-item">
    <slot
      :anchorTop="null"
      :anchorRight="null"
      :anchorBottom="null"
      :anchorLeft="null"></slot>
    <div class="label"
      v-if="showLabel">{{ label }}</div>
  </div>
</template>

<script>
  import ViewMixin from '../mixins/ViewMixin'

  import Toolbar from '../classes/Toolbar'

  export default {
    name: 'bl-toolbar-item',

    mixins: [
      ViewMixin,
    ],

    props: {
      label: {
        type: String,
        default: null
      },
    },

    computed: {
      showLabel() {
        const toolbar = this.$parent.instance;
        return (toolbar.displayMode === Toolbar.DisplayMode.IconAndLabel ||
          toolbar.displayMode === Toolbar.DisplayMode.LabelOnly);
      },
    }
  }
</script>

<style scoped>
  .bl-toolbar-item {}

  .bl-toolbar-item .label {
    font-size: 10pt;
  }
</style>