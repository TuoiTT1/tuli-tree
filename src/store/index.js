import {createStore} from 'vuex'
import auth from './module/auth';
import product from './module/product';

export default createStore({
    modules: {
        auth,
        product
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {}
})
