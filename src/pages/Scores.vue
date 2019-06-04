<template>
  <div class="scores">
    <nav>
      <span>切换乐器：</span>
      <Dropdown>
        <a href="javascript:void(0)">
          {{ typeName }}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <router-link :to="'/scores/' + item.key"
                       v-for="(item, index) in types"
                       :key="index">
            <DropdownItem>{{ item.value }}</DropdownItem>
          </router-link>
        </DropdownMenu>
      </Dropdown>
      <span class="cateToggle">
        <Button type="text"
                size="small"
                shape="circle"
                @click="handleClick('hot')">热门</Button>
        <Button type="text"
                size="small"
                shape="circle"
                @click="handleClick('recommend')">推荐</Button>
        <Button type="text"
                size="small"
                shape="circle"
                @click="handleClick('new')">最新</Button>
      </span>
    </nav>
    <router-view :scores="scores"></router-view>
    <Page :total="total"
          size="small"
          show-elevator
          show-sizer
          show-total
          align="center"
          :current="page"
          :page-size="limit"
          @on-change="changePage"
          @on-page-size-change="changePageSize" />
  </div>
</template>

<script>
import ScoresList from './../components/ScoresList'
import { TYPES, BACKTYPES } from '../enums/enums'
export default {
  components: {
    ScoresList
  },
  data () {
    return {
      theme: 'light',
      page: 1,
      limit: 10,
      scoresQo: {
        cate: 'hot',
        type: null,
        page: 1,
        offset: 0,
        limit: 10
      },
      scores: [{}],
      total: null
    }
  },
  computed: {
    type () {
      let type = this.$route.name
      return BACKTYPES[type] ? BACKTYPES[type] : 0
    },
    typeName () {
      return TYPES[this.$route.name] ? TYPES[this.$route.name] : '未知'
    },
    types () {
      let result = []
      for (var key in TYPES) {
        if (TYPES.hasOwnProperty(key)) {
          result.push({
            key: key,
            value: TYPES[key]
          })
        }
      }
      return result
    },
    allPages () {
      const allPage = Math.ceil(this.total / this.scoresQo.limit)
      return (allPage === 0) ? 1 : allPage
    }
  },
  watch: {
    typeName () {
      this.loadList()
    }
  },
  mounted () {
    this.scoresQo.type = this.type
    this.loadList('hot')
  },
  methods: {
    handleClick (cate) {
      this.page = this.scoresQo.page = 1
      this.limit = this.scoresQo.limit = 10
      this.loadList(cate)
    },
    loadList (cate) {
      if (cate) {
        this.scoresQo.cate = cate
      } else {
        this.scoresQo.cate = 'hot'
      }
      this.scoresQo.type = this.type
      this.$api.scores.loadList(this.scoresQo)
        .then(res => {
          if (res.data.success) {
            this.total = res.data.total
            this.scores = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        })
    },
    changePage (page) {
      const allPages = this.allPages
      if (page > allPages) {
        page = allPages
      }
      this.scoresQo.page = this.page = page
      // this.offset = (page - 1) * this.scoresQo.limit
      this.loadList(this.scoresQo.cate)
    },
    changePageSize (pageSize) {
      this.scoresQo.limit = this.limit = pageSize
      this.loadList(this.scoresQo.cate)
    }
  }
}
</script>

<style lang="stylus" scoped>
nav
  font-size 1rem
  padding 0 15px
.scores
  margin 20px auto
  width 1000px
  background white
  padding 30px 0
  border-radius 5px
.cateToggle
  margin-left 20px
</style>
