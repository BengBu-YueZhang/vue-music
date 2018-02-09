<template>
    <div class="music-recommendsong-item">
        <div class="item-left">
            <img v-lazy="imgurl"/>
        </div>
        <div class="item-right">
            <h4 class="item-right-title">{{this.name}}</h4>
            <p class="item-right-describe">{{this.dissname}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'imgurl': {
            type: String,
            default: ''
        },

        'name': {
            type: String,
            default: ''
        },

        'dissname': {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../common/css/variable.less";

.music-recommendsong-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 70px;
    margin-bottom: 20px;
    overflow: hidden;
    .item-left {
        width: 60px;
        height: 60px;
        margin-right: 20px;
        img {
            width: 60px;
            height: 60px;
        }
    }
    .item-right {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: @font-size-medium;
        .item-right-title {
            color: @color-text;
            line-height: 20px;
            margin-bottom: 10px;
        }
        .item-right-describe {
            color: @color-text-d;
            line-height: 20px;
        }
    }
}
</style>
