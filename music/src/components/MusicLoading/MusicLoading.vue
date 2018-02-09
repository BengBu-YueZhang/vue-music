<template>
    <div class="loading">
        <i class="loading-icon"></i>
        <span class="loading-text">{{this.loadingText}}</span>
    </div>
</template>

<script>
export default {
    props: {
        'loading-text': {
            type: String,
            default: '加载中…'
        }
    }
}
</script>

<style scoped lang="less">
@import './../../common/css/variable.less';

.loading {
    display: inline-block;
    text-align: center;
}

.loading-icon {
    display: block;
    width: 13px;
    height: 13px;
    background: url('./../../common/imgae/loading.gif') no-repeat;
    background-size: 13px 13px;
    margin: 0 auto 5px auto;
}

.loading-text {
    font-size: @font-size-small-s;
    color: @color-text;
}
</style>


