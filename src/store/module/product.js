import axios from 'axios';

export default {
    namespaced: true,
    state: {
        categories: [],
        products: [],
        searchKey: ''
    },
    getters: {
        productInStock() {
            return (product) => {
                return product.inventory > 0
            }
        },
        getProductsByCategoryId(state) {
            return (id) => {
                if (id) {
                    return state.products.filter(
                        product => product.categoryId === id
                    )
                } else {
                    return state.products.sort(
                        (pro1, pro2) => (pro1.price > pro2.price) ? 1 : ((pro2.price > pro1.price) ? -1 : 0))
                }
            }
        },
        getProductBySlug(state) {
            return (slug) => {
                return state.products.filter(
                    product => product.slug === slug
                )[0]
            }
        },
        getProductById(state) {
            return (id) => {
                return state.products.filter(
                    product => product.id === id
                )[0]
            }
        },
        searchProducts(state) {
            return (keySearch) => {
                return state.products.filter(
                    product => product.name.toLowerCase().includes(keySearch.toLowerCase())
                )
            }
        }
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories
        },
        setProducts(state, products) {
            state.products = products
        },
        decrementProductInventory(state, product) {
            product.inventory--;
        },
        incrementProductInventory(state, {product, qty}) {
            product.inventory = product.inventory + qty;
        },
        setSearchKey(state, searchKey){
            state.searchKey = searchKey
        }
    },
    actions: {
        async fetchCategories({commit}) {
            try {
                const result = await axios.get('http://localhost:3001/categories')
                const categories = result.data
                commit('setCategories', categories)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchProducts({commit}) {
            try {
                const result = await axios.get('http://localhost:3001/products')
                const products = result.data
                commit('setProducts', products)
            } catch (error) {
                console.log(error)
            }
        },

    }
}