import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SubjectAdmin from '../views/SubjectAdmin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/SubjectAdmin',
    name: 'SubjectAdmin',
    component: SubjectAdmin
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
