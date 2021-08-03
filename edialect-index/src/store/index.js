import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        tab: 0
    },
    getters: {
        tab: state => {
            return state.tab
        }
    },
    mutations: {
        changeTab(state, newTab) {
            state.tab = newTab
        }
    }
})
