<template>
  <button class="bl-button"
    v-if="instance"
    :class="buttonClass"
    @click="instance.action">
      <span
        v-if="type === $bl.Button.ButtonType.PushButton">{{ instance.title }}</span>
  </button>
</template>

<script>
  import ControlMixin from '../mixins/ControlMixin'

  import Button from '../classes/Button'

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
    },

    mixins: [
      ControlMixin
    ],

    computed: {
      type() {
        return this.instance.type;
      },

      buttonClass() {
        let cls = Object.assign({}, this.controlClass);

        cls['push-button'] = this.type === Button.ButtonType.PushButton;

        return cls;
      }
    }
  }
</script>

<style>
  .bl-button {
    background-color: green;
  }

  .bl-button.push-button {
    min-width: 76px;
    height: 34px;
    border: 0;
    padding: 2px;
    border-radius: 3px;
    background-color: transparent;
    display: flex;
    align-items: center;
  }

  .bl-button.push-button span {
    height: 32px;
    width: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  }

  .bl-button.push-button:active {
    background-color: #dddddd;
  }
</style>