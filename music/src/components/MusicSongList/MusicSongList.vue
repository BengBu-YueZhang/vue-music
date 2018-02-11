<template>
    <div class="music-song-wrapper">
        <div class="bg"
            ref="Bg"
            :style="{background: `url(${bg}) no-repeat`, backgroundSize: 'cover'}"
        ></div>
        <header class="bg-header">
            <h4>{{this.name}}</h4>
        </header>
        <div class="follow-bg" ref="followBg"></div>
        <music-scroll
            class="scroll-view-wrapper"
            ref="scrollViewWrapper"
            @onScroll="onScrollY"
            :on-scroll="isOnScroll"
            :probe-type="probeType"
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

    data () {
        return {
            // y轴实时滚动位置
            scrollY: 0,
            probeType: 3,
            isOnScroll: true,
            // 背景图片的高度
            bgImageHeight: 0,
            // 最大滚动距离
            maxScrollY: 0
        }
    },

    mounted () {
        setTimeout(() => {
            this.bgImageHeight = this.$refs.Bg.clientHeight
            this.maxScrollY = this.bgImageHeight - 40
            this.$refs.scrollViewWrapper.$el.style.top = `${this.bgImageHeight}px`
        }, 30)
    },

    watch: {
        scrollY (val, oldVal) {
            let dif = 0
            let scale = 1 + Math.abs(val / this.bgImageHeight)
            Math.abs(val) > this.maxScrollY ? dif = -this.maxScrollY : dif = val
            this.$refs.followBg.style['transform'] = `translate3d(0, ${dif}px, 0.01px)`
            this.$refs.followBg.style['webkitTransform'] = `translate3d(0, ${dif}px, 0.01px)`
            if (val > 20) {
                this.$refs.Bg.style['transform'] = `scale(${scale})`
                this.$refs.Bg.style['webkitTransform'] = `scale(${scale})`
                this.$refs.Bg.style['filter'] = `blur(${scale - 1}px)`
                this.$refs.Bg.style['webkitFilter'] = `blur(${scale - 1}px)`
                this.$refs.Bg.style.zIndex = 50
            }
            if (Math.abs(val) >= this.maxScrollY && val < 0) {
                this.$refs.Bg.style.height = '40px'
                this.$refs.Bg.style.paddingTop = 0
                this.$refs.Bg.style.zIndex = 50
            } else if (Math.abs(val) < this.maxScrollY && val < 0) {
                this.$refs.Bg.style.height = 0
                this.$refs.Bg.style.paddingTop = '70%'
                this.$refs.Bg.style.zIndex = 0
            }
            
        }
    },

    methods: {
        /**
         * 监听betterscroll滚动
         * @param {Number} y y轴滚动位置
         */
        onScrollY (y) {
            this.scrollY = y
        }
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
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    filter: brightness(90%);
    transform-origin: top;
}

.bg-header {
    position: absolute;
    width: 100%;
    height: 40px;
    text-align: center;
    left: 0;
    top: 0;
    z-index: 99;
    h4 {
        font-weight: 500;
        line-height: 40px;
        font-size: @font-size-large;
        color: @color-text;
    }
}

.follow-bg {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: @color-background;
}

.scroll-view-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    .song-list {
        width: 100%;
        height: auto;
        padding: 20px 30px;
        list-style: none;
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
    }
}
</style>