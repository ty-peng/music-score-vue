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
                @click="loadList('hot')">热门</Button>
        <Button type="text"
                size="small"
                shape="circle"
                @click="loadList('recommend')">推荐</Button>
        <Button type="text"
                size="small"
                shape="circle"
                @click="loadList('new')">最新</Button>
      </span>
    </nav>
    <router-view :scores="scores"></router-view>
    <Page :total="100"
          size="small"
          show-elevator
          show-sizer
          show-total
          align="center" />
  </div>
</template>

<script>
import ScoresList from './../components/ScoresList'
import { TYPES } from '../enums/enums'
export default {
  components: {
    ScoresList
  },
  data () {
    return {
      theme: 'light',
      scoresQo: {
        cate: 'hot',
        type: this.type,
        limit: 10,
        offset: 0
      },
      scores: [{ aaa: 'aaa' }]
    }
  },
  computed: {
    type () {
      let type = this.$route.path
      return type.substring(type.lastIndexOf('/') + 1, type.length)
    },
    typeName () {
      return TYPES[this.type]
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
    }
  },
  mounted () {
    this.loadList('hot')
    if (this.$route.params.cate) {
      console.log(this.$route.params.cate)
    }
  },
  methods: {
    loadList (cate) {
      this.scoresQo.cate = cate
      this.$api.scores.loadList(this.scoresQo)
        .then(res => {
          if (res.data.success) {
            this.scores = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        })
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
