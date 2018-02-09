<template>
    <ul class="singer-list-wrapper">
        <li v-for="(singerItem, index) in singerData"
            :key="index">
            <h3 class="singer-title">{{singerItem.key}}</h3>
            <ul class="singer-content">
                <li class="singer-content-item"
                    v-for="singerContent in singerItem.items"
                    :key="singerContent.id">
                    <img v-lazy="singerContent.imgurl">
                    <span>{{singerContent.name}}</span>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        'singer-data': {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style scoped lang="less">
@import './../../common/css/variable.less';

.singer-list-wrapper {
    width: 100%;
    height: auto;
}

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
