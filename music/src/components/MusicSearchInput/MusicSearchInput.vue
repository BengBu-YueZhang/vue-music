<template>
    <div class="search-box">
        <i></i>
        <input type="text" @input="handleSearchInput"/>
        <i></i>
    </div>
</template>

<script>
import throttle from './../../util/throttle'

export default {
    data () {
        return {
            throttleSearch: null
        }
    },

    created () {
        this.throttleSearch = throttle(this.searchValue, 500)
    },

    methods: {
        /**
         * 搜索框input事件
         */
        handleSearchInput (ev) {
            let value = ev.target.value
            this.throttleSearch(value)
        },
        
        /**
         * 请求搜索结果
         * @param {String} 搜索框的内容
         */
        searchValue (value) {
            console.log(value)
        }
    }
}
</script>

<style lang="less" scoped>
</style>
