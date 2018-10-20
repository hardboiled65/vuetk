<template>
  <div class="bl-menu-bar"
    :class="{
    }">
    <bl-menu
      v-for="(menu, idx) in menus" :key="idx"
      :opened="idx === openedMenuIndex"
      :instance="menu"
      @click="onClickMenu(idx)"
      @mouseenter="onMouseenterMenu(idx)">
    </bl-menu>
  </div>
</template>

<script>
  import BlMenu from './BlMenu'

  export default {
    name: 'bl-menu-bar',

    components: {
      BlMenu,
    },

    props: {
      menus: {
        type: Array,
        required: true
      },
    },

    data: () => ({
      openedMenuIndex: null,
    }),

    computed: {
    },

    methods: {
      onClickMenu(idx) {
        if (this.openedMenuIndex === idx) {
          this.openedMenuIndex = null;
        } else {
          this.openedMenuIndex = idx;
        }
      },

      onMouseenterMenu(idx) {
        if (this.openedMenuIndex === null) {
          return;
        }
        if (idx !== this.openedMenuIndex) {
          this.openedMenuIndex = idx;
        }
      }
    }
  }
</script>

<style scoped>
  .bl-menu-bar {
    display: block;
    height: 22px;
    background-color: #eeedeb;
  }
</style>