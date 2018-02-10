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
                    <h3 class="singer-title">{{singerItem.key}}</h3>
                    <ul class="singer-content">
                        <li class="singer-content-item"
                            v-for="singerContent in singerItem.items"
                            :key="singerContent.id">
                            <img v-lazy="singerContent.imgurl">
                            <span>{{singerContent.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </music-scroll>
        <MusicSingerQuickList
            @touch-start="touchStart"
            @touch-move="touchMove"
            :singer-data="singerList"
            :current-index="currentIndex"
        ></MusicSingerQuickList>
        <h3 class="singer-title singer-fixed" v-if="fixedTitle" ref="fixedTitle">
            {{fixedTitle}}
        </h3>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import { OK } from './../../config/index'
import Singer from './../../model/Singer'
import { slice, uniq, map, sort, filter, compose, forEach} from 'ramda'
import MusicSingerQuickList from './../../components/MusicSingerQuickList/MusicSingerQuickList'
import MusicScroll from './../../components/MusicScroll/MusicScroll'

export default {
    components: {
        MusicSingerQuickList,
        MusicScroll
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
            // 歌手列表各个区块距离顶部的距离查
            diff: 0
        }
    },

    created () {
        this.getSingerList()
        // 标题距离顶部的距离
        this.fixedTop = 0
    },

    computed: {
        fixedTitle () {
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
            val < 30 ? this.fixedTop = val - 30 : this.fixedTop = val
            if (this.fixedTop === val) return
            this.$refs.fixedTitle.style.transform = `translate3d(0, ${this.fixedTop}px, 0.01px)`
        }
    },

    methods: {
        ...mapActions('singer', [
            'GetSingerListAjax'
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
        touchStart (index) {
            this.$refs.iscoll.scrollToElement(this.$refs.singerList[index], 0)
            this.currentIndex = parseInt(index, 10)
        },

        /**
         * 快速定位栏touchmove
         * @param {Number} index 索引
         */
        touchMove (index) {
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
            if (posY >= 0) {
                this.currentIndex = 0
                return
            } else {
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
}

.scroll-view-wrappper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
}

.scroll-view {
    width: 100%;
    height: auto;
}

.singer-list-wrapper {
    width: 100%;
    height: auto;
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

.singer-content-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 20px 0 0 30px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    span {
        margin-left: 20px;
        font-size: @font-size-medium;
        color: @color-text-l;
    }
}

.singer-fixed {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate3d(0, 0, 0.01)
}
</style>
