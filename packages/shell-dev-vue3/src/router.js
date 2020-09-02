import { createRouter, createMemoryHistory } from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import Nested from './views/Nested.vue'

export const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/home', redirect: { name: 'home' } },
    { path: '/:pathMatch(.*)*', component: NotFound },
    { path: '/users/:id(\\d+)', name: 'user', component: Home, alias: ['/u/:id(\\d+)', '/:id(\\d+)'] },
    {
      path: '/cant-come',
      component: Home,
      beforeEnter: () => false
    },
    {
      path: '/nested',
      component: Nested,
      children: [
        {
          path: 'nested',
          component: Nested,
          children: [{ path: 'nested', name: 'so nested', component: Nested }]
        }, {
          path: 'other',
          component: Home
        }
      ]
    },
    {
      path: '/fail-before-enter',
      component: Home,
      beforeEnter: () => {
        throw new Error("Can't touch this!")
      }
    }
  ]
})

setTimeout(() => {
  router.beforeEach((to, from, next) => {
    if (to.query.fail) return next(new Error('failing'))
    const delay = Number(to.query.delay)
    console.log('waiting', delay)
    if (delay) {
      setTimeout(() => next(), delay)
    } else {
      next()
    }
  })
}, 2000)
