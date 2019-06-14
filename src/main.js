import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import hangman from './components/hangman'
import home from './components/home'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [

   { path: '/hangman/:data', component: hangman },
   { path: '/', component: home }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
