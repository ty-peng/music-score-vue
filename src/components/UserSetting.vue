<template>
  <div class="userSetting">
    <Form ref="phoneInfo"
          :model="userSettingInfo"
          :rules="userSettingRule"
          :label-width="80"
          class="form">
      <FormItem label="原手机号"
                prop="phone">
        <Input type="tel"
               clearable
               v-model="userSettingInfo.phone"
               placeholder="请输入手机号" />
      </FormItem>
      <FormItem label="修改手机"
                prop="phone">
        <Input type="tel"
               clearable
               v-model="userSettingInfo.phone"
               placeholder="请输入手机号" />
      </FormItem>
      <FormItem>
        <Button type="primary"
                size="large"
                style="width: 100px"
                :loading="loading"
                @click="updateUserInfo('phoneInfo')">修改</Button>
      </FormItem>
    </Form>
    <Divider />
    <Form ref="emailInfo"
          :model="userSettingInfo"
          :rules="userSettingRule"
          :label-width="80"
          class="form">
      <FormItem label="原邮箱"
                prop="email">
        <Input type="email"
               clearable
               v-model="userSettingInfo.email"
               placeholder="请输入邮箱" />
      </FormItem>
      <FormItem label="修改邮箱"
                prop="email">
        <Input type="email"
               clearable
               v-model="userSettingInfo.email"
               placeholder="请输入邮箱" />
      </FormItem>
      <FormItem>
        <Button type="primary"
                size="large"
                style="width: 100px"
                :loading="loading"
                @click="updateUserInfo('emailInfo')">修改</Button>
      </FormItem>
    </Form>
    <Divider />
    <Form ref="passwordInfo"
          :model="userSettingInfo"
          :rules="userSettingRule"
          :label-width="80"
          class="form">
      <FormItem label="原密码"
                prop="password">
        <Poptip trigger="focus"
                class="poptip">
          <Input type="password"
                 clearable
                 style="width: 280px"
                 v-model="userSettingInfo.password"
                 placeholder="请输入密码（6~16位）" />
          <div slot="content">
            <p>密码6~16位，至少包含1个字母和1个数字<br />
              可包含特殊字符：!@#$%^&amp;*?,.<br />
              例如：asgAsGasg.1956153</p>
          </div>
        </Poptip>
      </FormItem>
      <FormItem label="密码"
                prop="password">
        <Poptip trigger="focus"
                class="poptip">
          <Input type="password"
                 clearable
                 style="width: 280px"
                 v-model="userSettingInfo.password"
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
               v-model="userSettingInfo.passwordCheck"
               placeholder="请重新输入密码" />
      </FormItem>
      <FormItem>
        <Button type="primary"
                size="large"
                style="width: 100px"
                :loading="loading"
                @click="updateUserInfo('passwordInfo')">修改</Button>
      </FormItem>
    </Form>
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
        if (this.userSettingInfo.passwordCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.userSettingInfo.validateField('passwordCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.userSettingInfo.password) {
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
      userSettingInfo: {
        phone: '',
        email: '',
        password: ''
      },
      userSettingRule: {
        account: [
          { required: true, validator: validateAccount, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
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
    updateUserSetting () {

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
