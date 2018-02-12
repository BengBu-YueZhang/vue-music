<template>
    <section class="autio-wrapper">
        <div class="noraml-aution-wrapper">
        </div>
        <div class="mini-aution-wrapper">
        </div>
    </section>
</template>

<script>
export default {
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

