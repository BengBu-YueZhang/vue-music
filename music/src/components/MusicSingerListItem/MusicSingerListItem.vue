<template>
    <li class="singer-content-item" @click="handleSingerClick">
        <img v-lazy="singer.imgurl">
        <span>{{singer.name}}</span>
    </li>
</template>

<script>
export default {
    props: {
        singer: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    methods: {
        /**
         * 点击歌手
         */
        handleSingerClick () {
            this.$emit('singer-click', this.singer)
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
