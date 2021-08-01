import axios from 'axios';
import router from '@/router';

import utils from '@/utils/utils.js';

export default {
    namespaced: true,
    state: {
        idToken: null,
        userId: null,
        user: null,
        messageError: null
    },
    getters: {
        user(state) {
            return state.user
        },
        isAuthenticated(state) {
            return state.idToken !== null
        },
        idToken(state) {
            return state.idToken;
        },
        isAdmin(state) {
            if (state.user){
                return state.user.role === "admin"
            }
            return null
        },
    },
    mutations: {
        authUser(state, userData) {
            state.idToken = userData.idToken
            state.userId = userData.userId
        },
        storeUser(state, user) {
            state.user = user
        },
        clearUser(state) {
            state.idToken = null
            state.userId = null
            state.user = null
        },
        setMsgError(state, msg) {
            state.messageError = msg
        }
    },
    actions: {
        setLogoutTimer({commit}, expirationTime) {
            setTimeout(() => {
                commit('clearUser')
            }, expirationTime * 1000)
        },
        async signup({commit, dispatch}, authData) {
            try {
                const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAq0ridzEIGWwDHF9P6nwa2i94P-VAnBGc', {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                commit('authUser', {
                    idToken: res.data.idToken,
                    userId: res.data.localId
                })

                // dispatch('sendEmailVerification', res.data.idToken)
                let  expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                expirationTime = utils.formatDate(expirationTime)
                localStorage.setItem('idToken', res.data.idToken)
                localStorage.setItem('userId', res.data.localId)
                localStorage.setItem('expirationTime', expirationTime)

                dispatch('storeUser', authData)
                dispatch('setLogoutTimer', res.data.expiresIn)
                commit('cart/setUserId', res.data.localId, {root: true})
                router.replace('/products')
            } catch (error) {
                console.log(error.response.data)
                if (error.response.data.error.code === 400 && error.response.data.error.message === 'EMAIL_EXISTS') {
                    commit('setMsgError', 'Email đã được đăng ký tài khoản.')
                }
            }
        },
        // eslint-disable-next-line no-unused-vars
        async sendEmailVerification({commit}, idTokenStr) {
            try {
                const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAq0ridzEIGWwDHF9P6nwa2i94P-VAnBGc', {
                    requestType: 'VERIFY_EMAIL',
                    idToken: idTokenStr
                })
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        },
        async login({commit, dispatch}, authData) {
            try {
                const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAq0ridzEIGWwDHF9P6nwa2i94P-VAnBGc', {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                })
                const userData = {
                    idToken: res.data.idToken,
                    userId: res.data.localId
                }
                let expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                expirationTime = utils.formatDate(expirationTime)

                localStorage.setItem('idToken', res.data.idToken)
                localStorage.setItem('userId', res.data.localId)
                localStorage.setItem('expirationTime', expirationTime)
                commit('authUser', userData)

                await dispatch('fetchUser')
                dispatch('setLogoutTimer', res.data.expiresIn)
                commit('cart/setUserId', res.data.localId, {root: true})
                await router.replace('/products')
            } catch (error) {
                console.log(error)
                if (error.response.data.error.code === 400 && error.response.data.error.message === 'INVALID_PASSWORD') {
                    commit('setMsgError', 'Thông tin mật khẩu bị sai.')
                }
                if (error.response.data.error.code === 400 && error.response.data.error.message === 'EMAIL_NOT_FOUND') {
                    commit('setMsgError', 'Email chưa được đăng ký tài khoản.')
                }
            }
        },
        async tryToLogin({commit, dispatch}) {
            const idToken = localStorage.getItem('idToken');
            if (!idToken) {
                return;
            }
            const expirationTime = localStorage.getItem('expirationTime');
            let now = new Date()
            now = utils.formatDate(now)

            if (now >= expirationTime) {
                return;
            }
            commit('authUser', {
                idToken: idToken,
                userId: expirationTime
            })
            dispatch('fetchUser')

            const userId = localStorage.getItem('userId')
            commit('cart/setUserId', userId, {root: true})
        },
        async storeUser({commit, state}, userData) {
            if (!state.idToken) {
                return
            }
            try {
                userData.role = "user"
                await axios.post('https://tuli-trees-store-default-rtdb.firebaseio.com/user.json?auth=' + state.idToken,
                    userData)
                commit('storeUser', userData)
            } catch (error) {
                console.log(error)
            }

        },
        async fetchUser({commit, state}) {
            if (!state.idToken) {
                return
            }
            try {
                try{
                    // get email by UserID
                    const resUser = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAq0ridzEIGWwDHF9P6nwa2i94P-VAnBGc', {"idToken": state.idToken})
                    const email = resUser.data.users[0].email

                    const res = await axios.get('https://tuli-trees-store-default-rtdb.firebaseio.com/user.json?auth=' + state.idToken)
                    const data = res.data
                    for (let key in data) {
                        const user = data[key]
                        user.id = key
                        // eslint-disable-next-line no-cond-assign
                        if (user.email === email){
                            commit('storeUser', user)
                            break;
                        }
                    }
                }catch (err){
                    console.log(err)
                }
            } catch (error) {
                console.log(error)
            }
        },
        logout({commit, getters}) {
            if (getters.isAuthenticated) {
                commit('clearUser')
                router.replace('/login')
                localStorage.removeItem('idToken')
                localStorage.removeItem('userId')
                localStorage.removeItem('expirationTime')
            }
        },
    }
}
