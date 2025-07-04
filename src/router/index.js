import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Jadwal from '@/views/Jadwal.vue'
import Kiblat from '@/views/Kiblat.vue'
import Kalender from '@/views/Kalender.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'jadwal',
        name: 'Jadwal',
        component: Jadwal
      },
      {
        path: 'kiblat',
        name: 'Kiblat',
        component: Kiblat
      },
      {
        path: 'kalender',
        name: 'Kalender',
        component: Kalender
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
