import axios from 'axios';
import utils from '@/utils/utils.js';

export default {
    namespaced: true,
    state: {
        userId: null,
        items: [],
        cartHistory: [],
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
    mutations: {
        setUserId(state, userId) {
            state.userId = userId
        },
        pushProductToCart(state, product) {
            state.items.push(
                {
                    id: product.id,
                    quantity: 1,
                    price: product.price
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
            state.userId = null
            state.cartHistory = []
            state.checkoutStatus = null
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },
        pushHistory(state, historyItem) {
            state.cartHistory.push({
                productId: historyItem.productId,
                action: historyItem.action,
                quantity: historyItem.quantity
            })
        }
    },
    actions: {
        addProductToCart({state, commit, rootGetters}, product) {
            if (rootGetters['product/productInStock'](product)) {
                const cartitem = state.items.find(item => item.id === product.id)
                //find cart item
                if (!cartitem) {
                    //push product to cart
                    commit('pushProductToCart', product)

                    const historyItem = {
                        productId: product.id,
                        action: 'add',
                        quantity: 1
                    }
                    commit('pushHistory', historyItem)
                } else {
                    //increment quantity
                    commit('incrementItemQuantity', cartitem)
                    const historyItem = {
                        productId: product.id,
                        action: 'increment',
                        quantity: 1
                    }
                    commit('pushHistory', historyItem)
                }
                commit('product/decrementProductInventory', product, {root: true})
            }
        },
        incrementQty({state, commit, rootGetters}, cartItem) {
            const item = state.items.find(item => item.id === cartItem.id)
            if (item) {
                const product = rootGetters['product/getProductById'](item.id)
                commit('incrementItemQuantity', item)
                const historyItem = {
                    productId: product.id,
                    action: 'increment',
                    quantity: 1
                }
                commit('pushHistory', historyItem)
                commit('product/decrementProductInventory', product, {root: true})
            }
        },
        decrementQty({state, commit, rootGetters}, cartItem) {
            const item = state.items.find(item => item.id === cartItem.id)
            if (item) {
                const product = rootGetters['product/getProductById'](item.id)
                commit('decrementItemQuantity', item)
                const historyItem = {
                    productId: product.id,
                    action: 'decrement',
                    quantity: 1
                }
                commit('pushHistory', historyItem)
                commit('product/incrementProductInventory', {product: product, qty: 1}, {root: true})
            }
        },
        deleteItemFromCart({state, commit, rootGetters}, cartItem) {
            const item = state.items.find(item => item.id === cartItem.id)
            if (item) {
                const product = rootGetters['product/getProductById'](item.id)
                commit('removeProductFromCart', item)
                const historyItem = {
                    productId: product.id,
                    action: 'delete',
                    quantity: cartItem.quantity
                }
                commit('pushHistory', historyItem)
                commit('product/incrementProductInventory', {product: product, qty: cartItem.quantity}, {root: true})
            }
        },
        async checkout({state, commit, rootGetters}) {
            //save cart to db
            try {
                let now = new Date()
                now = utils.formatDate(now)
                const idToken = rootGetters['auth/idToken']
                await axios.post('https://tuli-trees-store-default-rtdb.firebaseio.com/cart.json?auth=' + idToken,
                    {
                        cartId: now,
                        userId: state.userId,
                        items: state.items,
                        cartHistory: state.cartHistory
                    })
                commit('emptyCart')
            } catch (error) {
                console.log(error)
                commit('setCheckoutStatus', 'fail')
            }
        }
    }
}