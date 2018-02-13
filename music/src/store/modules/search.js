import { getHotSearchAjax, searchKeyAjax } from './../../api/search'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async GetHotSearchAjax () {
            const hot = await getHotSearchAjax()
            return hot
        },
        
        async SearchKeyAjax ({ commit }, key) {
            const result = await searchKeyAjax(key)
            return result
        }
    }
}