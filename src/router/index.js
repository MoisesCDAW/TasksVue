import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Tasks from '../components/Tasks.vue'
import AddTask from '../components/AddTask.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
    },
    {
      path: '/addtasks',
      name: 'addtasks',
      component: AddTask,
    },
  ],
})

export default router
