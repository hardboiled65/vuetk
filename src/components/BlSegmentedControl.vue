<template>
  <div class="bl-segmented-control">
    <button class="segment"
      v-for="segment in instance.segments" :key="segment">
      {{ segment.label }}
    </button>
  </div>
</template>

<script>
  import ViewMixin from '@/mixins/ViewMixin'

  import SegmentedControl from '@/classes/SegmentedControl'

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
    }
  }
</script>

<style scoped>
</style>