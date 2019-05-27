<template>
  <main class="search">
    <div class="sec-1">
      <h2>“{{ keywords }}” 的搜索结果</h2>
    </div>
    <div class="sec-2 clearfix">
      <ScoresList :scores="scores"></ScoresList>
      <Page :total="total"
            size="small"
            show-elevator
            show-sizer
            show-total
            align="center"
            :current="scoresQo.page"
            :page-size="scoresQo.limit"
            @on-change="changePage"
            @on-page-size-change="changePageSize" />
    </div>
  </main>
</template>

<script>
import ScoresList from './../components/ScoresList'
import { SEARCH_TYPES } from '../enums/enums'
export default {
  components: {
    ScoresList
  },
  data () {
    return {
      scoresQo: {
        kw: null,
        cate: 'hot',
        searchType: null,
        page: 1,
        offset: 0,
        limit: 10
      },
      scores: [{}],
      total: null
    }
  },
  computed: {
    keywords () {
      return this.$route.query.kw
    },
    searchType () {
      return this.transType(this.$route.query.type)
    },
    allPages () {
      const allPage = Math.ceil(this.total / this.scoresQo.limit)
      return (allPage === 0) ? 1 : allPage
    }
  },
  created () {
    this.$Loading.start()
  },
  mounted () {
    this.searchScores()
  },
  watch: {
    $route (to, from) {
      this.$Loading.start()
      this.searchScores()
    }
  },
  methods: {
    searchScores (cate) {
      if (cate) {
        this.scoresQo.cate = cate
      } else {
        this.scoresQo.cate = 'hot'
      }
      this.scoresQo.kw = this.keywords
      this.scoresQo.searchType = this.searchType
      this.$api.scores.loadList(this.scoresQo)
        .then(res => {
          if (res.data.success) {
            this.$Loading.finish()
            this.total = res.data.total
            this.scores = res.data.data
          } else {
            this.$Loading.error()
            this.$Message.error(res.data.msg)
          }
        })
    },
    transType (searchType) {
      return SEARCH_TYPES[searchType] ? SEARCH_TYPES[searchType] : null
    },
    changePage (page) {
      const allPages = this.allPages
      if (page > allPages) {
        page = allPages
      }
      this.scoresQo.page = page
      this.scoresQo.offset = (page - 1) * this.scoresQo.limit
      this.searchScores()
    },
    changePageSize (pageSize) {
      this.scoresQo.limit = pageSize
      this.searchScores()
    }
  }
}
</script>

<style lang="stylus" scoped>
.search
  width 1200px
  margin 20px auto
  padding 20px 80px
</style>
