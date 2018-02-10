<template>
    <transition name="singerdetail">
        <section class="singer-detail-wrapper">
        </section>
    </transition>
    
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data () {
        return {

        }
    },

    created () {
        this.getSingerDetail()
    },

    computed: {
        ...mapState('singerDetail', [
            'singer'
        ])
    },

    methods: {
        ...mapActions('singerDetail', [
            'GetSingerDetailAjax'
        ]),

        /**
         * 获取歌手详情列表数据
         */
        getSingerDetail () {
            console.log(this.singer)
            if (!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            this.GetSingerDetailAjax().then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import './../../common/css/variable.less';

.singer-detail-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background-color: @color-background;
}

.singerdetail-enter-active, .singerdetail-leave-active {
  transition: all 750ms;
  opacity: 1;
  transform: translateX(0)
}
.singerdetail-enter, .singerdetail-leave-to {
  opacity: 0.8;
  transform: translateX(100%)
}
</style>


