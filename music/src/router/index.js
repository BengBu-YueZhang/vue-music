import Vue from 'vue'
import Router from 'vue-router'

const Ranking = () => import('./../page/Ranking/Ranking.vue')
const Recommend = () => import('./../page/Recommend/Recommend.vue')
const Search = () => import('./../page/Search/Search.vue')
const Singer = () => import('./../page/Singer/Singer.vue')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            name: 'Recommend',
            component: Recommend
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
        {
            path: '/singer',
            name: 'Singer',
            component: Singer
        },
        {
            path: '/ranking',
            name: 'Ranking',
            component: Ranking
        }
    ]
})
