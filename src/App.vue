<template>
  <div id="app">
    <NavHeader></NavHeader>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <BackTop></BackTop>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader'
export default {
  name: 'App',
  components: {
    NavHeader
  }
}
</script>
