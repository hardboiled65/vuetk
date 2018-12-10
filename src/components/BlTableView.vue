<template>
  <div class="bl-table-view"
    :style="controlStyle">
    <slot name="column"></slot>
    <!-- <bl-table-column
      v-for="(column, idx) in instance.columns" :key="idx">
    </bl-table-column> -->
  </div>
</template>

<script>
  import BlTableColumn from './BlTableColumn'

  import ControlMixin from '../mixins/ControlMixin'

  import TableView from '../classes/TableView'

  export default {
    name: 'bl-table-view',

    components: {
      BlTableColumn,
    },

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
