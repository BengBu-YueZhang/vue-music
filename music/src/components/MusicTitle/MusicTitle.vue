<template>
    <h1 class="music-title">{{this.title}}</h1>
</template>

<script>
export default {
    props: {
        'title': {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../common/css/variable.less";

.music-title {
    width: 100%;
    height: 65px;
    font-size: @font-size-medium;
    color: @color-theme;
    text-align: center;
    line-height: 65px;
}
</style>

