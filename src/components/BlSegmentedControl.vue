<template>
  <div class="bl-segmented-control">
    <div class="segment"
      v-for="(segment, idx) in instance.segments" :key="idx"
      :class="{
        'selected': idx === instance.selectedSegment,
      }"
      @click="selectSegment(idx)">
      <div class="_styler">
        <img
          v-if="segment.image !== null"
          width="16"
          height="16"
          :src="segment.image.src('16x16')">
        <span
          v-else>{{ segment.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import ViewMixin from '../mixins/ViewMixin'

  import SegmentedControl from '../classes/SegmentedControl'

  export default {
    name: 'bl-segmented-control',

    mixins: [
      ViewMixin,
    ],

    props: {
      instance: {
        type: SegmentedControl,
        required: true
      },
    },

    data: () => ({
    }),

    computed: {
    },

    methods: {
      selectSegment(idx) {
        if (this.instance.selectedSegment !== idx) {
          this.instance.selectSegment(idx);
        }
      },
    }
  }
</script>

<style scoped>
  .bl-segmented-control {
    display: flex;
    flex-direction: row;
    border-radius: 3px;
  }

  .bl-segmented-control .segment {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 34px;
    width: 40px;
  }

  .bl-segmented-control .segment ._styler {
    height: 30px;
    width: 100%;
    background: linear-gradient(
      rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    box-shadow: 0 1px 2px darkgrey;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bl-segmented-control .segment:first-child ._styler {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .bl-segmented-control .segment:last-child ._styler {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .bl-segmented-control .segment.selected ._styler {
    background-color: white;
  }
</style>