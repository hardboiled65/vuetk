<template>
  <div
    :class="viewClass"
    @click="$emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
  import ViewMixin from '@/mixins/ViewMixin'

  export default {
    name: 'bl-view',

    mixins: [
      ViewMixin
    ],
  }
</script>
