<template>
    <section class="ranking-wrappper">
        <music-scroll
            class="scroll-view-wrappper"
            :scroll-data="rankingList">
            <music-ranking-list
                :ranking-list="rankingList"
            ></music-ranking-list>
        </music-scroll>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import MusicRankingList from './../../components/MusicRankingList/MusicRankingList'
import MusicScroll from './../../components/MusicScroll/MusicScroll'
import { OK } from './../../config/index'
import Ranking from './../../model/Ranking'
import { map } from 'ramda'

export default {
    components: {
        MusicRankingList,
        MusicScroll
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
                console.log(this.rankingList)
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
.ranking-wrappper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 88px;
    overflow: hidden;
    .scroll-view-wrappper {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: hidden;
    }
}
</style>
