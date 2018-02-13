<template>
    <section class="autio-wrapper" v-if="playlist.length > 0">
        <div class="noraml-aution-wrapper" v-show="fullScreen">
            <div class="noraml-aution-backgrond">
                <img width="100%" height="100%" :src="currentSong.image"/>
            </div>
            <div class="noraml-aution-header">
                <h1>{{this.currentSong.name}}</h1>
                <h2>{{this.currentSong.album}}</h2>
                <div class="back" @click="playMini">
                    <i class="iconfont icon-moreunfold"></i>
                </div>
            </div>
            <div class="noraml-aution-cd">
                <div class="noraml-aution-cd-left">
                    <div class="cd">
                        <div class="cd-play">
                            <img :src="currentSong.image"/>
                        </div>
                    </div>
                    <div class="playing-lyric">
                    </div>
                </div>
                <div class="noraml-aution-cd-right"></div>
            </div>
            <div class="noraml-aution-control">
                <div class="noraml-aution-control-dot"></div>
                <div class="noraml-aution-control-progressbar"></div>
                <div class="noraml-aution-control-button"></div>
            </div>
        </div>
        <div class="mini-aution-wrapper" v-show="!fullScreen">
        </div>
    </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('play', [
            'singer',
            'playing',
            'fullScreen',
            'playlist',
            'sequenlist',
            'mode',
            'currentIndex'
        ]),

        ...mapGetters('play', [
            'currentSong'
        ])
    },
    
    methods: {
        ...mapActions('play', [
            'playFullScreen'
        ]),

        /**
         * 返回上一层
         */
        playMini () {
            console.log(1)
            this.playFullScreen(false)
        },

        /**
         * 全屏播放
         */
        playFullScreen () {
            this.playFullScreen(true)
        }
    }
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';

.autio-wrapper {
    width: 100%;
}

.noraml-aution-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: @color-highlight-background;
    z-index: 999;
    .noraml-aution-backgrond {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: .6;
        filter: blur(20px)
    }
    .noraml-aution-header {
        position: relative;
        margin-bottom: 25px;
        h1 {
            width: 70%;
            margin: 0 auto;
            line-height: 40px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 18px;
            color: #fff;
        }
        h2 {
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            color: #fff;
        }
        div {
            position: absolute;
            top: 0;
            left: 6px;
            z-index: 50;
            i {
                display: block;
                padding: 9px;
                font-size: 30px;
                font-weight: 600;
                color: @color-theme;
            }
        }
    }
    .noraml-aution-cd {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .noraml-aution-cd-left {
            display: inline-block;
            vertical-align: top;
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 80%;
            .cd {
                position: absolute;
                left: 10%;
                top: 0;
                width: 80%;
                height: 100%;
            }
            .cd-play {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border: 10px solid hsla(0,0%,100%,.1);
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
        }
    }
}

.mini-aution-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: @color-highlight-background;
}
</style>

