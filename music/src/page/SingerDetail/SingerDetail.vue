<template>
    <transition name="singerdetail">
        <section class="singer-detail-wrapper">
        </section>
    </transition>
    
</template>

<script>
export default {
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


