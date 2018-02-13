<template>
    <h3 class="singer-title">{{title}}</h3>
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

<style scoped lang="less">
@import './../../common/css/variable.less';

.singer-title {
    width: 100%;
    font-size: @font-size-medium;
    font-weight: normal;
    color: @color-text-l;
    line-height: 14px;
    padding: 8px 0 8px 14px;
    box-sizing: border-box;
    background-color: @color-highlight-background;
}
</style>
