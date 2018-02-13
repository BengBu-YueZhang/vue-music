<template>
    <ul class="singer-list-wrapper">
        <music-singer-list-item
            v-for="singerItem in list"
            :key="singerItem.id"
            :singer="singerItem"
            @singer-click="onSingerClick"
        ></music-singer-list-item>
    </ul>
</template>

<script>
import MusicSingerListItem from './../MusicSingerListItem/MusicSingerListItem'

export default {
    components: {
        MusicSingerListItem,
    },

    props: {
        'list': {
            type: Array,
            default () {
                return []
            }
        }
    },

    methods: {
        onSingerClick (singer) {
            this.$emit('singer-click', singer)
        }
    }
}
</script>

<style scoped lang="less">
@import "./../../common/css/variable.less";

.singer-content-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 20px 0 0 30px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    span {
        margin-left: 20px;
        font-size: @font-size-medium;
        color: @color-text-l;
    }
}
</style>
