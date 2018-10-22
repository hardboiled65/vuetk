<template>
  <div class="bl-window-toolbar"
    :class="{
    }">
    <slot></slot>
  </div>
</template>

<script>
  import ViewMixin from '@/mixins/ViewMixin'

  export default {
    name: 'bl-window-toolbar',

    mixins: [
      ViewMixin
    ],

    props: {
    },

    computed: {
    }
  }
</script>

<style>
  .bl-window-toolbar {
    height: 40px;
    background-color: grey;
  }
</style>