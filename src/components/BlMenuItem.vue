<template>
  <div class="bl-menu-item" tabindex="-1"
    :class="menuItemClass"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @click.stop="onClick($event)">
    <span class="bl-menu-item-node"
      v-if="!instance.isSeparator()"
      style="height: 26px;">{{ instance.title }}</span>
    <div class="bl-menu-item-node"
      v-else>-----</div>
    <bl-menu ref="submenu"
      v-if="instance.hasSubmenu() && submenuOpened"
      :instance="instance.submenu">
    </bl-menu>
  </div>
</template>

<script>
  // import BlMenu from './BlMenu'

  import ViewMixin from '../mixins/ViewMixin'

  import Menu from '../classes/Menu'
  import MenuItem from '../classes/MenuItem'

  export default {
    name: 'bl-menu-item',

    components: {
      BlMenu: () => import('./BlMenu'),
    },

    mixins: [
      ViewMixin,
    ],

    props: {
      instance: {
        type: MenuItem,
        required: true
      },

      focused: {
        type: Boolean,
        default: false
      },
    },

    data: () => ({
      submenuOpened: false,
    }),

    computed: {
      menuItemClass() {
        let cls = Object.assign({
          'enabled': true,
          'focused': this.focused,
        }, this.viewClass);
        cls['pointer-events-none'] = false;

        if (this.instance.isSeparator()) {
          cls['enabled'] = false;
        }

        if (this.$parent.instance.type === Menu.MenuType.MenuBarMenu) {
          cls['menu-bar-menu-item'] = true;
        }
        return cls;
      },

      menuBarMenuItem() {
        return (this.$parent.instance.type === Menu.MenuType.MenuBarMenu);
      },
    },

    watch: {
      'sharedState.menuOpened'(newVal) {
        if (!newVal) {
          this.submenuOpened = false;
          this.$emit('focusout');
        }
      },

      focused(newVal) {
        if (!newVal) {
          this.submenuOpened = false;
        } else {
          if (this.instance.hasSubmenu()) {
            this.submenuOpened = true;
          }
        }
      },
    },

    methods: {
      onClick(evt) {
        // Ignore separator item.
        if (this.instance.isSeparator()) {
          return;
        }
        if (this.instance.hasSubmenu()) {
          this.submenuOpened = !this.submenuOpened;
        }
        if (this.menuBarMenuItem) {
          if (!this.focused) {
            this.$emit('focusin');
            this.sharedState.menuOpened = true;
          } else {
            this.$emit('focusout');
            this.sharedState.menuOpened = false;
          }
        }
        if (this.instance.action) {
          this.instance.action();
        }
        console.log('menu item clicked');
      },

      onMouseenter() {
        if (this.menuBarMenuItem && this.sharedState.menuOpened) {
          this.$emit('focusin');
        } else if (this.sharedState.menuOpened) {
          this.$emit('focusin');
        }
      },

      onMouseleave() {
        if (!this.menuBarMenuItem) {
          this.$emit('focusout');
        }
      },
    }
  }
</script>

<style scoped>
  .bl-menu-item {
    height: 30px;
    display: flex;
    align-items: center;
  }

  .bl-menu-item.menu-bar-menu-item {
    position: relative;
  }

  .bl-menu-item > span {
    width: 100%;
    margin: 2px;
    padding: 0 5px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .bl-menu-item.focused > span {
    background-color: #bbb4b1;
    box-shadow: inset 0 1px 1px darkgrey;
  }
</style>