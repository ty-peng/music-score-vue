<template>
  <main class="details">
    <div class="info">
      <Row>
        <i-col span="17"
               offset="3">
          <h1>{{ score.title }}</h1>
          <span>音乐人：</span>
          <router-link :to="'/search?kw=' + score.artist">
            <span>{{ score.artist }}</span>
          </router-link>
          <span style="margin-left: 10px">
            <Icon type="md-eye" />
            {{ score.views }}
          </span>
          <span>
            <Icon type="md-heart-outline" />
            {{ score.collects }}
          </span>
        </i-col>
        <i-col span="1">
          <div class="collect-btn"
               @click="handleCollect">
            <Icon :type="isCollected ? 'md-heart' : 'md-heart-outline'"
                  color="#ff6666"
                  size="50" />
            <p align="center">{{ isCollected ? '已收藏' : '收藏' }}</p>
          </div>
        </i-col>
      </Row>
      <Row :gutter="20"
           class="mt">
        <i-col offset="3"
               span="4">
          <img :src="score.img" />
        </i-col>
        <i-col span="14">
          <h2>曲谱描述：</h2>
          <p class="mt">{{ score.desc }}</p>
        </i-col>
      </Row>
    </div>
    <Row class="content">
      <i-col offset="3"
             span="18">
        <ul>
          <li v-for="(item, index) in score.content.imgUrl"
              :key="index">
            <img :src="item" />
          </li>
        </ul>
        <a target="_blank"
           :href="score.content.url">
          <h2 align="right">在线播放（需开启flash）>></h2>
        </a>
      </i-col>
    </Row>
  </main>
</template>

<script>
export default {
  data () {
    return {
      score: {
        id: 123,
        title: '等你下课吉他曲谱',
        artist: '周杰伦',
        img: 'http://oss.tan8.com/yuepuku/115/57671/57671_prev.jpg?v=1558691923',
        desc: '周杰伦 - 等你下课',
        uploader: 'feiji',
        uploadDatetime: '2015-06-01 15:02:33',
        views: 12345,
        collects: 12222,
        collectId: null,
        content: {
          url: 'http://www.tan8.com/newFlash/player.swf?id=64275',
          imgUrl: [
            'http://oss.tan8.com/jtpnew/58/55758/8595e2ab986887360bc337d80c71ff6aweb_image_1_1.png',
            'http://oss.tan8.com/jtpnew/58/55758/8595e2ab986887360bc337d80c71ff6aweb_image_1_2.png',
            'http://oss.tan8.com/jtpnew/58/55758/8595e2ab986887360bc337d80c71ff6aweb_image_1_3.png',
            'http://oss.tan8.com/jtpnew/58/55758/8595e2ab986887360bc337d80c71ff6aweb_image_1_4.png',
            'http://oss.tan8.com/jtpnew/58/55758/8595e2ab986887360bc337d80c71ff6aweb_image_1_5.png'
          ]
        }
      }
    }
  },
  computed: {
    scoreId () {
      return this.$route.params.id
    },
    userId () {
      return this.$store.state.userInfo.id ? this.$store.state.userInfo.id : null
    },
    isCollected () {
      return !!this.score.collectId
    },
    showPianoPlayer () {
      return !!this.score.content.url
    }
  },
  mounted () {
    this.loadDetails()
  },
  watch: {
    scoreId () {
      if (this.scoreId) {
        this.loadDetails()
      }
    }
  },
  methods: {
    loadDetails () {
      this.$api.scores.loadDetails(this.scoreId)
        .then(res => {
          if (res.data.success) {
            this.score = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        })
    },
    handleCollect () {
      if (!this.$store.state.userInfo || !this.$store.state.userInfo.id) {
        this.$Message.info('登录后才能进行收藏~')
        this.$router.push({
          path: '/login',
          query: { redirect: this.$route.fullPath }
        })
        return
      }
      if (this.isCollected) {
        // 取消收藏
        this.$api.user.cancelCollect(this.userId, this.score.collectId)
          .then(res => {
            if (res.data.success) {
              this.score.collectId = null
            } else {
              this.$Message.error(res.data.msg)
            }
          })
      } else {
        // 收藏
        this.$api.user.collect(this.userId, this.scoreId)
          .then(res => {
            if (res.data.success) {
              this.score.collectId = res.data.data.id
            } else {
              this.$Message.error(res.data.msg)
            }
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.mt
  margin-top 30px
.details
  width 1000px
  margin 20px auto
  padding 30px 30px
.info
  h1
    margin 2px 0 10px 0
  img
    width 100%
.collect-btn
  cursor pointer
.content
  margin 30px auto
ul, li
  list-style none
  img
    width 100%
</style>
