<template>
  <header class="header">
    <Menu mode="horizontal"
          :theme="theme"
          class="menu">
      <div class="logo fl">
        <h1>
          <router-link to="/">
            <span><img src="./../assets/logo.png"
                   class="icon" /></span>
            <span>有谱</span>
          </router-link>
        </h1>
      </div>
      <div class="rec fl"
           v-if="this.$route.path === '/'">
        <a href="#hot"><span>热门</span></a>
        <a href="#new"><span>最新</span></a>
      </div>
      <div class="me fr">
        <div v-if="isLogin">
          <router-link to="/account/info">
            <Avatar style="background-color: #87d068;margin-left: 5px"
                    icon="ios-person"
                    :src="user.avatar ? user.avatar : ''" />
          </router-link>
          <Dropdown>
            <a href="javascript:void(0)">
              <h3>{{user.nickname ? user.nickname : ' '}}
                <Icon type="ios-arrow-down"></Icon>
              </h3>
            </a>
            <DropdownMenu slot="list">
              <router-link to="/account/info">
                <DropdownItem>
                  <Icon type="md-person"
                        size="15" />&nbsp;个人中心</DropdownItem>
              </router-link>
              <router-link to="/account/collection">
                <DropdownItem>
                  <Icon type="ios-star-outline"
                        size="15" />&nbsp;我的收藏
                </DropdownItem>
              </router-link>
              <DropdownItem divided>
                <Button type="warning"
                        @click="logout">退出登录</Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div v-else>
          <router-link to="/login">
            <h3>登录/注册
              <Avatar style="background-color: #87d068;margin-left: 5px"
                      icon="ios-person" />
            </h3>
          </router-link>
        </div>
      </div>
      <div class="upload fr">
        <Dropdown trigger="click">
          <a href="javascript:void(0)">
            <Icon type="md-add"
                  size="20" />
          </a>
          <DropdownMenu slot="list">
            <router-link to="/upload">
              <DropdownItem>上传曲谱</DropdownItem>
            </router-link>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div class="search fr">
        <i-input search
                 placeholder="请输入搜索内容"
                 size="large"
                 v-model="searchText"
                 @on-search="search">
          <Select v-model="searchType"
                  slot="prepend"
                  style="width: 60px">
            <Option v-for="(item, key) in searchTypes"
                    :value="item.value"
                    :key="key">{{item.msg}}</Option>
            <!-- <Option value="user">用户</Option> -->
          </Select>
        </i-input>
      </div>
      <div class="fr">
        <a target="_blank"
           href="https://www.musicbody.net/music-course-list.html">
          <MenuItem name="1">
          教程
          </MenuItem>
        </a>
        <a target="_blank"
           href="http://www.tan8.com/club-1-1-1-1-0.html">
          <MenuItem name="2">
          视频
          </MenuItem>
        </a>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-musical-notes" />
            曲谱库
          </template>
          <MenuItem :name="'3-' + index"
                    :to="'/scores/' + item.value"
                    v-for="(item, index) in scoresTypes"
                    :key="index">{{item.msg}}</MenuItem>
        </Submenu>
      </div>
    </Menu>
  </header>
</template>

<script>
import * as mutationTypes from '../store/mutationType'
import { TYPES } from '../enums/enums'
export default {
  name: 'NavHeader',
  data () {
    return {
      theme: 'light',
      searchType: '',
      searchText: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.userInfo ? this.$store.state.userInfo : {}
    },
    isLogin () {
      return this.$store.getters.isLogin
    },
    scoresTypes () {
      let result = []
      for (var key in TYPES) {
        if (TYPES.hasOwnProperty(key)) {
          result.push({
            value: key,
            msg: TYPES[key]
          })
        }
      }
      return result
    },
    searchTypes () {
      return this.scoresTypes
    }
  },
  mounted () {
    this.searchType = this.searchTypes[0].value
  },
  methods: {
    search () {
      if (this.searchText) {
        this.$router.push({
          name: 'search',
          query: {
            kw: this.searchText,
            type: this.searchType
          }
        })
        this.searchText = ''
      }
    },
    logout () {
      this.$store.commit(mutationTypes.LOGOUT)
      this.$Message.success('退出成功！')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.logo
  line-height 60px
.icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow hidden
.search
  margin-top 10px
  margin-right 1em
.header
  position fixed
  z-index 999 // 尽可能大保持最外层
  top 0
  left 0
  width 100%
  height 60px
  line-height 60px
  border-bottom 1px solid #e8eaec
  background-color #fff
.menu
  padding 0 5em
.cates
  .cates-item
    display inline-block
    margin-left 20px
.rec
  margin 0 2em
  span
    margin-left 1em
    color #2db7f5
.upload
  margin 0 10px
</style>
