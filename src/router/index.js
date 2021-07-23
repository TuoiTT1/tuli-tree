import {createRouter, createWebHistory} from "vue-router";
import Dashboard from '../components/dasboard/Dashboard.vue';


const routes = [
    {
        path:"/",
        name:"Dashboard",
        component: Dashboard
    },
    {
        path: "/category/:id/:slug",
        name: "product_show",
        component: () => import('@/views/product/ProductList.vue'),
        props: route => ({...route.params, id: parseInt(route.params.id)}),
    },
    {
        path: "/products",
        name: "product_show_all",
        component: () => import('@/views/product/ProductList.vue'),
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import('@/views/auth/Signup.vue')
    },
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/auth/Login.vue')
    }
]

const router =createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router