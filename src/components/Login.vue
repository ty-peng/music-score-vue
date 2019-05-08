<template>
  <Form ref="loginInfo"
        :model="loginInfo"
        :rules="ruleInline"
        class="i-form"
        @keyup.enter.native="login('loginInfo')">
    <h1 style="text-align: center; margin-bottom: 20px">用户登录</h1>
    <FormItem prop="user">
      <Input type="text"
             v-model="loginInfo.user"
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
export default {
  data () {
    return {
      loginInfo: {
        user: '',
        password: '',
        verifyCode: ''
      },
      ruleInline: {
        user: [
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
    login (loginInfo) {
      if (this.loading) {
        return
      }
      this.loading = true
      this.$refs[loginInfo].validate((valid) => {
        if (valid) {
          this.$http.post(
            '/api/login',
            this.loginInfo
          ).then(res => {
            this.loading = false
            if (res.data.status === 200) {
              // 登录成功
              this.$Message.success(res.data.msg)
              setTimeout(() => {
                // TODO 跳转页面
                this.$router.push('/')
              }, 1000)
            } else {
              // 登陆失败
              this.$Message.error(res.data.msg)
              this.verifyShow = true
            }
          }).catch(err => {
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
