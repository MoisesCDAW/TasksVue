import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Tasks from '../components/Tasks.vue'
import AddTask from '../components/AddTask.vue'
import EditTask from '../components/EditTask.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
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
    {
      path: '/edittasks/:id',
      name: 'edittasks',
      component: EditTask,
      props: true
    },
  ],
})

export default router
