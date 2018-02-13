import { getHotSearchAjax } from './../../api/search'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async GetHotSearchAjax () {
            const hot = await getHotSearchAjax()
            return hot
        }
    }
}