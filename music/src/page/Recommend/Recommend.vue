<template>
    <section class="recommend-wrappper">
        <music-swiper
            :slider="this.slider"
        ></music-swiper>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import MusicSwiper from './../../components/MusicSwiper/MusicSwiper'

export default {
    components: {
        MusicSwiper
    },

    data () {
        return {
            slider: []
        }
    },

    created () {
        this.getCarouseData()
    },

    methods : {
        ...mapActions('recommend', [
            'GetCarouselDataAjax'
        ]),

        /**
         * 获取轮播图数据
         */
        getCarouseData () {
            this.GetCarouselDataAjax().then(res => {
                if (parseInt(res.code) !== 0) throw new Error(res)
                this.slider = res.data.slider
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
