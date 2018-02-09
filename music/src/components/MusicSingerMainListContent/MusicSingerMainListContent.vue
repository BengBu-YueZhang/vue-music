<template>
    <div class="singer-content-item">
        <img v-lazy="imgurl">
        <span>{{this.name}}</span>
    </div>
</template>

<script>
export default {
    props: {
        letter: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        imgurl: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';

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
