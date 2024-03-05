import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'http://127.0.0.1:8000'
// axios.defaults.baseURL = 'http://52.170.84.40:80'
const app = createApp(App)

app.use(createPinia())
app.use(router, axios)

app.mount('#app')
