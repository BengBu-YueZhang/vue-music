import { getSingerDetailAjax } from './../../api/singerDetail'

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
        async SetSinger ({commit}, singer) {
            commit('SET_SINGER', singer)
        },

        /**
         * 获取歌手详情列表
         */
        async GetSingerDetailAjax ({state}) {
            const singerDetail = await getSingerDetailAjax(state.singer.id)
            return singerDetail
        }
    }
}