<template>
    <section class="singer-wrappper">
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import { OK } from './../../config/index'
import Singer from './../../model/Singer'
import { slice, uniq, map, sort, filter, compose, forEach} from 'ramda'

export default {
    component: {
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
                console.log(res)
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
                key: 'hot',
                items: hostSinger
            })
            return newSingerList
        }
    }
}
</script>

<style lang="less" scoped>
</style>
