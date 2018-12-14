<template>
  <div class="bl-browser"
    :style="controlStyle">
    <section class="column"
      v-for="(column, columnIdx) in instance.columns" :key="columnIdx"
      :class="{
        [`column-${columnIdx}`]: true,
        selected: instance.selectedColumn === columnIdx,
      }"
      @click="() => {
        onSelectColumn(columnIdx);
        onSelectRow(columnIdx, null);
      }">
      <div class="row"
        style="text-align: left;"
        v-for="(row, idx) in column.rows" :key="idx"
        :class="{ selected: instance.selectedRow(columnIdx) === idx }"
        @click.stop="onSelectRow(columnIdx, idx)">
        <span>{{ row }}</span>
      </div>
    </section>
    <slot></slot>
  </div>
</template>

<script>
  import BlView from './BlView'

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

    updated() {
      if (this.instance.selectedColumn === this.instance.columns.length -1) {
        this.$el.scrollLeft = this.$el.scrollWidth;
      }
    },

    methods: {
      onSelectColumn(columnIdx) {
        this.instance._selectedColumn = (columnIdx !== null) ? columnIdx : -1;
        this.$emit('selectColumn', columnIdx);
      },

      onSelectRow(columnIdx, rowIdx) {
        if (rowIdx === null) {
          this.instance.selectRow(-1, columnIdx);
        } else {
          this.instance.selectRow(rowIdx, columnIdx);
        }
        this.instance._selectedColumn = columnIdx;
        this.$emit('selectRow', columnIdx, rowIdx);
      },
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
    background-color: blue;
    color: white;
  }

  .bl-browser .column:not(.selected) .row.selected {
    background-color: grey;
  }

  .bl-browser .column.selected .row.selected {
    background-color: #9999ff;
    color: white;
  }

  .resize-area {
    width: 5px;
    background-color: black;
  }
</style>