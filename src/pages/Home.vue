<template>
  <main class="home"
        ref="content">
    <Row class="sec-carousel">
      <i-col span="20"
             offset="2">
        <Carousel autoplay
                  v-model="carousel"
                  loop
                  class="carousel">
          <CarouselItem class="carousel-item"
                        v-for="item in carousels"
                        :key="item.id">
            <router-link :to="item.target">
              <img class="pic"
                   :src="item.src">
            </router-link>
          </CarouselItem>
        </Carousel>
      </i-col>
    </Row>
    <HomeList :scores="hotList"
              :more="'/scores/hot'"
              class="list"><span slot="title">热门曲谱</span></HomeList>
    <HomeList :scores="newList"
              :more="'/scores/new'"
              class="list"><span slot="title">最新曲谱</span></HomeList>
  </main>
</template>

<script>

import HomeList from './../components/HomeList'

export default {
  name: 'home',
  data () {
    return {
      carousel: 0,
      carousels: [
        { id: 1, src: '/static/img/c1.jpg', target: '' },
        { id: 2, src: '/static/img/c2.jpg', target: '' },
        { id: 3, src: '/static/img/c3.jpg', target: '' }
      ],
      scoresQo: {
        limit: 12,
        offset: 0
      },
      newList: [],
      hotList: []
    }
  },
  created () {
    this.$Loading.start()
    if (!localStorage.token) {
      localStorage.token = ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$api.home.hotList(this.scoresQo)
        .then(res => {
          if (!res.data.success) {
            this.$Message.error(res.data.msg)
            return
          }
          this.hotList = res.data.data
        })
      this.$api.home.newList(this.scoresQo)
        .then(res => {
          if (!res.data.success) {
            this.$Message.error(res.data.msg)
            return
          }
          this.newList = res.data.data
        })
      this.$Loading.finish()
    }
  },
  components: {
    HomeList
  }
}
</script>

<style lang="stylus" scoped>
.carousel
  width 100%
  height 0
  padding-bottom 35%
  overflow hidden
  border-radius 5px
  .carousel-item
    .pic
      width 100%
</style>
