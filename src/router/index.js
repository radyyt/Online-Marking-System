import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/home', name: 'home', component: () => import('../views/Home.vue') },
  { path: '/questions/choice', name: 'choiceQuestion', component: () => import('../views/Choice.vue') },
  { path: '/questions/blank', name: 'blankQuestion', component: () => import('../views/Blank.vue') },
  { path: '/questions/subjective', name: 'subjectiveQuestion', component: () => import('../views/Subjective.vue') },
  { path: '/questions/input', name: 'questionsInput', component: () => import('../views/QuestionsInput.vue') },
  { path: '/exams/manage', name: 'examsManage', component: () => import('../views/ExamsManage.vue') },
  { path: '/exams/detail/:examId', name: 'examDetail', component: () => import('../components/ExamDetail.vue') },
  { path: '/mark', name: 'mark', component: () => import('../views/Mark.vue') },
  { path: '/:pathMatch(.*)', component: () => import('../views/NotFound.vue') }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router