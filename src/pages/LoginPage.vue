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

<style>
.login-card {
  width: 450px;
  margin: 0 auto;
  padding: 10px;
}
</style>
