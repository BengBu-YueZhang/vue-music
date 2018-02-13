<template>
    <ul class="ranking-list">
        <music-ranking-list-item
            v-for="rankingItem in rankingList"
            :key="rankingItem.id"
        ></music-ranking-list-item>
    </ul>
</template>

<script>
import MusicRankingListItem from './../MusicRankingListItem/MusicRankingListItem'

export default {
    components: {
        MusicRankingListItem
    },

    props: {
        'ranking-list': {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style lang="less" scoped>
</style>
