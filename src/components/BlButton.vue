<template>
  <button class="bl-button"
    v-if="instance"
    :class="buttonClass"
    :style="buttonStyle"
    :disabled="!instance.enabled"
    @click="instance.action">
    <span class="_styler"
      v-if="pushButton">{{ instance.title }}</span>
  </button>
</template>

<script>
  import ControlMixin from '../mixins/ControlMixin'

  import Button from '../classes/Button'

  export default {
    name: 'bl-button',

    mixins: [
      ControlMixin
    ],

    props: {
      instance: {
        type: Button
      },

      title: {
        type: String,
        default: null
      },
    },

    computed: {
      buttonClass() {
        let cls = Object.assign({}, this.controlClass);

        cls['push-button'] = this.pushButton;

        return cls;
      },

      pushButton() {
        return this.instance.type === Button.ButtonType.PushButton;
      },

      //================
      // Vue style
      //================
      buttonStyle() {
        let style = Object.assign({}, this.controlStyle);
        style.height = null;

        if (!this.instance.enabled) {
          style.pointerEvents = 'none';
        }

        return style;
      },
    },

    created() {
      if (this.title !== null) {
        this.instance.title = this.title;
      }
    },
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
    background-color: transparent;
    display: flex;
    align-items: center;
  }

  .bl-button.push-button ._styler {
    height: 30px;
    width: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    border-radius: 3px;
    box-shadow: 0 1px 2px darkgrey;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bl-button.push-button:active ._styler {
    background-color: #dddddd;
  }
</style>