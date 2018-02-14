<template>
    <div class="bar-wrapper" @click="handleBarClick">
        <div class="bar"
            ref="bar"
            @touchmove="handleBarTouchMove"
            @touchend="handleBarTouchEnd">
            <div
                ref="barBtn"
                class="bar-btn-wrapper"
                @touchstart.shop="handleBarTouchStart">
                <div class="bar-btn"></div>
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
                // 比例
                proportion: 0
            },
            distanceMove: 0,
            overallLength: 0
        }
    },

    watch: {
       planProportion (val, oldVal) {
           this.$nextTick(() => {
               if (!this.isTouchStart && val >= 0) {
                   this.overallLength = this.$refs.bar.clientWidth - 16
                   this.distanceMove = parseInt(this.overallLength * val)
                   this.setDistanceMove(this.distanceMove)
               }
           })
       }
    },

    methods: {
        /**
         * 进度条点击
         */
        handleBarClick (ev) {
            this.touchInfo.proportion = ev.offsetX / (this.overallLength + 16)
            this.$emit('touch-end', this.touchInfo.proportion)  
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
            let diff = ev.touches[0].pageX - this.touchInfo.start
            let currentPageX = this.distanceMove + diff
            currentPageX = Math.max(0, currentPageX)
            currentPageX = Math.min(currentPageX, this.overallLength)
            this.setDistanceMove(currentPageX)
            this.touchInfo.proportion = currentPageX / this.overallLength
            this.$emit('touch-move', this.touchInfo.proportion)  
        },

        /**
         * 进度条触摸结束
         */
        handleBarTouchEnd () {
            if (!this.isTouchStart) return
            this.isTouchStart = false
            this.$emit('touch-end', this.touchInfo.proportion)  
        },
        
        /**
         * 设置滚动条进度
         * @param {Number} dist 距离
         */
        setDistanceMove (dist) {
            this.$refs.barPlan.style.width = `${dist}px`
            this.$refs.barBtn.style['transform'] = `translateX(${dist}px)`
            this.$refs.barBtn.style['webkitTransform'] = `translateX(${dist}px)`
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
