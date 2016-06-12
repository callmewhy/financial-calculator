import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  saveScrollPosition: true,
})

router.map(App.routes)
router.redirect(App.redirects)
router.start(App, 'app')
