<template>
  <button class="bl-button"
    :class="buttonClass"
    @click="instance.action">
      <span
        v-if="type === $bl.Button.ButtonType.PushButton">{{ instance.title }}</span>
  </button>
</template>

<script>
  import ViewMixin from '@/mixins/ViewMixin'

  import Button from '@/classes/Button'

  export default {
    name: 'bl-button',

    props: {
      instance: {
        type: Button
      },

      title: {
        type: String,
        default: null
      },

      title: {
        type: String,
        default: null
      },
    },

    mixins: [
      ViewMixin
    ],

    computed: {
      type() {
        return this.instance.type;
      },

      buttonClass() {
        let cls = Object.assign({}, this.viewClass);

        cls['push-button'] = this.type === Button.ButtonType.PushButton;

        return cls;
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