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
              :more="'/scores/hot'"><span slot="title">热门曲谱</span></HomeList>
    <HomeList :scores="newList"
              :more="'/scores/new'"><span slot="title">最新曲谱</span></HomeList>
  </main>
</template>

<script>

import HomeList from './../components/HomeList'

export default {
  name: 'home',
  data () {
    return {
      carousel: 0,
      currentPage: 1,
      newList: [],
      hotList: [],
      postData: [],
      isEnd: false,
      isLoading: true,
      carousels: [
        { id: 1, src: '/static/img/c1.jpg', target: '' },
        { id: 2, src: '/static/img/c2.jpg', target: '' },
        { id: 3, src: '/static/img/c3.jpg', target: '' }
      ]
    }
  },
  created () {
    this.$Loading.start()
    if (!localStorage.collection) {
      localStorage.collection = JSON.stringify([])
    }
  },
  mounted () {
    this.getData()
      .then(res => {
        this.$Loading.finish()
        this.isLoading = false
      })
      .catch(err => {
        this.isLoading = false
        this.$Loading.error()
        console.log(err)
      })
  },
  components: {
    HomeList
  },
  methods: {
    getData () {
      return new Promise((resolve, reject) => {
        this.$http
          .get('/api/page', {
            currentPage: this.currentPage
          })
          .then(res => {
            this.currentPage++
            this.postData = res.data
            this.hotList = res.data
            this.newList = res.data
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getMoreData () {
      return new Promise((resolve, reject) => {
        this.isLoading = true
        this.$http
          .get('/api/page', {
            currentPage: this.currentPage
          })
          .then(res => {
            if (res.data.length === 0) {
              this.isEnd = true
              resolve({
                isEnd: true
              })
              this.isLoading = false
            } else {
              this.currentPage++
              this.postData.push(...res.data)
              resolve({
                isEnd: false
              })
            }
          })
          .catch(err => {
            console.log(err)
            this.isLoading = false
            reject(err)
          })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.carousel
  width 100%
  height 0
  padding-bottom 35%
  overflow hidden
  border-radius 8px
  .carousel-item
    .pic
      width 100%
</style>
