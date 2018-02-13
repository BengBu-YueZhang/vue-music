<template>
    <section class="search-wrappper">
        <music-search-input></music-search-input>
        <div>
            <music-search-result></music-search-result>
        </div>
        <div>
            <music-search-hot></music-search-hot>
            <music-search-history></music-search-history>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import MusicSearchHistory from './../../components/MusicSearchHistory/MusicSearchHistory'
import MusicSearchHot from './../../components/MusicSearchHot/MusicSearchHot'
import MusicSearchInput from './../../components/MusicSearchInput/MusicSearchInput'
import MusicSearchResult from './../../components/MusicSearchResult/MusicSearchResult'

export default {
    components: {
        MusicSearchHistory,
        MusicSearchHot,
        MusicSearchInput,
        MusicSearchResult
    },

    data () {
        return {
            hot: []
        }
    },

    methods: {
        ...mapActions('search', [
            'GetHotSearchAjax'
        ]),
        
        /**
         * 获取热门搜索
         */
        getHotSearch () {
            this.GetHotSearchAjax().then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
