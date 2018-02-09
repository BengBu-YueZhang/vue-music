import { getSingerListAjax } from './../../api/singer'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async GetSingerListAjax () {
            let singerList = await getSingerListAjax()
            return singerList
        }
    }
}