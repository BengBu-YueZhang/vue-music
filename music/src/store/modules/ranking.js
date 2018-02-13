
import { getRankingListAjax } from './../../api/ranking'

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        async GetRankingListAjax () {
            const rankingList = await getRankingListAjax()
            return rankingList
        }
    }
}