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

  import ViewMixin from '@/mixins/ViewMixin'

  export default {
    name: 'bl-menu-bar',

    components: {
      BlMenu,
    },

    mixins: [
      ViewMixin
    ],

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
          this.$bl.app.menu = null;
        } else {
          this.openedMenuIndex = idx;
          this.$bl.app.menu = this.menus[idx];
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
    background-color: grey;
  }
</style>