import sourceData from '@/data.json'
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
        fetchCategories({commit}){
            commit('setCategories', sourceData.categories)
        },
        getProductsByCategoryId({state, commit}, id) {
            let list = []
            if (id) {
                list =  state.categories.find(
                    (category) => category.id === id
                ).products
            } else {
                for (let i = 0; i < state.categories.length; i++) {
                    const pros = state.categories[i].products
                    for (let j = 0; j < pros.length; j++)
                        list.push(pros[j])
                }
            }
            commit('setProducts', list)
            return list;
        }
    }
}