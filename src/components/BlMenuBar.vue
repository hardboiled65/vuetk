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
    }),

    computed: {
      openedMenuIndex() {
        if (this.$bl.app.menu === null) {
          return null;
        }
        const found = this.menus.findIndex(m => {
          return m === this.$bl.app.menu;
        });
        if (found > -1) {
          return found;
        }
        return null;
      },
    },

    methods: {
      onClickMenu(idx) {
        if (this.openedMenuIndex === idx) {
          this.$bl.app.menu = null;
        } else {
          this.$bl.app.menu = this.menus[idx];
        }
      },

      onMouseenterMenu(idx) {
        if (this.openedMenuIndex === null) {
          return;
        }
        if (idx !== this.openedMenuIndex) {
          this.$bl.app.menu = this.menus[idx];
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