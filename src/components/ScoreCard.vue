<template>
  <Card class="card"
        :padding="0">
    <div class="thumbnail"
         slot="title">
      <router-link :to="'/score/'+ score.id"
                   target="_blank">
        <img :src="score.thumbnail"
             :alt="score.title"
             @error="imgError">
      </router-link>
    </div>
    <div class="title">
      <router-link :to="'/score/'+ score.id"
                   target="_blank">
        <h2>{{ title }}</h2>
      </router-link>
    </div>
    <div class="info">
      <span class="type fl">
        <router-link :to="'/scores/'+ type"
                     target="_blank">
          <Icon type="ios-list-box-outline" />
          {{ score.typeName }}
        </router-link>
      </span>
      <router-link :to="'/score/'+ score.id"
                   target="_blank">
        <span class="collections fr">
          <Icon type="md-star-outline" />
          {{ score.collections ? score.collections : 0 }}
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
export default {
  name: 'ScoreCard',
  props: ['score'],
  data () {
    return {
    }
  },
  computed: {
    title () {
      return this.score.title + ' ' + (this.score.author ? this.score.author : '')
    },
    type () {
      switch (this.score.type) {
        case 1:
          return 'piano'
        case 2:
          return 'guitar'
        case 3:
          return 'ukulele'
        default:
          return 'all'
      }
    }
  },
  methods: {
    imgError (e) {
      this.score.thumbnail =
        'http://iph.href.lu/235x200?text=%20&fg=f8f8f9&bg=f8f8f9'
      e.target.onerror = null
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  width 255px
  margin 10px 10px 10px 0
  border-radius 10px
  overflow hidden
  box-shadow 0 0 15px rgba(0, 0, 0, 0.2)
.card:hover
  box-shadow 0 0 20px rgba(0, 0, 0, 0.5)
.thumbnail
  a
    display block
  img
    width 100%
.title
  padding 0 10px
  h2
    text-overflow ellipsis
    white-space nowrap
    overflow hidden
.info
  padding 5px 10px
  border-top 1px dashed #e8eaec
  .type
    max-width 110px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
</style>
