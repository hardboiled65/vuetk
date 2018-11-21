<template>
  <div class="bl-browser"
    :style="controlStyle">
    <section class="column"
      v-for="(column, columnIdx) in instance.columns" :key="columnIdx"
      :class="{ [`column-${columnIdx}`]: true }"
      @click="() => {
        $emit('selectColumn', columnIdx);
        $emit('selectRow', columnIdx, null);
      }">
      <div class="row"
        v-for="(row, idx) in column.rows" :key="idx"
        @click.stop="$emit('selectRow', columnIdx, idx)">
        <span>{{ row }}</span>
      </div>
    </section>
    <slot></slot>
  </div>
</template>

<script>
  import BlView from './BlView'

  import ViewMixin from '../mixins/ViewMixin'
  import ControlMixin from '../mixins/ControlMixin'

  import Browser from '../classes/Browser'

  export default {
    name: 'bl-browser',

    components: {
      BlView,
    },

    mixins: [
      ControlMixin,
    ],

    props: {
      instance: {
        type: Browser,
        required: true
      },
    },

    data: () => ({
    }),

    computed: {
    },

    methods: {
    }
  }
</script>

<style scoped>
  .bl-browser {
    display: flex;
    overflow-x: auto;
  }

  .bl-browser .column {
    width: 300px;
    border-right: 1px solid grey;
    background-color: #ffffff;
    flex-shrink: 0;
  }

  .bl-browser .column .row:hover {
    background-color: #9999ff;
    color: white;
  }

  .resize-area {
    width: 5px;
    background-color: black;
  }
</style>