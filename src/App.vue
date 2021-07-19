<template>
  <Header/>
  <navigation-bar></navigation-bar>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import Header from '@/views/layouts/Header.vue'
import NavigationBar from '@/views/layouts/NavigationBar.vue'
import Footer from '@/views/layouts/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    NavigationBar,
    Footer
  }
}
</script>

<style>
</style>
