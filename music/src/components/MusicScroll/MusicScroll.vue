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
