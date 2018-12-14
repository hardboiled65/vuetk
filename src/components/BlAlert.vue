<template>
  <bl-window class="bl-alert" ref="window"
    :instance="instance"
    :setButtonWindowClose="false"
    :setButtonWindowMinimize="false"
    @windowBlink="onWindowBlink">
    <template slot="body">
      <bl-view
        :layoutType="$bl.View.Layout.LayoutType.Flexbox"
        :orientation="$bl.View.Layout.Orientation.Vertical"
        :width="'Auto'">
        <bl-view
          :layoutType="$bl.View.Layout.LayoutType.Flexbox"
          :orientation="$bl.View.Layout.Orientation.Horizontal"
          :width="300">
          <bl-image-view
            :instance="imageView">
          </bl-image-view>
          <bl-view
            :layoutType="$bl.View.Layout.LayoutType.Flexbox"
            :orientation="$bl.View.Layout.Orientation.Vertical"
            :width="'Auto'">
            <h1 v-if="instance.message">{{ instance.message }}</h1>
            <div>{{ instance.informativeText }}</div>
          </bl-view>
        </bl-view>
        <div class="buttons">
          <bl-button
            v-for="(button, idx) in instance.buttons" :key="idx"
            :instance="button">
          </bl-button>
        </div>
      </bl-view>
    </template>
  </bl-window>
</template>

<script>
  import BlWindow from './BlWindow'
  import BlView from './BlView'
  import BlButton from './BlButton'
  import BlImageView from './BlImageView'

  import { Alert } from '../classes/Window'
  import ImageView from '../classes/ImageView'
  // import Button from '../classes/Button'

  export default {
    name: 'bl-alert',

    components: {
      BlWindow,
      BlView,
      BlButton,
      BlImageView,
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
      // Set as key window.
      this.instance.state = Alert.WindowState.Key;

      // Set icon.
      this.imageView = new ImageView(this.instance.icon);
      this.imageView.width = 64;
      this.imageView.height = 64;

      // Set buttons.
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