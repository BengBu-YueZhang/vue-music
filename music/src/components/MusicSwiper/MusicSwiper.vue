<template>
    <div class="music-swiper-wrapper">

    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
    components: {
        Swiper,
        SwiperSlide
    },

    props: {
        slider: {
            type: Array,
            default () {
                return []
            }
        }
    },

    data () {
        return {
            swiperOption: {
                
            }
        }
    }
}
</script>

<style scoped>
.music-swiper-wrapper {
    width: 100%;
    height: ;
}
</style>

