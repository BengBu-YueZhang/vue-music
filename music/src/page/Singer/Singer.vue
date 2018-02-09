<template>
    <section class="singer-wrappper">
        <music-scroll 
            class="scroll-view-wrappper"
            :scroll-data="singerList"
            ref="iscoll">
            <music-singer-main-list :singer-data="singerList"></music-singer-main-list>
        </music-scroll>
        <MusicSingerQuickList :singer-data="singerList"></MusicSingerQuickList>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import { OK } from './../../config/index'
import Singer from './../../model/Singer'
import { slice, uniq, map, sort, filter, compose, forEach} from 'ramda'
import MusicSingerQuickList from './../../components/MusicSingerQuickList/MusicSingerQuickList'
import MusicSingerMainList from './../../components/MusicSingerMainList/MusicSingerMainList'
import MusicScroll from './../../components/MusicScroll/MusicScroll'

export default {
    components: {
        MusicSingerQuickList,
        MusicSingerMainList,
        MusicScroll
    },

    data () {
        return {
            // 歌手列表
            singerList: []
        }
    },

    created () {
        this.getSingerList()
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
        }
    }
}
</script>

<style lang="less" scoped>
.singer-wrappper {
   position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden; 
}

.scroll-view-wrappper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 88px;
    overflow: hidden;
}

.scroll-view {
    width: 100%;
    height: auto;
}
</style>
