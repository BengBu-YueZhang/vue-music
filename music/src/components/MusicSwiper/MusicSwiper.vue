<template>
    <div class="music-swiper-wrapper">
        <swiper :options="swiperOption">
            <swiper-slide
                v-for="sliderItem in slider"
                :key="sliderItem.id">
                <img :src="sliderItem.picUrl" @load="imgOnLoad" class="slider-item"/>
            </swiper-slide>
            <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    components: {
        swiper,
        swiperSlide
    },

    props: {
        'slider': {
            type: Array,
            default () {
                return []
            }
        }
    },

    data () {
        return {
            // swiper配置
            swiperOption: {
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet(index, className) {
                        return `<span class="${className} swiper-pagination-bullet-custom"></span>`
                    }
                }
            },

            isFirst: false
        }
    },

    methods: {
        /**
         * 图片加载完成
         */
        imgOnLoad () {
            if (!this.isFirst) {
                this.isFirst = true
                this.$emit('img-load')
            }
        }
    }
}
</script>

<style>
/* 全局样式 */
.music-swiper-wrapper {
    width: 100%;
    height: auto;
}

.slider-item {
    width: 100%;
}

.swiper-pagination-bullet-custom {
    width: 8px;
    height: 8px;
    background-color:hsla(0,0%,100%,.5);
}

.swiper-pagination-bullet-active {
    width: 20px;
    height: 8px;
    background-color: hsla(0,0%,100%,.8);
    border-radius: 5px;
}
</style>

