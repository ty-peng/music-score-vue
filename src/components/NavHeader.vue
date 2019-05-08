<template>
  <header class="header">
    <div class="logo fl">
      <h1>
        <router-link to="/">
          <span><img src="./../assets/logo.png"
                 class="icon" /></span>
          <span>有谱</span>
        </router-link>
      </h1>
    </div>
    <div class="rec fl">
      <router-link to="/scores/hot"><span>热门</span></router-link>
      <router-link to="/scores/recommend"><span>推荐</span></router-link>
      <router-link to="/scores/new"><span>最新</span></router-link>
    </div>
    <div class="me fr">
      <div v-if="isLogin">
        <router-link :to="userUrl">
          <Avatar style="background-color: #87d068;margin-left: 5px"
                  icon="ios-person"
                  :src="user.avatar" />
        </router-link>
        <Dropdown>
          <a href="javascript:void(0)">
            <h3>{{user.name}}
              <Icon type="ios-arrow-down"></Icon>
            </h3>
          </a>
          <DropdownMenu slot="list">
            <router-link :to="userUrl">
              <DropdownItem>
                <Icon type="md-person"
                      size="15" />&nbsp;个人中心</DropdownItem>
            </router-link>
            <router-link to="/collection">
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
    <Menu mode="horizontal"
          :theme="theme"
          active-name="1"
          class="menu fr">
      <MenuItem name="1"
                to="/tutorial">
      教程
      </MenuItem>
      <MenuItem name="2"
                to="/video">
      视频
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-musical-notes" />
          曲谱库
        </template>
        <MenuItem name="3-1"
                  to="/scores/piano">钢琴</MenuItem>
        <MenuItem name="3-2"
                  to="/scores/guitar">吉他</MenuItem>
        <MenuItem name="3-3"
                  to="/scores/ukulele">尤克里里</MenuItem>
        <MenuItem name="3-4"
                  to="/scores/all">其他</MenuItem>
      </Submenu>
    </Menu>
    <div class="search fr">
      <i-input search
               placeholder="请输入搜索内容"
               size="large"
               v-model="searchText"
               @on-search="search"
               style="width: 350px">
        <Select v-model="searchType"
                slot="prepend"
                style="width: 80px; background-color: rgba(253,252, 256,0.5)">
          <Option v-for="(item, key) in searchTypes"
                  :value="item.value"
                  :key="key">{{item.msg}}</Option>
        </Select>
      </i-input>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavHeader',
  data () {
    return {
      user: {
        account: 'test',
        name: '测试用户',
        avatar: ''
      },
      theme: 'light',
      searchType: '',
      searchTypes: [
        { value: 'piano', msg: '钢琴' },
        { value: 'guitar', msg: '吉他' },
        { value: 'ukulele', msg: '尤克里里' },
        { value: 'user', msg: '用户' }
      ],
      isLogin: false, // TODO 状态、登录处理
      displayMenu: false,
      searchText: ''
    }
  },
  computed: {
    userUrl () {
      return '/user/' + this.user.account
    }
  },
  methods: {
    toggleMenu () {
      this.displayMenu = !this.displayMenu
    },
    hideMenu () {
      this.displayMenu = false
    },
    search () {
      this.displayMenu = false
      if (this.searchText) {
        this.$router.push({
          name: 'search',
          query: {
            kw: this.searchText
          }
        })
        this.searchText = ''
      }
    },
    logout () {
      this.$Message.success('退出成功！')
    }
  },
  mounted () {
    this.searchType = this.searchTypes[0].value
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
  margin-top 1em
  margin-right 1em
.header
  position fixed
  z-index 1
  top 0
  width 100%
  height 60px
  line-height 60px
  border-bottom 1px solid #e8eaec
  background-color #fff
  padding 0 5em
.width-limit
  width 1200px
  margin 0 auto
.cates
  .cates-item
    display inline-block
    margin-left 20px
.rec
  margin 0 2em
  span
    margin-left 1em
.upload
  margin 0 10px
</style>
