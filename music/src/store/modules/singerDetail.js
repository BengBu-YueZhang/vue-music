export default {
    namespaced: true,
    state: {
        singer: {}
    },
    getters: {},
    mutations: {
        SET_SINGER (state, singer) {
            state.singer = singer
        }
    },
    actions: {
        /**
         * 设置歌手信息
         * @param {} singer 
         */
        async setSinger ({commit}, singer) {
            commit('SET_SINGER', singer)
        }
    }
}