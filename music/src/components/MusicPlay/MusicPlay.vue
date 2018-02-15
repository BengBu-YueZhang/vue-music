<template>
    <section class="autio-wrapper" v-if="playlist.length > 0">
        <transition name="nmraml">
            <div class="noraml-aution-wrapper" v-show="fullScreen">
                <div class="noraml-aution-backgrond">
                    <img width="100%" height="100%" :src="currentSong.image"/>
                </div>
                <transition name="header">
                    <div class="noraml-aution-header" v-show="fullScreen">
                        <h1>{{this.currentSong.name}}</h1>
                        <h2>{{this.currentSong.album}}</h2>
                        <div class="back" @click="setFullScreen(false)">
                            <i class="iconfont icon-moreunfold"></i>
                        </div>
                    </div>
                </transition>
                <div class="noraml-aution-cd">
                    <div class="noraml-aution-cd-left">
                        <div class="cd">
                            <div class="cd-play cd-playing" :style="{
                                'animationPlayState': playing ? 'running' : 'paused'
                            }">
                                <img :src="currentSong.image"/>
                            </div>
                        </div>
                        <div class="playing-lyric">
                        </div>
                    </div>
                    <div class="noraml-aution-cd-right"></div>
                </div>
                <transition name="control">
                    <div class="noraml-aution-control" v-show="fullScreen">
                        <div class="noraml-aution-control-dot"></div>
                        <!-- 进度条 -->
                        <div class="noraml-aution-control-progressbar">
                            <span class="noraml-aution-control-progressbar-left">{{formatTime(currentTime)}}</span>
                            <music-bar
                                :plan-proportion="planProportion"
                                @touch-move="touchBarMove"
                                @touch-end="touchBarEnd"
                            ></music-bar>
                            <span class="noraml-aution-control-progressbar-right">{{formatTime(currentSong.duration)}}</span>
                        </div>
                        <div class="noraml-aution-control-button">
                            <div
                                @click="changMode"
                                class="noraml-aution-control-button-left noraml-aution-control-button-icon">
                                <i class="iconfont" :class="modClass"></i>
                            </div>
                            <div
                                class="noraml-aution-control-button-left noraml-aution-control-button-icon"
                                :class="disbaleCls"
                                @click="prevMusic">
                                <i class="iconfont icon-back"></i>
                            </div>
                            <div
                                class="noraml-aution-control-button-center noraml-aution-control-button-icon"
                                :class="disbaleCls"
                                @click="playMusic">
                                <i class="iconfont" :class="playCls"></i>
                            </div>
                            <div
                                class="noraml-aution-control-button-right noraml-aution-control-button-icon"
                                :class="disbaleCls"
                                @click="nextMusic">
                                <i class="iconfont icon-more"></i>
                            </div>
                            <div class="noraml-aution-control-button-right noraml-aution-control-button-icon">
                                <i class="iconfont icon-aixin"></i>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
        <div class="mini-aution-wrapper" v-show="!fullScreen">
            <div class="icon" @click="setFullScreen(true)">
                <img class="cd-playing" :style="{
                'animationPlayState': playing ? 'running' : 'paused'
                }" :src="currentSong.image"/>
            </div>
            <div class="text">
                <h2>{{this.currentSong.name}}</h2>
                <p>{{this.currentSong.singer}}</p>
            </div>
            <div class="control" @click="playMusic" :class="disbaleCls">
                <i class="iconfont" :class="playCls"></i>
            </div>
            <div class="control">
                <i class="iconfont icon-less"></i>
            </div>
        </div>
        <audio
            ref="audio"
            :src="currentSong.url"
            @canplay="audioCanplay"
            @error="audioError"
            @timeupdate="timeUpdate"
            @ended="ended"
        ></audio>
    </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import MusicBar from './../MusicBar/MusicBar'
import { playMode } from './../../config/index'
import { sort } from 'ramda'

