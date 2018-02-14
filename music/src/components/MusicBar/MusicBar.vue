<template>
    <div class="bar-wrapper">
        <div class="bar"
            ref="bar"
            @touchmove="handleBarTouchMove"
            @touchend="handleBarTouchEnd"
            @click="handleBarClick">
            <div
                ref="barBtn"
                class="bar-btn-wrapper"
                @touchstart.shop="handleBarTouchStart">
                <div class="bar-btn"   
                ></div>
            </div>
            <div class="bar-plan"
                ref="barPlan"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'plan-proportion': {
            type: Number,
            default: 0
        }
    },

    data () {
        return {
            // 是否start了btn
            isTouchStart: false,
            // 手指信息
            touchInfo: {
                // 手指触摸的pageX
                start: 0,
                // 手指运动的pageX - 开始触摸的pageX = 移动的距离
                end: 0
            },
            // 目前滚动的距离
            distanceMovedPlan: 0,
            distanceMovedBtn: 0
        }
    },

    watch: {
       planProportion (val, oldVal) {
           this.$nextTick(() => {
               let overallLength = this.$refs.bar.clientWidth
               this.distanceMoved = parseInt(overallLength * val)
               this.distanceMovedBtn = parseInt((overallLength - 15)*val)
               this.$refs.barPlan.style.width = `${this.distanceMoved}px`
               this.$refs.barBtn.style['transform'] = `translateX(${this.distanceMovedBtn}px)`
               this.$refs.barBtn.style['webkitTransform'] = `translateX(${this.distanceMovedBtn}px)`
           })
       }
    },

    methods: {
        /**
         * 进度条点击
         */
        handleBarClick () {

        },

        /**
         * 进度条触摸
         */
        handleBarTouchStart (ev) {
            this.isTouchStart = true
            this.touchInfo.start = parseInt(ev.touches[0].pageX)
        },
        
        /**
         * 进度条拖动
         */
        handleBarTouchMove (ev) {
            if (!this.isTouchStart) return
            this.touchInfo.end = parseInt(ev.touches[0].pageX) - this.touchInfo.start
            // let currentPageX = this.distanceMoved + this.touchInfo.end
            // currentPageX = Math.max(0, currentPageX)
            // currentPageX = Math.min(currentPageX, this.$refs.bar.clientWidth - 15)
            // this.$refs.barPlan.style.width = `${currentPageX}px`
            // this.$refs.barBtn.style['transform'] = `translateX(${currentPageX}px)`
            // this.$refs.barBtn.style['webkitTransform'] = `translateX(${currentPageX}px)`
        },

        /**
         * 进度条触摸结束
         */
        handleBarTouchEnd () {
            this.isTouchStart = false
            
        }
    }
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';

.bar-wrapper {
    flex: 1;
    height: 30px;
    .bar {
        position: relative;
        top: 13px;
        height: 4px;
        background: @color-background-d;
        .bar-plan {
            width: 0;
            height: 4px;
            background-color: @color-theme;
        }
        .bar-btn-wrapper {
            position: absolute;
            left: -8px;
            top: -13px;
            width: 30px;
            height: 30px;
            .bar-btn {
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 3px solid @color-text;
                border-radius: 50%;
                background: @color-theme;
            }
        }
        
    }
}
</style>
