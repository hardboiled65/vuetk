import Vue from 'vue'
import App from './App.vue'

import Button from '@/classes/Button'
import Menu from '@/classes/Menu'

Vue.config.productionTip = false

Vue.prototype.$bl = {
  Menu: Menu,
  Button: Button,
}

new Vue({
  render: h => h(App)
}).$mount('#app')
