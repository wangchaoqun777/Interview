import {createStore} from 'vuex'
import axios from "axios"
interface StoreOption {
    token: string
}

export default createStore<StoreOption>({
    state: {
        token: '',
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    },
    getters: {
        token: (state) => state.token
    },
    actions: {
        update_token: async ({ commit }) => {
            const { data: res }:any = await axios.get(`${process.env.NODE_ENV === 'development' ? '/proxy-prefix/token' : '/token'}`)
            commit('setToken', res?.data)
        }
    },
    modules: {}
})
