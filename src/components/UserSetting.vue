<template>
  <div class="userSetting">
    <Form ref="phoneSetting"
          :model="phoneSetting"
          :rules="phoneSettingRule"
          :label-width="80"
          class="form">
      <FormItem label="用户密码"
                prop="password">
        <Input type="password"
               clearable
               style="width: 280px"
               v-model="phoneSetting.password"
               placeholder="请输入原密码" />
      </FormItem>
      <FormItem label="原手机号"
                prop="phone">
        <Input type="tel"
               clearable
               v-model="phoneSetting.phone"
               placeholder="请输入原手机号" />
      </FormItem>
      <FormItem label="新手机号"
                prop="newPhone">
        <Input type="tel"
               clearable
               v-model="phoneSetting.newPhone"
               placeholder="请输入新手机号" />
      </FormItem>
      <FormItem>
        <Button type="primary"
                size="large"
                style="width: 100px"
                :loading="loading"
                @click="updateUserSetting('phoneSetting')">修改</Button>
      </FormItem>
    </Form>
    <Divider />
    <Form ref="emailSetting"
          :model="emailSetting"
          :rules="emailSettingRule"
          :label-width="80"
          class="form">
      <FormItem label="用户密码"
                prop="password">
        <Input type="password"
               clearable
               style="width: 280px"
               v-model="emailSetting.password"
               placeholder="请输入原密码" />
      </FormItem>
      <FormItem label="原邮箱"
                prop="email">
        <Input type="email"
               clearable
               v-model="emailSetting.email"
               placeholder="请输入原邮箱" />
      </FormItem>
      <FormItem label="新邮箱"
                prop="newEmail">
        <Input type="email"
               clearable
               v-model="emailSetting.newEmail"
               placeholder="请输入新邮箱" />
      </FormItem>
      <FormItem>
        <Button type="primary"
                size="large"
                style="width: 100px"
                :loading="loading"
                @click="updateUserSetting('emailSetting')">修改</Button>
      </FormItem>
    </Form>
    <Divider />
    <Form ref="passwordSetting"
          :model="passwordSetting"
          :rules="passwordSettingRule"
          :label-width="80"
          class="form">
      <FormItem label="原密码"
                prop="password">
        <Input type="password"
               clearable
               style="width: 280px"
               v-model="passwordSetting.password"
               placeholder="请输入原密码" />
      </FormItem>
      <FormItem label="新密码"
                prop="newPassword">
        <Poptip trigger="focus"
                class="poptip">
          <Input type="password"
                 clearable
                 style="width: 280px"
                 v-model="passwordSetting.newPassword"
                 placeholder="请输入新密码（6~16位）" />
          <div slot="content">
            <p>密码6~16位，至少包含1个字母和1个数字<br />
              可包含特殊字符：!@#$%^&amp;*?,.<br />
              例如：asgAsGasg.1956153</p>
          </div>
        </Poptip>
      </FormItem>
      <FormItem label="确认密码"
                prop="repeatPassword">
        <Input type="password"
               clearable
               v-model="passwordSetting.repeatPassword"
               placeholder="请重新输入新密码" />
      </FormItem>
      <FormItem>
        <Button type="primary"
                size="large"
                style="width: 100px"
                :loading="loading"
                @click="updateUserSetting('passwordSetting')">修改</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { UPDATE_TYPE } from '../enums/enums'
export default {
  data () {
    /* 表单验证 */
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!/^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z]{1,})(?=[!@#$%^&*?,.]*).*$/.test(value)) {
        callback(new Error('密码格式不正确'))
      } else {
        if (this.userSettingInfo.passwordCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.userSettingInfo.validateField('passwordCheck')
        }
        callback()
      }
    }
    const validateRepeatPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.userSettingInfo.password) {
        callback(new Error('两次输入的密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        // return callback(new Error('手机号不能为空'))
        return callback()
      } else if (!/^1[34578]\d{9}$/.test(value)) {
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
        // return callback(new Error('邮箱不能为空'))
        return callback()
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
      loading: false,
      phoneSetting: {
        id: this.userId,
        password: '',
        phone: '',
        newPhone: ''
      },
      emailSetting: {
        id: this.userId,
        password: '',
        email: '',
        newEmail: ''
      },
      passwordSetting: {
        id: this.userId,
        password: '',
        repeatPassword: '',
        newPassword: ''
      },
      phoneSettingRule: {
        password: [
          { required: true, type: 'string', message: '请输入密码', trigger: 'blur' }
        ],
        phone: [
          { required: true, pattern: '^1[34578][0-9]{9}$', message: '请正确输入手机号', trigger: 'blur' }
        ],
        newPhone: [
          { required: true, message: '请输入新手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      emailSettingRule: {
        password: [
          { required: true, type: 'string', message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: '请正确输入邮箱地址', trigger: 'blur' }
        ],
        newEmail: [
          { required: true, type: 'email', message: '请正确输入邮箱地址', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      passwordSettingRule: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        repeatPassword: [
          { required: true, validator: validateRepeatPass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    userId () {
      return this.$store.state.userInfo.id
    }
  },
  methods: {
    updateUserSetting (refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.loading = true
          let updatedUserSetting = {}
          switch (refName) {
            case 'phoneSetting':
              updatedUserSetting = this.phoneSetting
              break
            case 'emailSetting':
              updatedUserSetting = this.emailSetting
              break
            case 'passwordSetting':
              updatedUserSetting = this.passwordSetting
              break
            default:
              updatedUserSetting = null
              break
          }
          updatedUserSetting.updateType = UPDATE_TYPE['userSetting']
          this.$api.user.updateUser(updatedUserSetting)
            .then(res => {
              this.loading = false
              if (res.data.success) {
                this.$Message.success('修改成功')
                this.$refs[refName].resetFields()
              } else {
                this.$Message.error(res.data.msg)
              }
            }).catch(err => {
              this.loading = false
              this.$Message.error('修改出错!' + err.response.message)
            })
        } else {
          this.$Message.error('请正确填写用户信息!')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.userSetting
  margin 10px 20px
.form
  width 360px
  margin 0 auto
</style>
