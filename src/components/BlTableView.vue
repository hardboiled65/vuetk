<template>
  <div class="bl-table-view">
  </div>
</template>

<script>
  import ControlMixin from '../mixins/ControlMixin'

  export default {
    name: 'bl-table-view',

    mixins: [
      ControlMixin,
    ],

    props: {
      instance: {
        type: Object,
        required: true
      },
    },
  }
</script>
