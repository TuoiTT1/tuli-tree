import axios from 'axios';
export default {
    namespaced: true,
    state: {
        categories: [],
        products: []
    },
    getters: {
        productInStock() {
            return (product) => {
                return product.inventory > 0
            }
        },
        getProductsByCategoryId(state) {
            return(id) => {
                if (id) {
                    return state.products.filter(
                        product => product.categoryId === id
                    )
                } else {
                    return state.products.sort(
                        (pro1,pro2) => (pro1.price > pro2.price) ? 1 : ((pro2.price > pro1.price) ? -1 : 0))
                }
            }
        }
    },
    mutations: {
        setCategories(state, categories){
            state.categories = categories
        },
        setProducts(state, products){
            state.products = products
        }
    },
    actions: {
        async fetchCategories({commit}){
            try{
                const result = await axios.get('http://localhost:3001/categories')
                const categories = result.data
                console.log("categories: ", categories)
                commit('setCategories', categories)
            }catch (error){
                console.log(error)
            }
        },
        async fetchProducts({commit}){
            try{
                const result = await axios.get('http://localhost:3001/products')
                const products = result.data

                console.log('products: ', products)
                commit('setProducts', products)
            }catch (error) {
                console.log(error)
            }
        },

        // eslint-disable-next-line no-unused-vars
        // async getProductsByCategoryId({state, commit}, id) {
        //     let list = []
        //     console.log('getProductsByCategoryId')
        //     if (id) {
        //         try{
        //             const result = await axios.get(`http://localhost:3001/category/${id}`)
        //             list = await result.data
        //             console.log(list)
        //             commit('setProducts', list)
        //         }catch (error) {
        //             console.log(error)
        //         }
        //     } else {
        //         try{
        //             const result = await axios.get(`http://localhost:3001/products`)
        //             list = await result.data
        //             console.log(list)
        //             commit('setProducts', list)
        //         }catch (error) {
        //             console.log(error)
        //         }
        //     }
        //     // commit('setProducts', list)
        //     // return list;
        // }
    }
}