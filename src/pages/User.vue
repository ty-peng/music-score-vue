<template>
  <main class="user">
    <Row>
      <!-- 头像、昵称、id、性别、上传数、收藏数 -->
      <i-col span="4"
             offset="1">
        <div class="avatar">
          <Avatar class="avatarImg"
                  icon="ios-person"
                  :src="userInfo.avatar ? userInfo.avatar : 'https://i.loli.net/2017/08/21/599a521472424.jpg'" />
        </div>
      </i-col>
      <i-col span="18">
        <div class="baseInfo">
          <p>
            <span>
              昵称：{{userInfo.nickName ? userInfo.nickName : '-'}}
            </span>
            <span>
              {{sex}}
            </span>
          </p>
          <p>
            <span>
              上传数：{{userInfo.uploads ? userInfo.uploads : 0}}
            </span>
            <span>
              收藏数：{{userInfo.collects ? userInfo.collects : 0}}
            </span>
          </p>
        </div>
      </i-col>
    </Row>
    <Divider />
    <Row>
      <i-col span="4">
        <Menu :theme="theme"
              width="auto"
              :active-name="activeName"
              style="height: 450px">
          <MenuItem v-for="(item, index) in nav"
                    :key="index"
                    :to="item.name"
                    :name="item.name">{{item.value}}</MenuItem>
        </Menu>
      </i-col>
      <i-col span="20">
        <router-view></router-view>
      </i-col>
    </Row>
  </main>
</template>

<script>
import { SEX } from '../enums/enums'
export default {
  data () {
    return {
      theme: 'light',
      activeName: 'info',
      nav: [
        { name: 'info', value: '个人信息' },
        { name: 'setting', value: '账号管理' },
        { name: 'collection', value: '我的收藏' },
        { name: 'uploads', value: '我的上传' }
      ],
      userInfo: {}
    }
  },
  computed: {
    sex () {
      return SEX[this.userInfo.sex] ? SEX[this.userInfo.sex] : '未知'
    }
  },
  watch: {
    $route (to, from) {
      this.activeName = to.name
    }
  },
  mounted () {
    this.$router.replace('/account/info')
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.user
  width 1200px
  padding 15px 30px
.avatar
  .avatarImg
    width 100px
    height 100px
.baseInfo
  padding 10px 0
  p
    margin 10px 0
    font-size 1rem
    span
      margin-right 30px
</style>
