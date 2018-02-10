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
            <ul>

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
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
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
</style>


