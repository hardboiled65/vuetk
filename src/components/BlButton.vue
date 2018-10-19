<template>
  <button class="bl-button"
    :class="{
      'push-button': type === $bl.Button.ButtonType.PushButton,
    }"
    @click="instance.action">
      <span
        v-if="type === $bl.Button.ButtonType.PushButton">{{ instance.title }}</span>
  </button>
</template>

<script>
  import Button from '@/classes/Button'

  export default {
    name: 'bl-button',

    props: {
      instance: {
        type: Button
      },
    },

    computed: {
      type() {
        return this.instance.type;
      }
    }
  }
</script>

<style>
  .bl-button {
    background-color: grey;
  }

  .bl-button.push-button {
    min-width: 76px;
    height: 18px;
    border: 0;
    border-radius: 3px;
    background-color: #eeeeee;
  }

  .bl-button.push-button:active {
    background-color: #dddddd;
  }
</style>