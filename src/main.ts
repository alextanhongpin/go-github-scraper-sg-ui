import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './module'
import './registerServiceWorker'

import smoothscroll from 'smoothscroll-polyfill'

// kick off the polyfill!
smoothscroll.polyfill()

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
