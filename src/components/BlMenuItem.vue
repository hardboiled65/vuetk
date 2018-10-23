<template>
  <div class="bl-menu-item"
    :class="menuItemClass"
    @click.stop="onClick($event)">
    <span class="bl-menu-item-node"
      v-if="!instance.isSeparator()">{{ instance.title }}</span>
    <div class="bl-menu-item-node"
      v-else>-----</div>
  </div>
</template>

<script>
  import ViewMixin from '@/mixins/ViewMixin'

  import MenuItem from '@/classes/MenuItem'

  export default {
    name: 'bl-menu-item',

    mixins: [
      ViewMixin,
    ],

    props: {
      instance: {
        type: MenuItem,
        required: true
      },
    },

    computed: {
      menuItemClass() {
        let cls = Object.assign({
          'enabled': true
        }, this.viewClass);
        cls['pointer-events-none'] = false;

        if (this.instance.isSeparator()) {
          cls['enabled'] = false;
        }
        return cls;
      }
    },

    methods: {
      onClick(evt) {
        if (this.instance.isSeparator()) {
          return;
        }
        if (this.instance.action) {
          this.instance.action();
        }
        console.log('menu item clicked');
      },
    }
  }
</script>

<style scoped>
  .bl-menu-item {
    height: 28px;
    display: flex;
    align-items: center;
  }

  .bl-menu-item.enabled:hover {
    background-color: blue;
  }
</style>