<template>
    <section class="search-wrappper">
        <music-scroll
            :data="result"
            class="cube-scroll-wrapper">
            <div class="cube-scroll-list-wrapper">
                <ul class="suggest-list">
                    <li class="suggest-item"
                        v-for="resultItem in result"
                        :key="resultItem.id">
                        <div class="name">
                            <p class="text">{{resultItem.name}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </music-scroll>
    </section>
</template>

<script>
import MusicScroll from './../MusicScroll/MusicScroll'

export default {
    components: {
        MusicScroll
    },

    props: {
        result: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../common/css/variable.less";

.search-wrappper {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
    .cube-scroll-wrapper {
        position: relative;
        height: 100%;
        overflow: hidden;
        .suggest-list {
            padding: 0 30px;
            list-style: none;
            .suggest-item {
                display: flex;
                align-items: center;
                padding-bottom: 20px;
                .name {
                    flex: 1;
                    font-size: @font-size-medium;
                    color: @color-text-d;
                    overflow: hidden;
                    .text {
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
}
</style>
