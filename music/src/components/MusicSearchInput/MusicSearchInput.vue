<template>
    <div class="search-box-wrappper">
        <div class="search-box">
            <input type="text" placeholder="搜索歌曲，歌手" @input="handleSearchInput"/>
            <i @click="close" class="iconfont icon-chahao" v-show="value.length > 0"></i>
        </div>
    </div>
</template>

<script>
import throttle from './../../util/throttle'

export default {
    data () {
        return {
            throttleSearch: null,
            value: ''
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
            this.value = ev.target.value
            this.throttleSearch(this.value)
        },
        
        /**
         * 请求搜索结果
         * @param {String} 搜索框的内容
         */
        searchValue (value) {
            this.$emit('search', value)
        },

        /**
         * 清楚搜索框中的内容
         */
        close () {

        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../common/css/variable.less";

.search-box-wrappper {
    margin: 20px;
    .search-box {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 6px;
        height: 40px;
        background: @color-highlight-background;
        border-radius: 6px;
        input {
            flex: 1;
            margin: 0 5px;
            line-height: 18px;
            background: @color-highlight-background;
            color: @color-text;
            font-size: @font-size-medium;
            outline: 0;
            border: none;
        }
        i {
            font-size: @font-size-medium-x;
            color: @color-background;
        }
    }
}
</style>
