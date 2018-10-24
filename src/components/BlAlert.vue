<template>
  <bl-window class="bl-alert" ref="window"
    :hasButtonWindowClose="false"
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
  import BlWindow from '@/components/BlWindow'
  import BlButton from '@/components/BlButton'

  import { Alert } from '@/classes/Window'
  import Button from '@/classes/Button'

  export default {
    name: 'bl-alert',

    components: {
      BlWindow,
      BlButton,
    },

    props: {
      value: {
        // type: Alert,
        required: true,
        validator(value) {
          return (value === null) || (value instanceof Alert);
        }
      },

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
      this.instance.buttons[1].action = () => {
        this.$emit('input', null);
      }
    },

    mounted() {
      this.$refs.window.title = '';
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