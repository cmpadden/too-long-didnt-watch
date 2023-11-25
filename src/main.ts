import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import createRouter from './pages/routes.ts'

import './style.css'
import App from './App.vue'

const router = createRouter(createWebHistory(import.meta.env.BASE_URL))
const app = createApp(App)
app.use(router).mount('#app')
