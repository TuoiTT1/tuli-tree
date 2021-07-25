import {createRouter, createWebHistory} from "vue-router";
import Dashboard from '../components/dasboard/Dashboard.vue';

import store from '@/store/index'

const routes = [
    {
        path:"/",
        name:"Dashboard",
        component: Dashboard
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
    },
    {
        path: "/category/:id/:slug",
        name: "product_show",
        component: () => import('@/views/product/ProductList.vue'),
        props: route => ({...route.params, id: parseInt(route.params.id)}),
        // eslint-disable-next-line no-unused-vars
        async beforeEnter(to, from) {
            if(store.state.product.categories.length === 0) {
                await store.dispatch('product/fetchCategories')
            }
            let dataExist =  store.state.product.categories.find(
                (category) => category.id === parseInt(to.params.id)
                    && category.slug === to.params.slug
            )
            if (!dataExist) return {
                name: "NotFound",
                //allows keeping the URL while rendering the different page
                params: {pathMatch: to.path.split("/").slice(1)},
                query: to.query,
                hash: to.hash
            }
        }
    },
    {
        path: "/products",
        name: "product_show_all",
        component: () => import('@/views/product/ProductList.vue')
    },
    {
        path: "/:productSlug",
        name: "ProductDetail",
        component: () => import("@/views/product/ProductDetail.vue"),
        props: true,
        // eslint-disable-next-line no-unused-vars
        async beforeEnter(to, from) {
            if(store.state.product.products.length === 0){
                await store.dispatch('product/fetchProducts')
            }
            const dataExist = store.state.product.products.find(
                (product) => product.slug === to.params.productSlug
            )
            if (!dataExist) return {
                name: "NotFound",
                //allows keeping the URL while rendering the different page
                params: {pathMatch: to.path.split("/").slice(1)},
                query: to.query,
                hash: to.hash
            }
        }
    },
    {
        path: '/cart',
        name: 'ShoppingCart',
        component: () => import('@/views/cart/ShoppingCart.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/error',
        name: 'ErrorPage',
        component: () => import('@/views/error/ErrorPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/error/NotFound.vue')
    },
]

const router =createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
    store.commit('auth/setMsgError', null)
    if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
        //need to login if not already logged in
        return {name: "login", query: {redirect: to.fullPath}}
    }
})

export default router