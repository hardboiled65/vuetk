<template>
  <div class="bl-image-view"
    :style="imageViewStyle">
    <img
      :src="imageSrc"
      :width="instance.width"
      :height="instance.height">
  </div>
</template>

<script>
  import ControlMixin from '../mixins/ControlMixin'

  import ImageView from '../classes/ImageView'

  export default {
    name: 'bl-image-view',

    mixins: [
      ControlMixin,
    ],

    props: {
      instance: {
        type: ImageView,
        required: true
      },
    },

    computed: {
      imageSrc() {
        return this.instance.image.src('32x32');
      },

      //================
      // Vue style
      //================
      imageViewStyle() {
        let style = Object.assign({
          width: `${this.instance.width}px`,
          height: `${this.instance.height}px`,
        }, this.controlStyle);

        return style;
      },
    },
  }
</script>