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

    props: {
      instance: {
        type: View,
        default: () => (new View())
      },
    },

    mixins: [
      ViewMixin
    ],
  }
</script>

<style>
  .bl-view {
    display: flex;
    position: relative;
  }
</style>