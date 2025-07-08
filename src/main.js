import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './components/HomePage.vue'
import NotesPage from './components/NotesPage.vue'
import LoginPage from './components/LoginPage.vue'

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesPage
    }
  ]
})

// Create and mount the Vue application with the router
const app = createApp(App)
app.use(router)
app.mount('#app')
