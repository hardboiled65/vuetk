<template>
  <div class="bl-stack-view">
    <slot></slot>
  </div>
</template>

<script>
  import ViewMixin from '../mixins/ViewMixin'

  export default {
    name: 'bl-stack-view',

    mixins: [
      ViewMixin,
    ],
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