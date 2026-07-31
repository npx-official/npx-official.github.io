import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import WriteupsView from '../views/WriteupsView.vue'
import CertificationsView from '../views/CertificationsView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/writeups',
      name: 'writeups',
      component: WriteupsView
    },
    {
      path: '/certifications',
      name: 'certifications',
      component: CertificationsView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ]
})

export default router
