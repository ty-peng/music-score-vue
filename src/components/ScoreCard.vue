<template>
  <Card class="card"
        :padding="0">
    <div class="thumbnail">
      <router-link :to="'/score/'+ score.id"
                   target="_blank">
        <img :src="score.img"
             :alt="score.title"
             @error="imgError">
      </router-link>
    </div>
    <div class="title"
         :title="title">
      <router-link :to="'/score/'+ score.id"
                   target="_blank">
        <h3>{{ title }}</h3>
      </router-link>
    </div>
    <div class="info">
      <span class="artist fl">
        <router-link :to="'/artist/'+ score.artist"
                     target="_blank">
          <Icon type="md-person" />
          {{ score.artist }}
        </router-link>
      </span>
      <router-link :to="'/details/'+ score.id"
                   target="_blank">
        <span class="date fr">
          <Icon type="md-time" />
          {{ date }}
        </span>
      </router-link>
    </div>
    <div class="info">
      <span class="type fl">
        <router-link :to="'/scores/'+ type"
                     target="_blank">
          <Icon type="ios-list-box-outline" />
          {{ typeName }}
        </router-link>
      </span>
      <router-link :to="'/score/'+ score.id"
                   target="_blank">
        <span class="collections fr">
          <Icon type="md-star-outline" />
          {{ score.collects ? score.collects : 0 }}
        </span>
        <span class="views fr">
          <Icon type="ios-eye-outline" />
          {{ score.views ? score.views : 0 }}
        </span>
      </router-link>
    </div>
  </Card>
</template>

<script>
import { TYPES, BACKTYPES } from '../enums/enums'
export default {
  name: 'ScoreCard',
  props: ['score'],
  data () {
    return {
    }
  },
  computed: {
    date () {
      let dateObj = new Date(Date.parse(this.score.uploadDatetime.replace(/-/g, '/')))
      let y = dateObj.getFullYear()
      let m = dateObj.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = dateObj.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    title () {
      return this.score.title + '-' + (this.score.artist ? this.score.artist : '')
    },
    type () {
      for (var key in BACKTYPES) {
        if (BACKTYPES.hasOwnProperty(key)) {
          if (BACKTYPES[key] === this.score.type) {
            return key
          }
        }
      }
    },
    typeName () {
      for (var key in TYPES) {
        if (TYPES.hasOwnProperty(key)) {
          if (key === this.type) {
            return TYPES[key] + '曲谱'
          }
        }
      }
    }
  },
  methods: {
    imgError (e) {
      this.score.img =
        'http://iph.href.lu/235x200?text=%20&fg=f8f8f9&bg=f8f8f9'
      e.target.onerror = null
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  padding-bottom 5px
  width 255px
  margin 10px 10px 10px 0
  border-radius 5px
  overflow hidden
  transition all 0.2s ease-out
  box-shadow 0 2px 43px -4px rgba(0, 0, 0, 0.19)
.card:hover
  box-shadow 0 2px 5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05)
  transform translateY(2px)
.thumbnail
  a
    display block
  img
    width 100%
.title
  padding 0 10px
  h3
    text-overflow ellipsis
    white-space nowrap
    overflow hidden
.info
  padding 5px 10px
  font-size 0.6rem
  line-height 1rem
  clear both
  .artist
    max-width 150px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
  .type
    max-width 110px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
  i
    font-size 1rem
    line-height 0.6rem
  span, a
    color #808695
  .collections
    margin-left 5px
</style>
