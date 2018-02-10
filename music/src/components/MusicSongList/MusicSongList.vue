<template>
    <div class="music-song-wrapper">
        <div class="bg"
            ref="Bg"
            :style="{background: `url(${bg}) no-repeat`, backgroundSize: 'cover'}"
        ></div>
        <header class="bg-header">
            <h4>{{this.name}}</h4>
        </header>
        <music-scroll
            class="scroll-view-wrapper"
            ref="scrollViewWrapper"
            :scroll-data="list">
            <ul class="song-list">
                <li
                    v-for="(songItem, index) in list"
                    :key="songItem.id"
                    class="song-list-item">
                    <div class="song-ranking" style="display: none">
                        {{index}}
                    </div>
                    <div class="song-info">
                        <h5 class="song-name">{{songItem.name}}</h5>
                        <p class="song-album">{{songItem.name}}·{{songItem.album}}</p>
                    </div>
                </li>
            </ul>
        </music-scroll>
    </div>
</template>

<script>
import MusicScroll from './../MusicScroll/MusicScroll'

export default {
    components: {
        MusicScroll
    },
    
    props: {
        'list': {
            type: Array,
            default () {
                return []
            }
        },

        'bg': {
            type: String,
            default: ''
        },

        'name': {
            type: String,
            default: ''
        }
    },

    mounted () {
        setTimeout(() => {
            this.$refs.scrollViewWrapper.$el.style.top = `${this.$refs.Bg.clientHeight}px`
        }, 30)
    }
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';
.music-song-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background-color: @color-background;
}

.bg {
    width: 100%;
    height: 0;
    padding-top: 70%;
    filter: brightness(30%);
}

.bg-header {
    position: absolute;
    width: 100%;
    height: 40px;
    text-align: center;
    left: 0;
    top: 0;
    h4 {
        font-weight: 500;
        line-height: 40px;
        font-size: @font-size-large;
        color: @color-text;
    }
}

.scroll-view-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}

.song-list {
    width: 100%;
    height: auto;
    padding: 20px 30px;
    list-style: none;
}

.song-list-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 64px;
}

.song-ranking {
    font-size: @font-size-large;
    color: @color-theme;
    margin-right: 30px;
}

.song-info {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
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
    }
}
</style>
