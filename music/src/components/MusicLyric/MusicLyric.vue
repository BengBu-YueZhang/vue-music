<template>
    <div class="lyric-wrapper">
        <div>
            <p v-for="(lyricItem, index) in lyricLines" :key="index" class="text" :class="{'active': currentIndex === index}">
                {{lyricItem.txt}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 歌词
        lyric: {
            type: Object,
            default () {
                return {}
            }
        },

        // 索引
        'current-index': {
            type: Number,
            default: 0
        }
    },

    computed: {
        lyricLines () {
            if (this.lyric && this.lyric.lines) {
                return this.lyric.lines
            } else {
                return []
            }
        }
    }
}
</script>

<style lang="less" scoped>
.lyric-wrapper {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    .text {
        line-height: 32px;
        color: hsla(0,0%,100%,.5);
        font-size: 14px;
    }
    .active {
        color: #fff;
    }
}
</style>
