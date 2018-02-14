<template>
    <div class="search-history">
        <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear">
                <i class="iconfont icon-shanchu"></i>
            </span>
        </h1>
        <div class="search-list">
            <ul>
                <li class="search-item"
                    v-for="(historyItem, index) in searchHistoryList"
                    :key="index"
                    @click="searchHistory">
                    <span class="text">{{historyItem.value}}</span>
                    <span class="icon" @click.shop="deleteHistory">
                        <i class="iconfont icon-chahao"></i>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'search-history-list': {
            type: Array,
            default () {
                return []
            }
        }
    },

    methods: {
        /**
         * 搜索历史记录
         */
        searchHistory () {

        },

        /**
         * 删除历史记录
         */
        deleteHistory () {

        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../common/css/variable.less";

.search-history {
    position: relative;
    margin: 0 20px;
    h1 {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 14px;
        color: @color-text-l;
        .text {
            flex: 1;
        }
        .clear {
            i {
                font-size: @font-size-medium;
                color: @color-text-d;
            }
        }
    }
    .search-list {
        ul {
            list-style: none;
            .search-item {
                display: flex;
                align-items: center;
                height: 40px;
                overflow: hidden;
                .text {
                    flex: 1;
                    color: @color-text-l;
                }
                .icon {
                    position: relative;
                    i {
                        font-size: @font-size-small;
                        color: @color-text-d;
                    }
                }
            }
        }
    }
}
</style>
