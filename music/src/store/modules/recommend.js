
import { getCarouselDataAjax, getRecommendSongListAjax } from './../../api/recommend'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async GetCarouselDataAjax () {
            const carousel = await getCarouselDataAjax()
            return carousel
        },

        async GetRecommendSongListAjax () {
            const recommendSongList = await getRecommendSongListAjax()
            return recommendSongList
        }
    }
}