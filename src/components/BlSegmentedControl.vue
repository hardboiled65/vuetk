<template>
  <div class="bl-segmented-control"
    :class="segmentedControlClass">
    <div class="segment"
      v-for="(segment, idx) in instance.segments" :key="idx"
      :class="{
        'selected': idx === instance.selectedSegment,
      }"
      @mousedown="pressSegment(idx)"
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

  const SwitchTracking = SegmentedControl.SwitchTracking;

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
      segmentedControlClass() {
        let style = {
          'separated': this.instance.style === SegmentedControl.Style.Separated,
        };
        return style;
      },
    },

    methods: {
      pressSegment(idx) {
        if (this.instance.trackingMode === SwitchTracking.Momentary) {
          this.instance.selectSegment(idx);
        }
      },

      selectSegment(idx) {
        if (this.instance.selectedSegment !== idx) {
          this.instance.selectSegment(idx);
        }
        this.releaseSegment();
      },

      releaseSegment() {
        if (this.instance.trackingMode !== SwitchTracking.Momentary) {
          return;
        }
        this.instance.selectSegment(-1);
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

  .bl-segmented-control .segment:active ._styler {
    background-color: green;
  }

  .bl-segmented-control.separated .segment ._styler {
    border-radius: 3px;
  }

  .bl-segmented-control .segment.selected ._styler {
    background-color: white;
  }
</style>