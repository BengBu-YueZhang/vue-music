<template>
  <div id="app">
    Hello Vue
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
@import "./common/css/variable.less";

#app {
  color: @color-theme;
}
</style>

