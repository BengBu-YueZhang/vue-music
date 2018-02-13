<template>
    <li class="ranking-item">
        <div class="ranking-left">
            <img v-lazy="ranking.image"/>
        </div>
        <ul class="ranking-right">
            <li
                v-for="(song, index) in ranking.song"
                :key="index"
            >{{`${index + 1}.${song.songname}-${song.singername}`}}</li>
        </ul>
    </li>
</template>

<script>
export default {
    props: {
        ranking: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../common/css/variable.less";

.ranking-item {
    display: flex;
    margin: 0 20px;
    padding-top: 20px;
    height: 100px;
    box-sizing: content-box;
    .ranking-left {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .ranking-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: @color-highlight-background;
        color: @color-text-d;
        font-size: 12px;
        list-style: none;
        li {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            line-height: 26px;
        }
    }
}
</style>
