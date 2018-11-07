<template>
  <div class="bl-menu-bar"
    :class="{}">
    <slot></slot>
  </div>
</template>

<script>
  import BlMenu from './BlMenu'

  import ViewMixin from '../mixins/ViewMixin'

  import Menu from '../classes/Menu'

  export default {
    name: 'bl-menu-bar',

    components: {
      BlMenu,
    },

    mixins: [
      ViewMixin
    ],

    props: {
    },

    data: () => ({
    }),

    computed: {
    },

    methods: {
      onClickMenu(idx) {
        if (this.openedMenuIndex === idx) {
          this.$bl.app.menu = null;
          this.$bl.state.menuOpened = false;
        } else {
          this.$bl.app.menu = this.menus[idx];
          this.$bl.state.menuOpened = true;
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
    display: flex;
    height: 30px;
    background-color: #eeedeb;
  }
</style>