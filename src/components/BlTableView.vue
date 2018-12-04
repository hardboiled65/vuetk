<template>
  <div class="bl-table-view"
    :style="controlStyle">
    <slot name="column"></slot>
  </div>
</template>

<script>
  import ControlMixin from '../mixins/ControlMixin'

  import TableView from '../classes/TableView'

  export default {
    name: 'bl-table-view',

    mixins: [
      ControlMixin,
    ],

    props: {
      instance: {
        type: TableView,
        required: true
      },
    },

    computed: {
    },
  }
</script>
