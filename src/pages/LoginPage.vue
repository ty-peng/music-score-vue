<template>
  <div class="login">
    <main class="content"
          ref="content">
      <Login></Login>
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
