<template>
  <div class="bl-menu" tabindex="-1" ref="menu"
    :class="menuClass"
    @mouseenter="$emit('mouseenter')"
    @click.stop="onClick"
    @keydown="onKeydown($event)">
    <bl-menu-item
      v-for="(item, idx) in instance.items" :key="idx"
      :instance="item"
      :focused="idx === focusedItemIndex"
      @focusin="onFocusinItem(idx)"
      @focusout="onFocusoutItem(idx)">
    </bl-menu-item>
  </div>
</template>

<script>
  import BlMenuItem from './BlMenuItem'

  import ViewMixin from '../mixins/ViewMixin'

  import Menu from '../classes/Menu'

  export default {
    name: 'bl-menu',

    components: {
      BlMenuItem,
    },

    mixins: [
      ViewMixin,
    ],

    props: {
      instance: {
        type: Menu,
        required: true
      },
    },

    data: () => ({
      focusedItemIndex: null,
    }),

    computed: {
      type() {
        return this.instance.type;
      },

      menuBarMenu() {
        return this.instance.type === Menu.MenuType.MenuBarMenu;
      },

      contextualMenu() {
        return this.instance.type === Menu.MenuType.ContextMenu;
      },

      submenu() {
        return this.instance.type === Menu.MenuType.Submenu;
      },

      menuClass() {
        return {
          'menu-bar-menu': this.menuBarMenu,
          'context-menu': this.contextualMenu,
          'submenu': this.submenu,
        };
      },
    },

    watch: {
      'sharedState.menuOpened'(newVal) {
        if (!newVal) {
          this.focusedItemIndex = null;
        }
      },
    },

    mounted() {
      if (this.submenu) {
        this.$refs.menu.focus();
      }
    },

    methods: {
      test() {
        // eslint-disable-next-line
        console.log('test');
      },

      onFocusinItem(idx) {
        this.focusedItemIndex = idx;
      },

      onFocusoutItem(idx) {
        this.focusedItemIndex = null;
      },

      onClick() {
        if (this.menuBarMenu && this.focusedItemIndex !== null) {
          this.sharedState.menuOpened = false;
        }
      },

      onKeydown(evt) {
        const itemsLength = this.instance.items.length;
        const itemIndex = this.focusedItemIndex;
        if (this.menuBarMenu && this.focusedItemIndex !== null) {
          // For menu bar menu.
          if (evt.key === 'ArrowRight') {
            this.focusedItemIndex = (this.focusedItemIndex + 1) % itemsLength
          } else if (evt.key === 'ArrowLeft') {
            this.focusedItemIndex = (this.focusedItemIndex <= 0)
              ? itemsLength - 1
              : this.focusedItemIndex - 1;
          } else if (evt.key === 'Escape') {
            this.focusedItemIndex = null;
            this.sharedState.menuOpened = false;
          }
        } else if (this.submenu) {
          // For submenu.
          if (evt.key === 'ArrowDown') {
            if (this.focusedItemIndex === null) {
              this.focusedItemIndex = 0;
            } else {
              (itemIndex === itemsLength - 1) ? null : ++this.focusedItemIndex;
            }
          } else if (evt.key === 'ArrowUp') {
            if (this.focusedItemIndex === null) {
              this.focusedItemIndex = itemsLength - 1;
            } else {
              (itemIndex === 0) ? null : --this.focusedItemIndex;
            }
          }
        }
      },
    }
  }
</script>

<style scoped>
  .bl-menu {
    display: table-cell;
    user-select: none;
  }

  .bl-menu.menu-bar-menu {
    padding: 0 10px;
    height: 30px;
    min-height: 30px;
    background-color: #eeedeb;
    display: flex;
    align-items: center;
  }

  .bl-menu.submenu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    z-index: 1;
    background-color: lightgrey;
  }

  .opened .menu-item-container {
    position: absolute;
    top: 30px;
    background-color: lightgrey;
  }
</style>