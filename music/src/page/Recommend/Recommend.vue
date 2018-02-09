<template>
    <section class="recommend-wrappper">
        <music-swiper
            :slider="this.slider"
        ></music-swiper>
        <MusicTitle title="热门歌单推荐"/>
        <MusicRecommendSong :song-list="songList"/>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import MusicSwiper from './../../components/MusicSwiper/MusicSwiper'
import MusicRecommendSong from './../../components/MusicRecommendSong/MusicRecommendSong'
import MusicTitle from './../../components/MusicTitle/MusicTitle'

export default {
    components: {
        MusicSwiper,
        MusicRecommendSong,
        MusicTitle
    },

    data () {
        return {
            slider: [],
            songList: []
        }
    },

    created () {
        this.getCarouseData()
        this.getRecommendSongList()
    },

    methods : {
        ...mapActions('recommend', [
            'GetCarouselDataAjax',
            'GetRecommendSongListAjax'
        ]),

        /**
         * 获取轮播图数据
         */
        getCarouseData () {
            this.GetCarouselDataAjax().then(res => {
                if (parseInt(res.code) !== 0) throw new Error(res)
                this.slider = res.data.slider
            }).catch(err => {
                console.log(err)
            })
        },

        /**
         * 获取推荐歌单
         */
        getRecommendSongList () {
            this.GetRecommendSongListAjax().then(res => {
                if (parseInt(res.code) !== 0) throw new Error(res)
                this.songList = res.data.list
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>
</style>
