import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import recommend from './modules/recommend'
import singer from './modules/singer'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        recommend,
        singer
    },
    strict: debug,
    // 类似redux的中间件
    plugins: debug ? [createLogger()] : []
})