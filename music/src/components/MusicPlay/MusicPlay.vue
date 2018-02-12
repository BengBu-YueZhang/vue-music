<template>
    <section class="autio-wrapper" v-show="playlist.length > 0">
        <div class="noraml-aution-wrapper" v-show="fullScreen">
        </div>
        <div class="mini-aution-wrapper" v-show="!fullScreen">
        </div>
    </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('play', [
            'singer',
            'playing',
            'fullScreen',
            'playlist',
            'sequenlist',
            'mode',
            'currentIndex'
        ]),

        ...mapGetters('play', [
            'currentSong'
        ])
    },

    methods: {
        ...mapActions('play', [

        ])
    }
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';

.autio-wrapper {
    width: 100%;
}

.noraml-aution-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: @color-highlight-background;
}

.mini-aution-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: @color-highlight-background;
}
</style>

