<template>
    <header class="app-header">
        <div class="app-header-logo"></div>
        <div class="app-header-title">Music</div>
        <div class="app-header-icon" @click="$router.push('/user')">
            <i class="iconfont icon-account"></i>
        </div>
    </header>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@import "./../../common/css/variable.less";

.app-header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 44px;
    text-align: center;
    font-size: 0;
    background-color: @color-background;
    color: @color-theme;
    .app-header-logo {
        display: inline-block;
        width: 34px;
        height: 32px;
        margin-right: 6px;
        background: url('./../../common/imgae/default.png') no-repeat;
        background-size: 34px 32px;
    }
    .app-header-title {
        display: inline-block;
        font-size: @font-size-large;
        line-height: 44px;
    }
    .app-header-icon {
        position: absolute;
        right: 8px;
        top: 15px;
        i {
            font-size: @font-size-large;
            color: @color-theme;
        }
    }
}
</style>
