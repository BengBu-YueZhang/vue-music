<template>
    <section class="recommend-wrappper">
        推荐
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    created () {
        this.getCarouseData()
    },

    methods : {
        ...mapActions('recommend', [
            'GetCarouselDataAjax'
        ]),

        getCarouseData () {
            this.GetCarouselDataAjax().then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
