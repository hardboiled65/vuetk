<template>
  <div class="bl-menu"
    :class="{
      'menu-bar-menu': type === $bl.Menu.MenuType.MenuBarMenu,
      'context-menu': type === $bl.Menu.MenuType.ContextMenu,
      'opened': false,
      'submenu': type === $bl.Menu.MenuType.Submenu,
    }"
    @click="$emit('click')"
    @mouseenter="$emit('mouseenter')">
    <!-- <div class="menu-item-container"
      v-if="opened">
      <bl-menu-item
        v-for="item in instance.items" :key="item.title"
        :instance="item">
      </bl-menu-item>
    </div> -->
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

  import Menu from '../classes/Menu'

  export default {
    name: 'bl-menu',

    components: {
      BlMenuItem,
    },

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
    height: 100%;
    display: flex;
    align-items: center;
  }

  .bl-menu.menu-bar-menu.opened {
    background-color: green;
  }

  .bl-menu.submenu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    background-color: lightgrey;
  }

  .opened .menu-item-container {
    position: absolute;
    top: 30px;
    background-color: lightgrey;
  }
</style>