export default {
    components: {
        MusicBar
    },

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
        ]),

        playCls () {
            return this.playing ? 'icon-zanting' : 'icon-zanting1'
        },

        disbaleCls () {
            return this.isMusicLoad ? '' : 'disbale'
        },
        
        // 进度比例
        planProportion () {
            return this.currentTime / this.currentSong.duration
        },

        // 播放顺序icon
        modClass () {
            let modIcon = this.mode === playMode.sequence ? 'icon-xunhuanbofang' : (this.mode === playMode.loop ? 'icon-danquxunhuan' : 'icon-suijibofang')
            return modIcon
        }
    },

    data () {
        return {
            // 音乐是否加载完成
            isMusicLoad: false,
            // 当前播放时间
            currentTime: 0,
            // 是否在touchmove
            isTouchmove: false
        }
    },
    
    watch: {
        currentSong: {
            handler (val, oldVal) {
                this.$nextTick(() => {
                    this.$refs.audio.play()
                }) 
            },
            deep: true
        },

        playing (val, oldVal) {
            this.$nextTick(() => {
                let audio = this.$refs.audio
                val ? audio.play() : audio.pause()
            }) 
        }
    },
    
    methods: {
        ...mapActions('play', [
            'playFullScreen',
            'setFullScreen',
            'setPlaying',
            'setCurrentIndex',
            'setPlaylist',
            'setMode'
        ]),
        
        /**
         * 音乐播放器加载完成
         */
        audioCanplay () {
            this.isMusicLoad = true
        },

        /**
         * 音乐播放器加载失败
         */
        audioError () {
            this.isMusicLoad = true
        },

        /**
         * 播放音乐
         */
        playMusic () {
            if (!this.isMusicLoad) return
            this.playing ? this.setPlaying(false) : this.setPlaying(true)
        },

        /**
         * 上一首音乐
         */
        prevMusic () {
            if (!this.isMusicLoad) return
            let index = this.currentIndex
            parseInt(index, 10) == 0 ? index = this.playlist.length - 1 : --index
            this.setCurrentIndex(index)
            if (!this.playing) this.playMusic() // 改变icon的状态
            this.isMusicLoad = false
        },
        
        /**
         * 下一首音乐
         */
        nextMusic () {
            if (!this.isMusicLoad) return
            let index = this.currentIndex
            parseInt(index, 10) == this.playlist.length - 1 ? index = 0 : ++index
            this.setCurrentIndex(index)
            if (!this.playing) this.playMusic()
            this.isMusicLoad = false
        },
        
        /**
         * 播放时间改变
         */
        timeUpdate (ev) {
            this.currentTime = ev.path[0].currentTime
        },

        formatTime (currentTime) {
            let minute = Math.floor(currentTime / 60)
            let second = parseInt(Math.floor(currentTime % 60))
            if (parseInt(second) < 10) second = `0${second}`
            return `${minute}:${second}`
        },
        
        /**
         * 播放结束
         */
        ended () {
            console.log(this.mode)
            if (this.mode !== playMode.loop) {
                this.nextMusic()
            } else {
                this.loopMusic()
            }
        },

        /**
         * 循环播放音乐
         */
        loopMusic () {
            this.$refs.audio.currentTime = 0
            this.$refs.audio.play()
        },

        /**
         * 拖动滚动条改变时间
         * @param {Number} proportion 比例
         */
        touchBarMove (proportion) {
            this.isTouchmove = true
            this.currentTime = proportion * this.currentSong.duration
        },
        
        /**
         * 拖动结束
         * @param {Number} proportion 比例
         */
        touchBarEnd (proportion) {
            this.$refs.audio.currentTime = proportion * this.currentSong.duration
            if (!this.playing) this.playMusic()
        },

        /**
         * 切换播放模式
         */
        changMode () {
            let nextMode = (this.mode + 1) % 3 
            this.setMode(nextMode)
            let list = []
            if (this.mode === playMode.random) {
                list = sort((a, b) => a - Math.random(), this.sequenlist)
            } else {
                list = this.sequenlist
            }
            this.resetCurrntIndex(list)
            this.setPlaylist(list)
        },
        
        /**
         * 重新设置当前播放的索引
         */
        resetCurrntIndex (list) {
            let index = list.findIndex((item) => item.id === this.currentSong.id)
            this.setCurrentIndex(index)
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
    .noraml-aution-control {
        position: absolute;
        bottom: 50px;
        width: 100%;
        .noraml-aution-control-dot {
            text-align: center;
            font-size: 0;
        }
        .noraml-aution-control-progressbar {
            display: flex;
            align-items: center;
            width: 80%;
            margin: 0 auto;
            padding: 10px 0;
            span {
                display: inline-block;
                color: @color-text;
                font-size: @font-size-small;
                flex: 0 0 40px;
                line-height: 30px;
                width: 40px;
            }
            .noraml-aution-control-progressbar-left {
                text-align: left;
            }
            .noraml-aution-control-progressbar-right {
                text-align: right;
            }
        }
        .noraml-aution-control-button {
            display: flex;
            align-items: center;
            color: @color-theme;
            .noraml-aution-control-button-icon {
                flex: 1;
            }
            .noraml-aution-control-button-left {
                text-align: right;
            }
            .noraml-aution-control-button-center {
                padding: 0 20px;
                text-align: center;
                i {
                    font-size: 30px;
                }
            }
            .noraml-aution-control-button-right {
                text-align: left;
            }
            i {
                font-size: 28px;
            }
            .disbale {
                color: @color-dialog-background;
            }              
        }
    }
}

.mini-aution-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: @color-highlight-background;
    z-index: 999;
    .icon {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        padding: 0 10px 0 20px;
        box-sizing: content-box;
        img {
            width: 40px;
            border-radius: 50%;
            transform-origin: center center;
        }
    }
    .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        h2 {
            margin-bottom: 2px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
            color: #fff;
        }
        p {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: @font-size-small;
            color: @color-text-d;
        }
    }
    .control {
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
        box-sizing: content-box;
        i {
            font-size: 30px;
            color: @color-theme;
        }
    }
}

/* 动画样式 */
.nmraml-enter-active, .nmraml-leave-active {
    transition: all 500ms;
    opacity: 1;
}
.nmraml-enter, .nmraml-leave-to {
    opacity: 0.5;
}

.header-enter-active, .header-leave-active {
    transition: all 400ms cubic-bezier(0.86, 0.18, 0.82, 1.32);
    transform: translateY(0)
}
.header-enter, .header-leave-to {
    transform: translateY(-100px)
}

.control-enter-active, .control-leave-active {
    transition: all 400ms cubic-bezier(0.86, 0.18, 0.82, 1.32);
    transform: translateY(0)
}
.control-enter, .control-leave-to {
    transform: translateY(100px)
}

/* cd 动画 */
@keyframes cd {
    0% {
        transform: rotate(0)
    }
    100% {
        transform: rotate(360deg)
    }
}

.cd-playing {
    animation: cd 30s linear infinite;
}
</style>

