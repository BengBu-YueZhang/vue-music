<template>
    <section class="singer-wrappper">
        <music-scroll 
            class="scroll-view-wrappper"
            :scroll-data="singerList"
            :on-scroll="isOnScroll"
            :probe-type="probeType"
            @onScroll="onScroll"
            ref="iscoll">
            <ul class="singer-list-wrapper">
                <li v-for="(singerItem, index) in singerList"
                    ref="singerList"
                    :key="index">
                    <!-- 重构解耦 -->
                    <music-singer-tilte :title="singerItem.key"></music-singer-tilte>
                    <music-singer-list
                        :list="singerItem.items"
                        @singer-click="onSingerClick"
                    ></music-singer-list>
                </li>
            </ul>
        </music-scroll>

        <MusicSingerQuickList
            @touch-start="handleTouchStart"
            @touch-move="handletouchMove"
            :singer-data="singerList"
            :current-index="currentIndex"
        ></MusicSingerQuickList>
        <h3 class="singer-title singer-fixed" v-show="fixedTitle" ref="fixedTitle">
            {{fixedTitle}}
        </h3>
        <!-- 子路由:歌手详情页 -->
        <router-view/>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import { OK } from './../../config/index'
import Singer from './../../model/Singer'
import { slice, uniq, map, sort, filter, compose, forEach} from 'ramda'
import MusicSingerQuickList from './../../components/MusicSingerQuickList/MusicSingerQuickList'
import MusicScroll from './../../components/MusicScroll/MusicScroll'
import MusicSingerList from './../../components/MusicSingerList/MusicSingerList'
import MusicSingerTilte from './../../components/MusicSingerTitle/MusicSingerTitle'
import Mixin from './../../common/js/Mixin'

export default {
    mixins: [Mixin],

    components: {
        MusicSingerQuickList,
        MusicScroll,
        MusicSingerList,
        MusicSingerTilte
    },

    data () {
        return {
            // 歌手列表
            singerList: [],
            // 是否监听better-scroll的滚动
            isOnScroll: true,
            // 是否实时监听
            probeType: 3,
            // 歌手列表各个区块距离顶部的距离集合
            singerGroupHeight: [],
            // 当前滚动位置的区间的索引
            currentIndex: 0,
            // 歌手列表各个区块距离顶部的距离差
            diff: 0,
            // 滚动距离
            scrollY: 0
        }
    },

    created () {
        this.getSingerList()
        // 标题距离顶部的距离
        this.fixedTop = 0
    },

    computed: {
        fixedTitle () {
            if (this.scrollY > -5) {
                return ''
            }
            if (this.singerList[this.currentIndex]) {
                return this.singerList[this.currentIndex].key
            }
        }
    },

    watch: {
        'singerList': {
            handler: function (val, oldVal) {
                setTimeout(() => {
                    this.getSingerGroupHeight()
                }, 30)
            },
            deep: true
        },

        diff (val) {
            let fixedTop = 0
            val <= 30 ? fixedTop = val - 30 : fixedTop = 0
            if (this.fixedTop === val) return   
            this.$refs.fixedTitle.style.transform = `translate3d(0, ${fixedTop}px, 0.01px)`
            this.fixedTop = fixedTop
        }
    },

    methods: {
        ...mapActions('singer', [
            'GetSingerListAjax'
        ]),

        ...mapActions('singerDetail', [
            'SetSinger'
        ]),

        /**
         * 获取歌手列表
         */
        getSingerList () {
            this.GetSingerListAjax().then(res => {
                if (parseInt(res.code) !== OK) throw new Error(res.message)
                this.singerList = this.formattedSingerData(res.data.list)
            }).catch(err => {
                console.log(err)
            })
        },
        
        /**
         * 格式化数据
         * @param {Object} data 歌手数据
         */
        formattedSingerData (data) {
            let newSingerObject = {}
            let newSingerList = []
            let newSinger = item => new Singer(item.Fsinger_mid, item.Fsinger_name, item.Findex)
            let screening = item => { if (/[a-zA-Z]/gi.test(item.letter)) return item }
            let sortletter = (a, b) => a.key.charCodeAt() - b.key.charCodeAt()
            let singer = compose(filter(screening), map(newSinger))(data)
            let hostSinger = slice(0, 10, singer)
            singer.forEach((item, index) => {
                if (!newSingerObject[item.letter]) {
                    newSingerObject[item.letter] = {
                        key: item.letter,
                        items: [item]
                    }
                } else {
                    newSingerObject[item.letter].items.push(item)
                }
            })
            for (let key in newSingerObject) {
                newSingerList.push(newSingerObject[key])
            }
            newSingerList = sort(sortletter, newSingerList)
            newSingerList.unshift({
                key: '热门',
                items: hostSinger
            })
            return newSingerList
        },

        /**
         * 快速定位栏touchstart
         * @param {Number} index 索引
         */
        handleTouchStart (index) {
            this.$refs.iscoll.scrollToElement(this.$refs.singerList[index], 0)
            this.currentIndex = parseInt(index, 10)
        },

        /**
         * 快速定位栏touchmove
         * @param {Number} index 索引
         */
        handletouchMove (index) {
            this.$refs.iscoll.scrollToElement(this.$refs.singerList[index], 0)
            index = parseInt(index)
            if (index >= this.singerGroupHeight.length - 2) {
                index = this.singerGroupHeight.length - 2
            } else if (index <= 0) {
                index = 0
            }
            this.currentIndex = index
        },

        /**
         * 监听betterScroll的滚动
         * @param {Number} posY y轴滚动距离
         */
        onScroll (posY) {
            this.scrollY = posY
            if (posY >= 0) {
                // 下拉
                this.currentIndex = 0
                return
            } else {
                // 中间滚
                for (let i = 0; i < this.singerGroupHeight.length - 1; i++) {
                    let topHeight = this.singerGroupHeight[i]
                    let downHeight = this.singerGroupHeight[i+1]
                    if (Math.abs(posY) >= topHeight && Math.abs(posY) < downHeight) {
                        this.currentIndex = i
                        this.diff = downHeight - Math.abs(posY)
                        return
                    }
                }
                // 因为push了一个0，所以减去2
                // 在最后
                this.currentIndex = this.singerGroupHeight.length - 2
                return
            }
        },

        /**
         * 计算歌手列表组的高度
         */
        getSingerGroupHeight () {
            let allHeight = 0
            this.singerGroupHeight.push(0)
            this.$refs.singerList.forEach(dom => {
                allHeight += dom.clientHeight
                this.singerGroupHeight.push(allHeight)
            })
        },

        /**
         * 点击歌手
         * @param {Singer} singer 歌手信息
         */
        onSingerClick (singer) {
            this.SetSinger(singer)
            this.$router.push(`/singer/${singer.id}`)
        },

        handleFullScreenChange () {
            if (this.playlist.length && !this.fullScreen) {
                this.$refs.iscoll.$el.style.bottom = '60px'
            } else {
                this.$refs.iscoll.$el.style.bottom = '0'
            }
            this.$refs.iscoll.refresh()
        }
    }
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';

.singer-wrappper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 88px;
    overflow: hidden;
    .scroll-view-wrappper {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: hidden;
        .singer-list-wrapper {
            width: 100%;
            height: auto;
        }
    }
}

.singer-title {
    width: 100%;
    font-size: @font-size-medium;
    font-weight: normal;
    color: @color-text-l;
    line-height: 14px;
    padding: 8px 0 8px 14px;
    box-sizing: border-box;
    background-color: @color-highlight-background;
}

.singer-fixed {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate3d(0, 0, 0.01)
}
</style>
