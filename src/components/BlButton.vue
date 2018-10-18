<template>
  <button class="bl-button"
    :class="{
      'push-button': type === $bl.ButtonType.PushButton,
    }">
  </button>
</template>

<script>
  export default {
    name: 'bl-button',

    props: {
      type: {
        type: Number,
        required: true,
        validator: (value) => {
          return Object.values(Vue.prototype.$bl.ButtonType).includes(value);
        }
      },
    },

    computed: {
    }
  }
</script>

<style>
  .bl-button {
    background-color: grey;
  }
</style>