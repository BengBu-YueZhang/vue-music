<template>
    <ul class="singer-list-wrapper">
        <li v-for="(singerItem, index) in singerData"
            :key="index">
            <music-singer-main-list-title :title="singerItem.key"></music-singer-main-list-title>
            <ul class="singer-content">
                <music-singer-main-list-content
                    v-for="singerContent in singerItem.items"
                    :key="singerContent.id"
                    :letter="singerContent.letter"
                    :name="singerContent.name"
                    :imgurl="singerContent.imgurl"
                ></music-singer-main-list-content>
            </ul>
        </li>
    </ul>
</template>

<script>
import MusicSingerMainListContent from './../MusicSingerMainListContent/MusicSingerMainListContent'
import MusicSingerMainListTitle from './../MusicSingerMainListTitle/MusicSingerMainListTitle'

export default {
    components: {
        MusicSingerMainListContent,
        MusicSingerMainListTitle,
    },

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
</style>
