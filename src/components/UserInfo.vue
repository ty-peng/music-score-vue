<template>
  <div class="userInfo">
    <Form ref="userInfo"
          :model="userInfo"
          :rules="userInfoRule"
          :label-width="80"
          label-position="right"
          class="form"
          v-if="isEdit">
      <FormItem label="用户名："
                prop="account">
        {{userInfo.account}}
      </FormItem>
      <FormItem label="昵称："
                prop="nickName">
        <Input type="text"
               clearable
               v-model="userInfo.nickName"
               placeholder="请输入昵称"
               @on-change="handleChange('nickName')" />
      </FormItem>
      <FormItem label="性别：">
        <RadioGroup v-model="userInfo.sex"
                    @on-change="handleChange('sex')">
          <Radio :label="1">男</Radio>
          <Radio :label="0">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="区域："
                prop="area">
        <Input type="text"
               clearable
               v-model="userInfo.area"
               placeholder="请输入区域"
               @on-change="handleChange('area')" />
      </FormItem>
      <FormItem label="描述："
                prop="desc">
        <Input type="textarea"
               clearable
               v-model="userInfo.desc"
               placeholder="请输入描述"
               @on-change="handleChange('desc')" />
      </FormItem>
      <FormItem>
        <Button type="primary"
                size="large"
                style="width: 100px"
                :loading="loading"
                @click="updateUserInfo('userInfo')">完成</Button>
      </FormItem>
    </Form>
    <Form ref="userInfo"
          :model="userInfo"
          :rules="userInfoRule"
          :label-width="80"
          label-position="right"
          class="form"
          v-else>
      <FormItem label="用户名："
                prop="account">
        {{userInfo.account}}
      </FormItem>
      <FormItem label="昵称："
                prop="nickName">
        {{userInfo.nickName}}
      </FormItem>
      <FormItem label="性别：">
        {{sex}}
      </FormItem>
      <FormItem label="区域："
                prop="area">
        {{userInfo.area}}
      </FormItem>
      <FormItem label="描述："
                prop="desc">
        {{userInfo.desc}}
      </FormItem>
      <FormItem>
        <Button type="primary"
                size="large"
                style="width: 100px"
                @click="edit">编辑</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import * as types from './../store/mutationType.js'
import { SEX, UPDATE_TYPE } from './../enums/enums'
export default {
  data () {
    return {
      isEdit: false,
      loading: false,
      userInfoRule: {
        nickName: [
          { type: 'string', message: '请输入昵称', trigger: 'blur' }
        ]
      },
      userInfo: {
      },
      updatedUserInfo: {
      }
    }
  },
  computed: {
    sex () {
      return SEX[this.userInfo.sex]
    }
  },
  mounted () {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo () {
      this.$api.user.loadUserInfo(this.$store.state.userInfo.id)
        .then(res => {
          if (res.data.success) {
            this.userInfo = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        })
    },
    edit () {
      this.isEdit = true
    },
    updateUserInfo (refName) {
      if (Object.keys(this.updatedUserInfo).length !== 0) {
        this.$refs[refName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.updatedUserInfo.id = this.userInfo.id
            this.updatedUserInfo.updateType = UPDATE_TYPE['userInfo']
            this.$api.user.updateUser(this.updatedUserInfo)
              .then(res => {
                this.loading = false
                if (res.data.success) {
                  this.$Message.success('修改成功')
                  this.isEdit = false
                  this.$store.commit(types.UPDATE_USER, res.data.data)
                  this.userInfo = res.data.data
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
      } else {
        this.isEdit = false
      }
    },
    handleChange (param) {
      this.updatedUserInfo[param] = this.userInfo[param]
    }
  }
}
</script>

<style lang="stylus" scoped>
.userInfo
  margin 10px 20px
.form
  width 360px
  margin 0 auto
</style>
