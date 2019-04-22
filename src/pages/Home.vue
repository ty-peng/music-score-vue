<template>
  <div class="home">
    <main class="main"
          ref="content">
      <div class="sec-1">
        <Carousel autoplay
                  v-model="carousel"
                  loop
                  class="carousel">
          <CarouselItem class="carousel-item"
                        v-for="item in carousels"
                        :key="item.id">
            <router-link to>
              <img class="pic"
                   :src="item.url">
            </router-link>
          </CarouselItem>
        </Carousel>
      </div>
      <div class="sec-2 expand-width clearfix">
        <PostCard v-for="(item, index) in postData"
                  :postData="item"
                  :key="'post-'+index"></PostCard>
        <Loading :isLoading="isLoading"
                 :isEnd="isEnd"></Loading>
      </div>
    </main>
  </div>
</template>

<script>
import PostCard from './../components/PostCard.vue'
import Loading from './../components/Loading.vue'
import infiniteScroll from './../assets/js/infinite-scroll.js'

export default {
  name: 'home',
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

    infiniteScroll(this.$refs.content, 200, this.getMoreData, this.isEnd)
  },
  data () {
    return {
      carousel: 0,
      currentPage: 1,
      postData: [],
      isEnd: false,
      isLoading: true,
      carousels: [
        { id: 1, url: '/static/img/img1.jpeg', target: '' },
        { id: 2, url: '/static/img/img2.jpeg', target: '' },
        { id: 3, url: '/static/img/img3.jpeg', target: '' }
      ]
    }
  },
  components: {
    PostCard,
    Loading
  },
  watch: {
    isEnd () {
      if (this.isEnd) {
        infiniteScroll(this.$refs.content, 200, this.getMoreData, this.isEnd)
      }
    }
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
          .post('/api/page', {
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

<style lang="less" scoped>
.carousel {
  height: 370px;
  border-radius: 8px;
  overflow: hidden;

  .carousel-item {
    .pic {
      min-width: 100%;
      height: 100%;
    }
  }
}
</style>
