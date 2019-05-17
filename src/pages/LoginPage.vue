<template>
  <div class="login">
    <main class="content"
          ref="content">
      <Card class="login-card"
            :bordered="false">
        <Login></Login>
      </Card>
    </main>
  </div>
</template>

<script>
import Login from './../components/Login.vue'

export default {
  components: {
    Login
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
