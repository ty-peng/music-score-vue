<template>
  <div class="login">
    <main class="content"
          ref="content">
      <Card class="login-card"
            :bordered="false">
        <Login></Login>
        <router-link to="/register">
          <p align="center">没有账号？马上注册</p>
        </router-link>
      </Card>
    </main>
  </div>
</template>

<script>
import Login from './../components/Login.vue'

export default {
  components: {
    Login
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  height 550px
.login-card
  width 450px
  margin 60px auto
  padding 10px
  box-shadow 0 2px 43px -4px rgba(0, 0, 0, 0.19)
</style>
