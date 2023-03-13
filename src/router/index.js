import { createRouter,  createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  { path: '/home', name: 'home', component: ()=>import('../views/Home.vue') },
  { path: '/questions/input', name: 'questionsInput', component: ()=>import('../views/Questions.vue') },
  { path: '/questions/manage', name: 'questionsManage', component:()=>import('../views/QuestionsManage.vue') },
  {  path: '/login', component: Login },
  { path: '/:pathMatch(.*)',  component: ()=>import('../views/NotFound.vue')  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router