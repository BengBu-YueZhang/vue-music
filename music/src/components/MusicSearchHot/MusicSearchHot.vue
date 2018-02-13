<template>
    <div class="hot-wrapper">
        <h1>热门搜索</h1>
        <ul class="hot-list">
            <li class="hot-list-item"
                v-for="(hotItem, index) in hot"
                :key="index"
                @click="search(hotItem.key)">
                <span>{{hotItem.key}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        hot: {
            type: Array,
            default () {
                return []
            }
        }
    },

    methods: {
        /**
         * 搜索热门搜索
         * @param {String} value 搜索的内容
         */
        search (value) {
            this.$emit('search', value)
        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../common/css/variable.less";

.hot-wrapper {
    margin: 0 20px 20px;
    h1 {
        margin-bottom: 20px;
        font-size: @font-size-medium;
        color: @color-text-l;
    }
    .hot-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        height: auto;
        .hot-list-item {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: @color-highlight-background;
            font-size: @font-size-medium;
            color: @color-text-d;
        }
    }
}
</style>
