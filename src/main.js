import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.less';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import axios from '@/http/index.js';
// 全局ctx(this) 上挂载 $axios

const app = createApp(App);

app.provide('$http', axios);
app.use(createPinia());
app.use(router);

app.mount('#app');
