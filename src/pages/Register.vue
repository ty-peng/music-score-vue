<template>
  <div class="register">
    <main class="content"
          ref="content">
      <Card class="register-card"
            :bordered="false">
        <Form ref="registerInfo"
              :model="registerInfo"
              :rules="registerRule"
              :label-width="80"
              class="form">
          <FormItem label="用户名"
                    prop="account">
            <Poptip trigger="focus"
                    class="poptip">
              <Input type="text"
                     clearable
                     style="width: 280px"
                     v-model="registerInfo.account"
                     placeholder="请输入用户名" />
              <div slot="content">
                <p>由字母a～z(不区分大小写)、数字0～9、减号或下划线组成，长度为4~16个字符，<br />只能以字母开头，可包含字母、数字、减号和下划线，不能以减号或下划线结尾，<br />例如：example-01</p>
              </div>
            </Poptip>
          </FormItem>
          <FormItem label="手机"
                    prop="phone">
            <Input type="tel"
                   clearable
                   v-model="registerInfo.phone"
                   placeholder="请输入手机号" />
          </FormItem>
          <FormItem label="邮箱"
                    prop="email">
            <Input type="email"
                   clearable
                   v-model="registerInfo.email"
                   placeholder="请输入邮箱" />
          </FormItem>
          <FormItem label="昵称"
                    prop="name">
            <Input type="text"
                   clearable
                   v-model="registerInfo.name"
                   placeholder="请输入昵称" />
          </FormItem>
          <FormItem label="密码"
                    prop="password">
            <Poptip trigger="focus"
                    class="poptip">
              <Input type="password"
                     clearable
                     style="width: 280px"
                     v-model="registerInfo.password"
                     placeholder="请输入密码（6~16位）" />
              <div slot="content">
                <p>密码6~16位，至少包含1个字母和1个数字<br />
                  可包含特殊字符：!@#$%^&amp;*?,.<br />
                  例如：asgAsGasg.1956153</p>
              </div>
            </Poptip>
          </FormItem>
          <FormItem label="确认密码"
                    prop="passwordCheck">
            <Input type="password"
                   clearable
                   v-model="registerInfo.passwordCheck"
                   placeholder="请重新输入密码" />
          </FormItem>
          <FormItem>
            <Button type="primary"
                    size="large"
                    style="width: 100px"
                    :loading="loading"
                    @click="register('registerInfo')">注册</Button>
            <Button size="large"
                    @click="handleReset('registerInfo')"
                    style="margin-left: 8px">清空</Button>
          </FormItem>
        </Form>
        <router-link to="/login">
          <p align="center">已有账号？立即登录</p>
        </router-link>
      </Card>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    /* 表单验证 */
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!/^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z]{1,})(?=[!@#$%^&*?,.]*).*$/.test(value)) {
        callback(new Error('密码格式不正确'))
      } else {
        if (this.registerInfo.passwordCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.registerInfo.validateField('passwordCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.registerInfo.password) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback()
      }
    }
    const validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      /*
       * 由字母a～z(不区分大小写)、数字0～9、减号或下划线组成，长度为4~16个字符
       * 只能以字母开头，可包含字母、数字、减号和下划线，不能以减号或下划线结尾
       * 例如：example-01
       */
      if (!/^[a-zA-Z][a-zA-Z0-9_-]{2,14}[a-zA-Z0-9]$/.test(value)) {
        return callback(new Error('用户名格式不正确'))
      }
      this.$api.user.checkAccount({ account: value, type: 'account' })
        .then(res => {
          if (res.data.data.exist) {
            callback(new Error(res.data.data.msg))
          } else {
            callback()
          }
        })
    }
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不正确'))
      }
      this.$api.user.checkAccount({ account: value, type: 'phone' })
        .then(res => {
          if (res.data.data.exist) {
            callback(new Error(res.data.data.msg))
          } else {
            callback()
          }
        })
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      this.$api.user.checkAccount({ account: value, type: 'email' })
        .then(res => {
          if (res.data.data.exist) {
            callback(new Error(res.data.data.msg))
          } else {
            callback()
          }
        })
    }
    return {
      type: '',
      loading: false,
      registerInfo: {
        account: '',
        phone: null,
        email: '',
        password: '',
        passwordCheck: ''
      },
      registerRule: {
        account: [
          { required: true, validator: validateAccount, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        name: [
          { required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        passwordCheck: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register (refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$api.user.register(this.registerInfo)
            .then(res => {
              this.loading = false
              if (res.data.success) {
                // 注册成功
                this.$Message.success('注册成功')
                this.handleReset('registerInfo')
                // 跳转至登录页面
                setTimeout(() => {
                  this.$router.push('/login')
                }, 500)
              } else {
                this.$Message.error(res.data.msg)
              }
            }).catch(err => {
              this.loading = false
              this.$Message.error('注册出错!' + err.response.message)
            })
        } else {
          this.$Message.error('请正确填写注册信息!')
        }
      })
    },
    handleReset (refName) {
      this.$refs[refName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
.register-card
  width 500px
  margin 60px auto
  padding 10px
  box-shadow 0 2px 43px -4px rgba(0, 0, 0, 0.19)
.form
  width 360px
  margin 0 auto
</style>
