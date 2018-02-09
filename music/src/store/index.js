import Vue from 'vue'
import Vuex from 'vuex'
import recommend from './modules/recommend'
import singer from './modules/singer'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        recommend,
        singer
    }
})