<template>
  <div id="app">
    <music-header></music-header>
    <router-view/>
  </div>
</template>

<script>
import MusicHeader from './components/MusicHeader/MusicHeader'
export default {
  name: 'App',
  
  components: {
    MusicHeader
  }
}
</script>

<style scoped lang="less">
</style>

