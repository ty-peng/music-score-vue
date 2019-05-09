<template>
  <section>
    <h1 align="center"
        class="sec-title">
      <slot name="title"></slot>
    </h1>
    <Row>
      <i-col span="20"
             offset="2">
        <Row type="flex"
             justify="space-between">
          <i-col v-for="(item, index) in scores"
                 :key="'post-'+index">
            <PostCard :postData="item"></PostCard>
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
import PostCard from './../components/PostCard.vue'
export default {
  props: ['scores', 'more'],
  components: {
    PostCard
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
