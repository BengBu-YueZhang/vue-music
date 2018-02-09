<template>
  <div id="app">
    <music-header></music-header>
    <music-nav></music-nav>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MusicHeader from './components/MusicHeader/MusicHeader'
import MusicNav from './components/MusicNav/MusicNav'

export default {
  name: 'App',
  
  components: {
    MusicHeader,
    MusicNav
  }
}
</script>

<style scoped lang="less">
</style>

