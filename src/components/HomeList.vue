<template>
  <section>
    <h1 align="center"
        class="sec-title">
      <slot name="title"></slot>
    </h1>
    <Row>
      <i-col span="20"
             offset="2">
        <Row v-for="(scoreArr, index) in scoreArrs"
             :key="index"
             :gutter="10">
          <i-col v-for="(score, index) in scoreArr"
                 :key="index"
                 span="6">
            <ScoreCard :score="score"></ScoreCard>
          </i-col>
        </Row>
      </i-col>
    </Row>
    <Row>
      <i-col span="1"
             offset="21">
        <router-link :to="more">
          <p class="more">更多 &gt;</p>
        </router-link>
      </i-col>
    </Row>

  </section>
</template>

<script>
import ScoreCard from '../components/ScoreCard'
export default {
  props: ['scores', 'more'],
  components: {
    ScoreCard
  },
  data () {
    return {
    }
  },
  computed: {
    scoreArrs () {
      let scoreArrs = []
      for (let i = 0, len = this.scores.length; i < len; i += 4) {
        scoreArrs.push(this.scores.slice(i, i + 4))
      }
      return scoreArrs
    }
  }
}
</script>

<style lang="stylus" scoped>
.sec-title
  margin-top 50px
  color #cc3333
.more
  margin 10px 0
</style>
