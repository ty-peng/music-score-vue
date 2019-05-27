<template>
  <li>
    <router-link :to="score.id ? '/details/' + score.id : '/404'"
                 target="_blank">
      <div class="l-img fl">
        <img :src="score.img">
      </div>
      <div class="r-text fl">
        <h3>{{(score.title ? score.title : '标题 ') + '-' + score.artist}}</h3>
        <p>
          <span>{{ score.artist }}</span>
          <span style="margin-left: 20px">
            <Icon type="ios-eye-outline"
                  style="font-size: 1.3rem" />
            {{ score.views ? score.views : 0 }}
          </span>
          <span>
            <Icon type="md-star-outline"
                  style="font-size: 1.2rem" />
            {{ score.collects ? score.collects : 0 }}
          </span>
          <span style="margin-left: 20px">
            <Icon type="md-time" />
            {{ score.uploadDatetime ? score.uploadDatetime : '2019-01-01 00:00:00' }}
          </span>
        </p>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['score']
}
</script>

<style lang="stylus" scoped>
li
  padding 10px 20px
li:hover
  background #fafafa url('http://www.tan8.com/static/yupu20160506/images/play.png') 850px center no-repeat
.l-img
  width 80px
  height 80px
  img
    width 80px
    height 80px
    display block
    border-radius 50%
.r-text
  width 850px
  height 80px
  margin-left 30px
  margin-top 10px
  h3
    font-size 1.25rem
    color #000
  p
    margin-top 15px
    font-size 0.95rem
    color #888
</style>
