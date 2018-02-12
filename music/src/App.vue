<template>
  <div id="app">
    <music-header></music-header>
    <music-nav></music-nav>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <music-play></music-play>
  </div>
</template>

<script>
import MusicHeader from './components/MusicHeader/MusicHeader'
import MusicNav from './components/MusicNav/MusicNav'
import MusicPlay from './components/MusicPlay/MusicPlay'

export default {
  name: 'App',
  
  components: {
    MusicHeader,
    MusicNav,
    MusicPlay
  }
}
</script>

<style scoped lang="less">
</style>

