<template>
    <section class="ranking-wrappper">
        <music-ranking-list
            :ranking-list="rankingList"
        ></music-ranking-list>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import MusicRankingList from './../../components/MusicRankingList/MusicRankingList'
import { OK } from './../../config/index'
import Ranking from './../../model/Ranking'
import { map } from 'ramda'

export default {
    components: {
        MusicRankingList
    },

    data () {
        return {
            rankingList: []
        }
    },

    created () {
        this.getRankingList()
    },

    methods: {
        ...mapActions('ranking', [
            'GetRankingListAjax'
        ]),

        /**
         * 获取推荐列表
         */
        getRankingList () {
            this.GetRankingListAjax().then(res => {
                if (res.code !== OK) throw new Error(res.message)
                this.rankingList = this.formattedSingerData(res.data.topList)
            }).catch(err => {
                console.log(err)
            })
        },

        /**
         * 格式化数据
         * @param {Array} data 推荐列表
         */
        formattedSingerData (data) {
            let createRanking = (item => {
                return new Ranking({
                    id: item.id,
                    image: item.picUrl,
                    song: item.songList,
                    title: item.topTitle
                })
            })
            return map(createRanking, data)
        }
    }
}
</script>

<style lang="less" scoped>

</style>
