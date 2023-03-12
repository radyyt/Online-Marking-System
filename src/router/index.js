import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/:pathMatch(.*)', component: NotFound }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router