<template>
    <section>
        <music-scroll :scroll-data="songList" ref="iscoll" class="scroll-view-wrappper">
            <div class="scroll-view">
                <music-swiper
                    @img-load="$refs.iscoll.refresh()"
                    :slider="this.slider"
                ></music-swiper>
                <MusicTitle title="热门歌单推荐"/>
                <MusicRecommendSong
                    :song-list="songList"/>
            </div>
            <div class="loading-wrapper">
                <music-loading v-if="!songList.length"></music-loading>
            </div>
        </music-scroll>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import MusicSwiper from './../../components/MusicSwiper/MusicSwiper'
import MusicRecommendSong from './../../components/MusicRecommendSong/MusicRecommendSong'
import MusicTitle from './../../components/MusicTitle/MusicTitle'
import MusicScroll from './../../components/MusicScroll/MusicScroll'
import MusicLoading from './../../components/MusicLoading/MusicLoading'

export default {
    components: {
        MusicSwiper,
        MusicRecommendSong,
        MusicTitle,
        MusicScroll,
        MusicLoading
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
.scroll-view-wrappper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 88px;
    overflow: hidden;
}

.scroll-view {
    width: 100%;
    height: auto;
}

.loading-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
}
</style>
