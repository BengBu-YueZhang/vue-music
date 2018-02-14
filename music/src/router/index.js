import Vue from 'vue'
import Router from 'vue-router'

const Ranking = () => import('./../page/Ranking/Ranking.vue')
const Recommend = () => import('./../page/Recommend/Recommend.vue')
const Search = () => import('./../page/Search/Search.vue')
const Singer = () => import('./../page/Singer/Singer.vue')
const SingerDetail = () => import('./../page/SingerDetail/SingerDetail.vue')
const User = () => import('./../page/User/User.vue')
const Like = () => import('./../page/Like/Like.vue')
const Lately = () => import('./../page/Lately/Lately.vue')


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
            component: Singer,
            children: [
                {
                    path: '/singer/:id',
                    name: 'SingerDetail',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/ranking',
            name: 'Ranking',
            component: Ranking
        },
        {
            path: '/user',
            name: 'User',
            component: User,
            children: [
                {
                    path: '/',
                    redirect: '/user/like'
                },
                {
                    path: '/user/like',
                    name: 'UserLike',
                    component: Like
                },
                {
                    path: '/user/lately',
                    name: 'UserLately',
                    component: Lately
                }
            ]
        }
    ]
})
