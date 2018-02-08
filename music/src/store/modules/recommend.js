
import { getCarouselDataAjax } from './../../api/recommend'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async GetCarouselDataAjax () {
            const carousel = await getCarouselDataAjax()
            return carousel
        }
    }
}