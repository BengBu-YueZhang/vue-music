<template>
    <section class="search-wrappper">
        <music-search-input
            @search="search"
        ></music-search-input>
        <div>
            <music-search-result></music-search-result>
        </div>
        <div class="shortcut-wrapper">
            <music-scroll class="cube-scroll-wrapper" :scroll-data="hot">
                <div>
                    <div class="cube-scroll-list-wrapper">
                        <music-search-hot
                            :hot="hot"
                            @search="search"
                        ></music-search-hot>
                        <music-search-history></music-search-history>
                    </div>
                </div>
            </music-scroll>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import { OK } from './../../config/index'
import Hot from './../../model/Hot'
import MusicSearchHistory from './../../components/MusicSearchHistory/MusicSearchHistory'
import MusicSearchHot from './../../components/MusicSearchHot/MusicSearchHot'
import MusicSearchInput from './../../components/MusicSearchInput/MusicSearchInput'
import MusicSearchResult from './../../components/MusicSearchResult/MusicSearchResult'
import MusicScroll from './../../components/MusicScroll/MusicScroll'
import { map, slice } from 'ramda'

export default {
    components: {
        MusicSearchHistory,
        MusicSearchHot,
        MusicSearchInput,
        MusicSearchResult,
        MusicScroll
    },

    data () {
        return {
            hot: [],
            result: []
        }
    },

    created () {
        this.getHotSearch()
    },

    methods: {
        ...mapActions('search', [
            'GetHotSearchAjax',
            'SearchKeyAjax',
        ]),
        
        /**
         * 获取热门搜索
         */
        getHotSearch () {
            this.GetHotSearchAjax().then(res => {
                console.log('111')
                if (res.code !== OK) throw new Error(res.subcode)
                this.hot = slice(0, 10, map((item) => new Hot(item.k), res.data.hotkey))
            }).catch(err => {
                console.log(err)
            })
        },

        /**
         * 搜索
         * @param {String} value 关键字
         */
        search (value) {
            this.SearchKeyAjax(value).then(res => {
                console.log(res)
            }).catch(err => {

            })
        }
    }
}
</script>

<style lang="less" scoped>
.shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
    .cube-scroll-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>
