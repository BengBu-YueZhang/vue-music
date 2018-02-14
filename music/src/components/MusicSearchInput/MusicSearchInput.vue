<template>
    <div class="search-box-wrappper">
        <div class="search-box">
            <input
                type="text"
                :value="searchValue"
                placeholder="搜索歌曲，歌手"
                @input="handleSearchInput"
            />
            <i @click="close" class="iconfont icon-chahao" v-show="searchValue.length > 0"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'search-value': {
            type: String,
            default () {
                return ''
            }
        }
    },

    methods: {
        /**
         * 搜索框input事件
         */
        handleSearchInput (ev) {
            this.$emit('search', ev.target.value)
        },

        /**
         * 清楚搜索框中的内容
         */
        close () {
            this.$emit('search', '')
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
