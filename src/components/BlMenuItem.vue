<template>
  <div class="bl-menu-item"
    :class="menuItemClass"
    @click.stop="onClick($event)">
    <span class="bl-menu-item-node"
      v-if="!instance.isSeparator()"
      style="height: 26px;">{{ instance.title }}</span>
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
    height: 30px;
    display: flex;
    align-items: center;
  }

  .bl-menu-item span {
    width: 100%;
    margin: 2px;
    padding: 0 5px;
    border-radius: 3px;
    display: flex;
    align-items: center;
  }

  .bl-menu-item.enabled:hover span {
    background-color: #bbb4b1;
    box-shadow: inset 0 1px 1px darkgrey;
  }
</style>