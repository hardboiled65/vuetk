<template>
  <bl-window class="bl-alert" ref="window"
    :instance="instance"
    :setButtonWindowClose="false"
    :setButtonWindowMinimize="false"
    @windowBlink="onWindowBlink">
    <template slot="body">
      <img :src="instance.icon.src('32x32')">
      <h1 v-if="instance.message">{{ instance.message }}</h1>
      <div>{{ instance.informativeText }}</div>
      <div class="buttons">
        <bl-button
          v-for="(button, idx) in instance.buttons" :key="idx"
          :instance="button">
        </bl-button>
      </div>
    </template>
  </bl-window>
</template>

<script>
  import BlWindow from './BlWindow'
  import BlButton from './BlButton'

  import { Alert } from '../classes/Window'
  // import Button from '../classes/Button'

  export default {
    name: 'bl-alert',

    components: {
      BlWindow,
      BlButton,
    },

    props: {
      instance: {
        type: Alert,
        required: true
      },
    },

    data: () => ({
      confirmButton: null,
      cancelButton: null,
    }),

    created() {
      this.instance.buttons[0].action = () => {
        // True
        this.instance._callback(true);
        this.$vuetk.state.modal = null;
        this.$vuetk.state.modalOpened = false;
      }
      this.instance.buttons[1].action = () => {
        // False
        this.instance._callback(false);
        this.$vuetk.state.modal = null;
        this.$vuetk.state.modalOpened = false;
      }

      this.instance._vm = this;
    },

    mounted() {
    },

    methods: {
      onWindowBlink() {
        this.$refs.window.blinkWindowTitleBar();
      },
    }
  }
</script>

<style scoped>
  .bl-alert {
    pointer-events: initial;
  }

  .bl-alert .buttons {
    display: flex;
    flex-direction: row-reverse;
  }

  .bl-alert .bl-view {
    pointer-events: inherit;
  }
</style>