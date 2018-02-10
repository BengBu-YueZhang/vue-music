<template>
    <div class="scroll-wrapper" ref="scrollWrapper">
        <slot></slot>
    </div>
</template>

<script>
import BetterScroll from 'better-scroll'

export default {
    props: {
        'probe-type': {
            type: Number,
            default: 1
        },

        'click': {
            type: Boolean,
            default: true
        },

        'scroll-data': {
            type: [Array, Object],
            default () {
                return null
            }
        },

        'on-scroll': {
            type: Boolean,
            default () {
                return false
            }
        }
    },

    data () {
        return {
            iScroll: null
        }
    },

    mounted () {
        setTimeout(() => {
            this.init()
        })
    },

    methods: {
        /**
         * 初始化better-scroll
         */
        init () {
            if (!this.$refs.scrollWrapper) {
                return false
            }
            this.iScroll = new BetterScroll(this.$refs.scrollWrapper, {
                probeType: this.probeType,
                click: this.click
            })
            // 是否需要监听betterscroll
            if (this.onScroll) {
                this.iScroll.on('scroll', (position) => {
                    this.$emit('onScroll', parseInt(position.y, 10))
                })
            }
        },

        /**
         * 启动BetterScroll
         */
        enable () {
            this.iScroll && this.iScroll.enable()
        },

        /**
         * 关闭BetterScroll
         */
        disable () {
            this.iScroll && this.iScroll.enable()
        },

        /**
         * 刷新BetterScroll
         */
        refresh () {
            this.iScroll && this.iScroll.refresh()
        },

        /**
         * 滚动到指定位置
         */
        scrollTo (...rest) {
            this.iScroll && this.iScroll.scrollTo(...rest)
        },

        /**
         * 滚动到指定元素
         */
        scrollToElement (...rest) {
            this.iScroll && this.iScroll.scrollToElement(...rest)
        }
    },

    watch: {
        scrollData: {
            handler: function (val, oldVal) {
                this.refresh()
            },
            deep: true
        }
    }
}
</script>

<style lang="less" scoped>
</style>
