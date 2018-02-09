<template>
    <div class="quick-list-wrapper">
        <ul class="quick-list" @touchstart.prevent.stop="onTouchStart">
            <li v-for="(quick, index) in singerData" :key="index" :data-index="index">
                {{quick.key.slice(0, 1)}}
            </li>
        </ul>
    </div>
</template>

<script>
import { getDataAttribute } from './../../util/domAttribute'

const HEIGHT = 18

export default {
    props: {
        'singer-data': {
            type: Array,
            default () {
                return []
            }
        }
    },

    created () {
        this.touchInfo = {}
    },

    methods: {
        /**
         * 定位栏的touchstart事件
         */
        onTouchStart (ev) {
            let target = ev.target
            let index = 0
            if (target.nodeName.toLowerCase() === 'li') {
                index = getDataAttribute(ev.target, 'index')
                this.$emit('touch-start', index)
            }
        },

        /**
         * 定位栏的touchmove事件
         */
        onTouchMove (ev) {

        }
    },
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';

.quick-list-wrapper {
    position: absolute;
    right: 0;
    top: 50%;
    width: 20px;
    height: auto;
    text-align: center; 
    transform: translateY(-40%);
    background-color: @color-background-d;
    border-radius: 10px;
    color: @color-text-l;
    padding: 20px 0;
    .quick-list {
        list-style: none;
        li {
            font-size: @font-size-small-s;
            padding: 3px 3px;
        }
    }
}
</style>
