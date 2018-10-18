import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$bl = {
  Menu: {
    MenuBarMenu: 0,
    ContextMenu: 1,
  }
}

new Vue({
  render: h => h(App)
}).$mount('#app')
