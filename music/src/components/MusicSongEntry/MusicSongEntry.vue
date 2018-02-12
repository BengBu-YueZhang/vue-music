<template>
    <li
        @click="handleSongEntryClick(index, song)"
        class="song-list-item">
        <div class="song-ranking" style="display: none">
            {{this.index}}
        </div>
        <div class="song-info">
            <h5 class="song-name">{{song.name}}</h5>
            <p class="song-album">{{song.name}}·{{song.album}}</p>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        'song': {
            type: Object,
            default () {
                return {}
            }
        },

        'index': {
            type: [Number, String],
            default: 0
        }
    },

    methods: {
        /**
         * 歌曲列表点击
         * @param {Number} index 歌曲索引
         * @param {Object} song 歌曲信息
         */
        handleSongEntryClick (index, song) {
            this.$emit('play-song', {
                index,
                song
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';

.song-list-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 64px;
    .song-ranking {
        flex: 0 0 25px;
        width: 25px;
        font-size: @font-size-large;
        color: @color-theme;
        margin-right: 30px;
    }
    .song-info {
        flex: 1;
        overflow: hidden;
        h5 {
            color: @color-text;
            font-size: 100%;
            font-weight: normal;
            line-height: 20px; 
        }
        p {
            margin-top: 4px;
            font-size: 100%;
            line-height: 20px;
            color: @color-text-d;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
}
</style>


