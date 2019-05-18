<template>
  <Form ref="loginInfo"
        :model="loginInfo"
        :rules="ruleInline"
        class="i-form"
        @keyup.enter.native="login('loginInfo')">
    <h1 style="text-align: center; margin-bottom: 20px">用户登录</h1>
    <FormItem prop="account">
      <Input type="text"
             v-model="loginInfo.account"
             placeholder="邮箱/用户名/已验证手机"
             prefix="ios-contact"
             clearable
             autofocus
             size="large" />
    </FormItem>
    <FormItem prop="password">
      <Input type="password"
             v-model="loginInfo.password"
             placeholder="密码"
             prefix="ios-lock"
             clearable
             size="large" />
      <a href="#">
        <p style="text-align: right;">忘记密码</p>
      </a>
    </FormItem>
    <!-- TODO 滑动验证 -->
    <FormItem>
      <Button type="primary"
              shape="circle"
              long
              ghost
              :loading="loading"
              @click="login('loginInfo')">
        <span v-if="!loading">登录</span>
        <span v-else>登录中...</span>
      </Button>
    </FormItem>
  </Form>
</template>
<script>
import * as types from './../store/mutationType.js'
export default {
  data () {
    return {
      loginInfo: {
        account: '',
        password: ''
      },
      ruleInline: {
        account: [
          { required: true, message: '请填写帐号.', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    login (refName) {
      if (this.loading) {
        return
      }
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$api.user.login(this.loginInfo)
            .then(res => {
              this.loading = false
              if (res.data.success) {
                if (res.data.data.token) {
                  // 登录成功
                  this.$Message.success(res.data.msg)
                  // 存储在本地的localStograge中，可以使用cookies/local/sessionStograge
                  this.$store.commit(types.LOGIN, res.data.data)
                  // 跳转至其他页面
                  setTimeout(() => {
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/')
                    this.$router.push({
                      path: redirect
                    })
                  }, 500)
                } else {
                  this.$Message.error(res.data.msg)
                }
              } else {
                // 登录失败
                this.$Message.error(res.data.msg)
              }
            }).catch(err => {
              this.loading = false
              this.$Message.error('登录出错!' + err.response.message)
            })
        } else {
          this.loading = false
          this.$Message.error('请正确输入帐号或密码!')
        }
      })
    }
  }
}
</script>

<style scoped>
.i-form {
  width: 300px;
  margin: 0 auto;
}
</style>
