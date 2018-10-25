<template>
  <div class="bl-menu"
    :class="{
      'menu-bar-menu': type === $bl.Menu.MenuType.MenuBarMenu,
      'context-menu': type === $bl.Menu.MenuType.ContextMenu,
      'opened': opened,
    }"
    @click="$emit('click')"
    @mouseenter="$emit('mouseenter')">{{ instance.title }}
    <div class="menu-item-container"
      v-if="opened">
      <bl-menu-item
        v-for="item in instance.items" :key="item.title"
        :instance="item">
      </bl-menu-item>
    </div>
  </div>
</template>

<script>
  import Menu from '@/classes/Menu'

  import BlMenuItem from '@/components/BlMenuItem'

  export default {
    name: 'bl-menu',

    components: {
      BlMenuItem,
    },

    props: {
      opened: {
        type: Boolean,
        required: true
      },

      instance: {
        type: Menu,
        required: true
      },
    },

    data: () => ({
    }),

    computed: {
      type() {
        return this.instance.type;
      }
    },

    methods: {
      test() {
        console.log('test');
      }
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

  .opened .menu-item-container {
    position: absolute;
    top: 30px;
    background-color: lightgrey;
  }
</style>