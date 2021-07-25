import {createStore} from 'vuex'
import auth from './module/auth';
import product from './module/product';
import cart from './module/cart';

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
