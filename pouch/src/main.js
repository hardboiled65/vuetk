import Vue from 'vue'
import Application from './Application.vue'

import Vuetk from '@hardboiled65/vuetk'

document.Vuetk = Vuetk
Vue.use(Vuetk)

Vue.config.productionTip = false

new Vue({
  render: h => h(Application)
}).$mount('#app')
