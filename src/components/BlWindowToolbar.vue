<template>
  <div class="bl-window-toolbar"
    :class="{
    }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'bl-window-toolbar',

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