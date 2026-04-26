import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'
import HomePage from '../pages/HomePage.vue'
import NavigationPage from '../pages/NavigationPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import AdminPage from '../pages/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'navigation', name: 'navigation', component: NavigationPage },
        { path: 'about', name: 'about', component: AboutPage },
        { path: 'admin', name: 'admin', component: AdminPage },
      ],
    },
  ],
})

export default router
