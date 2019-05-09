<template>
  <div id="app">
    <NavHeader></NavHeader>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <BackTop></BackTop>
    <Footer></Footer>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    NavHeader,
    Footer
  }
}
</script>
