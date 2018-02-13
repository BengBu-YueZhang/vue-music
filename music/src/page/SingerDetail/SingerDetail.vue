<template>
    <transition name="singerdetail">
        <music-song-list
            :list="songList"
            :bg="singer.imgurl"
            :name="singer.name"
        ></music-song-list>
    </transition> 
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { createSong } from './../../model/Song'
import { OK } from './../../config/index'
import  MusicSongList from './../../components/MusicSongList/MusicSongList'

export default {
    components: {
        MusicSongList
    },

    data () {
        return {
            songList: []
        }
    },

    created () {
        this.getSingerDetail()
    },

    computed: {
        ...mapState('singerDetail', [
            'singer'
        ])
    },

    methods: {
        ...mapActions('singerDetail', [
            'GetSingerDetailAjax'
        ]),

        /**
         * 获取歌手详情列表数据
         */
        getSingerDetail () {
            if (!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            this.GetSingerDetailAjax().then(res => {
                if (res.code !== OK) throw new Error(res.message)
                this.songList = this.formattedSingerData(res.data.list)
            }).catch(err => {
                console.log(err)
            })
        },

        /**
         * 格式化歌手详情数据
         * @param {Array} data 歌曲列表
         */
        formattedSingerData (data) {
            return data.map(item => {
                return createSong(item.musicData)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.singerdetail-enter-active, .singerdetail-leave-active {
  transition: all 750ms;
  opacity: 1;
  transform: translateX(0)
}
.singerdetail-enter, .singerdetail-leave-to {
  opacity: 0.8;
  transform: translateX(100%)
}
</style>


