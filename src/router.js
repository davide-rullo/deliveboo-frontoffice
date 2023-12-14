import { createWebHashHistory, createRouter } from "vue-router";

import HomeView from "./views/HomeView.vue";
import SearchingView from "./views/SearchingView.vue";
import AboutView from "./views/AboutView.vue";
import ContactView from "./views/ContactView.vue";
import SingleRestaurantView from "./views/SingleRestaurantView.vue";
import NotFoundView from "./views/NotFoundView.vue";

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
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: ContactView
    },
    {
        path: '/restaurants/:slug',
        name: 'restaurant',
        component: SingleRestaurantView
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundView
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export { router }