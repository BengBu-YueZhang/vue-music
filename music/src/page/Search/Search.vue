<template>
    <section class="search-wrappper">
        <music-search-input
            ref="input"
            @search="search"
        ></music-search-input>
        <div
            v-show="searchValue !== ''"
            class="search-result">
            <music-search-result
                :result="result"
            ></music-search-result>
        </div>
        <div
            v-show="searchValue === ''"
            class="shortcut-wrapper">
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
import { createSong } from './../../model/Song'
import MusicSearchHistory from './../../components/MusicSearchHistory/MusicSearchHistory'
import MusicSearchHot from './../../components/MusicSearchHot/MusicSearchHot'
import MusicSearchInput from './../../components/MusicSearchInput/MusicSearchInput'
import MusicSearchResult from './../../components/MusicSearchResult/MusicSearchResult'
import MusicScroll from './../../components/MusicScroll/MusicScroll'
import throttle from './../../util/throttle'
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
            // 热搜
            hot: [],
            // 搜索结果
            result: [],
            // 搜索内容
            searchValue: '',
            // 节流搜索
            searchThrottle: null
        }
    },

    created () {
        // 节流函数
        this.searchThrottle = throttle(this.searchDatabase, 1000)
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
            this.searchValue = value
            this.searchThrottle(this.searchValue)
        },

        /**
         * 节流请求搜索
         * @param {String} value 关键字
         */
        searchDatabase (value) {
            this.SearchKeyAjax(value).then(res => {
                 if (res.code !== OK) throw new Error(res.message)
                 this.result = map(createSong, res.data.song.list)
            }).catch(err => {
                 console.log(err)
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

.search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
}
</style>
