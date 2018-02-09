<template>
    <div class="music-recommendsong-wrapper">
        <music-recommend-song-item
            v-for="item in songList"
            :key="item.dissid"
            :imgurl="item.imgurl"
            :name="item.creator.name"
            :dissname="item.dissname"
        ></music-recommend-song-item>
    </div>
</template>

<script>
import MusicRecommendSongItem from './../MusicRecommendSongItem/MusicRecommendSongItem'

export default {
    components: {
        MusicRecommendSongItem
    },

    props: {
        'song-list': {
            type: Array,
            default () {
                return []
            }
        }
    },
}
</script>

<style lang="less" scoped>
.music-recommendsong-wrapper {
    width: 100%;
    padding: 0 20px;
}
</style>
