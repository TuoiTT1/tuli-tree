import {createStore} from 'vuex'
import auth from '@/store/module/auth';
import product from '@/store/module/product';
import cart from '@/store/module/cart';

export default createStore({
    modules: {
        auth,
        product,
        cart
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {}
})
