<template>
    <nav class="app-nav">
        <router-link to="/recommend" class="nav-item">
            <span>推荐</span>
        </router-link>
        <router-link to="/singer" class="nav-item">
            <span>歌手</span>
        </router-link>
        <router-link to="/ranking" class="nav-item">
            <span>排行</span>
        </router-link>
        <router-link to="/search" class="nav-item">
            <span>搜索</span>
        </router-link>
    </nav>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
/* router-link-exact-active */
@import "./../../common/css/variable.less";

.app-nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 44px;
}

.nav-item {
    flex: 1;
    font-size: @font-size-medium;
    color: @color-text-l;
    text-align: center;
    text-decoration: none;
    box-sizing: border-box;
    line-height: 44px;
}

.router-link-active {
    color: @color-theme;
    span {
        display: inline-block;
        padding: 0 10px;
        height: 44px;
        border-bottom: 2px solid @color-theme;
    }
}
</style>
