export default {
    namespaced: true,
    state: {
        items: [],
        checkoutStatus: null
    },
    getters: {
        cartProducts(state, getters, rootState) {   //root state is product
            return state.items.map(cartItem => {
                const product = rootState.product.products.find(product => product.id === cartItem.id)
                return {
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    image: product.image,
                    slug: product.slug,
                    quantity: cartItem.quantity
                }
            })
        }
        ,
        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.quantity * product.price, 0)
        },
        totalItemsInCart(state) {
            return state.items.length
        }

    },
    actions: {
        addProductToCart({state, commit, rootGetters}, product) {
            if (rootGetters['product/productInStock'](product)) {
                const cartitem = state.items.find(item => item.id === product.id)
                //find cart item
                if (!cartitem) {
                    //push product to cart
                    commit('pushProductToCart', product.id)
                } else {
                    //increment quantity
                    commit('incrementItemQuantity', cartitem)
                }
                commit('product/decrementProductInventory', product, {root: true})
            }
        },
        incrementQty({state, commit, rootGetters}, cartItem) {
            const item = state.items.find(item => item.id === cartItem.id)
            if (item) {
                const product = rootGetters['product/getProductById'](item.id)
                commit('incrementItemQuantity', item)
                commit('product/decrementProductInventory', product, {root: true})
            }
        },
        decrementQty({state, commit, rootGetters}, cartItem) {
            const item = state.items.find(item => item.id === cartItem.id)
            if (item) {
                const product = rootGetters['product/getProductById'](item.id)
                commit('decrementItemQuantity', item)
                commit('product/incrementProductInventory', {product: product, qty: 1}, {root: true})
            }
        },
        deleteItemFromCart({state, commit, rootGetters}, cartItem) {
            const item = state.items.find(item => item.id === cartItem.id)
            if (item) {
                const product = rootGetters['product/getProductById'](item.id)
                commit('removeProductFromCart', item)
                commit('product/incrementProductInventory', {product: product, qty: cartItem.quantity}, {root: true})
            }
        },
        checkout({commit}, checkBuy) {
            if (checkBuy) {
                commit('emptyCart')
                commit('setCheckoutStatus', 'success')
            } else {
                commit('setCheckoutStatus', 'fail')
            }
        }
    },
    mutations: {
        pushProductToCart(state, productId) {
            state.items.push(
                {
                    id: productId,
                    quantity: 1
                }
            )
        },
        removeProductFromCart(state, cartItem) {
            const findIdx = state.items.indexOf(cartItem)
            state.items.splice(findIdx, 1)
        },
        incrementItemQuantity(state, cartitem) {
            cartitem.quantity++;
        },
        decrementItemQuantity(state, cartitem) {
            cartitem.quantity--;
        },
        emptyCart(state) {
            state.items = []
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        }
    }

}