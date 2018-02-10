import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import recommend from './modules/recommend'
import singer from './modules/singer'
import singerDetail from './modules/singerDetail'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        recommend,
        singer,
        singerDetail
    },
    strict: debug,
    // 类似redux的中间件
    plugins: debug ? [createLogger()] : []
})