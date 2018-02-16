<template>
    <section class="search-wrappper">
        <music-search-input
            :search-value="searchValue"
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
                        <music-search-history
                            v-show="searchHistory.length > 0"
                            :search-history-list="searchHistory"
                        ></music-search-history>
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
import { setLocal, getLocal, clearLocal } from './../../util/local'

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
            // 缓存搜索结果
            cacheResult: {},
            // 搜索内容
            searchValue: '',
            // 节流搜索
            searchThrottle: null,
            // 查询历史
            searchHistory: []
        }
    },

    created () {
        // 节流函数
        this.searchThrottle = throttle(this.searchDatabase, 1000)
        this.getHotSearch()
        this.getSearchHistory()
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

            if (this.searchValue === '') {
                this.result = []
                return
            }
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
                 // 缓存代理模式
                 // this.cacheResult[value] = this.result
            }).catch(err => {
                 console.log(err)
            })
        },

        /**
         * 获取查询历史
         */
        getSearchHistory () {
            getLocal('seach') ? this.searchHistory = getLocal('seach') : this.searchHistory = []
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
