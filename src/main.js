import { createApp } from 'vue';
import { router } from "./router.js";
import './assets/scss/style.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.vue';

createApp(App).use(router).mount('#app')
