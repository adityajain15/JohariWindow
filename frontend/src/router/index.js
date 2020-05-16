import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:roomId',
    name: 'Room',
    beforeEnter: (to, from, next) => {
      if (!from.name) { 
        next({ name: 'Home', query: { room: to.params.roomId } })
      }
      next()
    },
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue'),
    children: [
      { path: '', name: 'roominterface', component: () => import(/* webpackChunkName: "roominterface" */ '@/components/RoomInterface.vue') },
      { path: 'rules', name: 'rules', component: () => import(/* webpackChunkName: "rules" */ '@/components/Rules.vue') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
