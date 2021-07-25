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
import {mapActions} from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    NavigationBar,
    Footer
  },
  methods: {
    ...mapActions({
      fetchCategories: 'product/fetchCategories',
      fetchProducts: 'product/fetchProducts',
      tryAutoLogin: 'auth/tryToLogin'
    })
  },
  async created() {
    await this.fetchCategories()
    await this.fetchProducts()
    await this.tryAutoLogin()
  }
}
</script>

<style>
</style>
