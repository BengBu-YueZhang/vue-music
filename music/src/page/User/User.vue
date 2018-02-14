<template>
    <section class="user-wrapper">
        <div class="user-back" @click="$router.go(-1)">
            <i class="iconfont icon-back"></i>
        </div>
        <div class="user-header">
            <ul class="switches-btns">
                <li class="switch-item">
                    <router-link to="/user/like" class="nav-item">
                        <span>我喜欢的</span>
                    </router-link>
                </li>
                <li class="switch-item">
                    <router-link to="/user/lately" class="nav-item">
                        <span>最近听的</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="play-btn">
            <i class="iconfont icon-zanting1"></i>
            <span>随机播放全部</span>
        </div>
        <div class="list-wrapper">
            <router-view></router-view>
        </div>
    </section>
</template>

<script>
import Lately from './../Lately/Lately'
import Like from './../Like/Like'

export default {
    components: {
        Lately,
        Like
    }
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';

.user-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: @color-background;
    .user-back {
        position: absolute;
        top: 3px;
        left: 5px;
        z-index: 50;
        i {
            display: block;
            padding: 10px;
            font-size: @font-size-large-x;
            color: @color-theme;
        }
    }
    .user-header {
        margin: 10px 0 30px;
        .switches-btns {
            display: flex;
            align-items: center;
            width: 240px;
            margin: 0 auto;
            border: 1px solid #333;
            border-radius: 5px;
            list-style: none;
            li {
                flex: 1;
                text-align: center;
                a {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    padding: 8px;
                    font-size: @font-size-medium;
                    color: @color-text-d;
                    text-decoration: none;
                    box-sizing: border-box;
                }
                .router-link-active {
                    background: @color-highlight-background;
                    color: @color-text;
                }
            }
        }
    }
    .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid @color-text-l;
        color: @color-text-l;
        border-radius: 100px;
        font-size: 0;
        i {
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: 16px;
        }
        span {
            display: inline-block;
            vertical-align: middle;
            font-size: @font-size-small;
        }
    }
}
</style>
