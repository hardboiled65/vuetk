<template>
  <div class="bl-browser">
    <bl-view class="column"
      v-for="(column, columnIdx) in instance.columns" :key="columnIdx"
      :class="Object.assign(viewClass, { [`column-${columnIdx}`]: true })"
      @click.native="() => {
        $emit('selectColumn', columnIdx);
        $emit('selectRow', columnIdx, null);
      }">
      <bl-view class="row"
        v-for="(row, idx) in column.rows" :key="idx"
        @click.native.stop="$emit('selectRow', columnIdx, idx)">
        <span>{{ row }}</span>
      </bl-view>
    </bl-view>
    <slot></slot>
  </div>
</template>

<script>
  import BlView from './BlView'

  import ViewMixin from '../mixins/ViewMixin'

  import Browser from '../classes/Browser'
  document.Browser = Browser;

  export default {
    name: 'bl-browser',

    components: {
      BlView,
    },

    mixins: [
      ViewMixin
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
    height: 80%;
  }

  .bl-browser .column {
    width: 300px;
    border-right: 1px solid grey;
    background-color: #ffffff;
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