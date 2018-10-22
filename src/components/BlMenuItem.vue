<template>
  <div class="bl-menu-item"
    :class="{
    }"
    @click.capture="onClick($event)">
    <span>{{ instance.title }}</span>
  </div>
</template>

<script>
  import MenuItem from '@/classes/MenuItem'

  export default {
    name: 'bl-menu-item',

    props: {
      instance: {
        type: MenuItem,
        required: true
      },
    },

    computed: {
    },

    methods: {
      onClick(evt) {
        console.log('menu item clicked');
      },
    }
  }
</script>

<style>
</style>