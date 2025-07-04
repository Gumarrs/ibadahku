import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './index.css' // pastikan ini ada untuk Tailwind

createApp(App).use(router).mount('#app')