import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/home', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/questions/choice', name: 'choiceQuestion', component: () => import('../views/Choice.vue') },
  { path: '/questions/input', name: 'questionsInput', component: () => import('../views/QuestionsInput.vue') },
  { path: '/papers/publish', name: 'papersPublish', component: () => import('../views/PapersPublish.vue')},
  { path: '/:pathMatch(.*)', component: () => import('../views/NotFound.vue') }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router