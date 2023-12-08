import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "./views/HomeView.vue";
import SearchingView from "./views/SearchingView.vue";


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/searching',
        name: 'searching',
        component: SearchingView
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export { router }