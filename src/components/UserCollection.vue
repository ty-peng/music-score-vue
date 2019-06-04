<template>
  <div class="userCollection">
    <div class="content">
      <div class="sec-1 clearfix">
        <h2 class="fl">我的收藏</h2>
        <div class="manage-group fr">
          <div class="manage-opt"
               :class="showManage ? '' : 'hide'">
            <Checkbox :indeterminate="indeterminate"
                      :value="checkAll"
                      @click.prevent.native="handleCheckAll">全选</Checkbox>
            <Button class="btn btn-manage fr"
                    type="error"
                    @click="handleDelete">删除</Button>
          </div>
          <Button class="btn btn-manage"
                  @click="handleManage">{{ manageText }}</Button>
        </div>
      </div>
      <div class="sec-2 clearfix">
        <CheckboxGroup v-model="checkedIds"
                       @on-change="checkedIdsChange">
          <ul class="collection-list">
            <li class="collection-item clearfix"
                v-for="(item, index) in collections"
                :key="index">
              <Checkbox class="fl"
                        v-show="showManage"
                        :label="item.id">&nbsp;</Checkbox>
              <h3 class="title fl">
                <Icon type="ios-musical-note" />
                <router-link :to="'/details/' + item.id">{{ item.title + ' - ' + item.artist }}</router-link>
              </h3>
              <router-link :to="'/scores/' + transType(item.type)"
                           class="type fr">{{ transTypeName(item.type) }}</router-link>
            </li>
          </ul>
        </CheckboxGroup>
      </div>
      <Page :total="total"
            size="small"
            show-elevator
            show-sizer
            show-total
            v-show="collections.length !== 0"
            align="center"
            :current="pageQo.page"
            :page-size="pageQo.limit"
            @on-change="changePage"
            @on-page-size-change="changePageSize" />
    </div>
    <div class="no-data"
         v-if="collections.length === 0">
      暂无数据，
      <router-link to="/">快去收藏吧(oﾟvﾟ)ノ GO >></router-link>
    </div>
    <Modal v-model="showDelModal"
           width="360">
      <p slot="header"
         style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>您确定要删除所选择的{{ checkedIds.length }}条记录吗？</p>
      </div>
      <div slot="footer">
        <Button type="error"
                size="large"
                long
                @click="delChecked">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { TYPES, BACKTYPES } from '../enums/enums'
export default {
  data () {
    return {
      kw: '',
      pageQo: {
        page: 1,
        offset: 0,
        limit: 10
      },
      total: null,
      indeterminate: true,
      checkAll: false,
      checkedIds: [],
      collections: [],
      showDelModal: false,
      showManage: false,
      manageText: '管理'
    }
  },
  computed: {
    userId () {
      return this.$store.state.userInfo.id
    },
    allPages () {
      const allPage = Math.ceil(this.total / this.pageQo.limit)
      return (allPage === 0) ? 1 : allPage
    }
  },
  created () {
    this.$Loading.start()
    this.kw = this.$route.query.kw
  },
  mounted () {
    this.loadCollections()
    this.$Loading.finish()
  },
  methods: {
    loadCollections () {
      this.$api.user.loadCollections(this.userId, this.pageQo)
        .then(res => {
          if (res.data.success) {
            this.total = res.data.total
            this.collections = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        })
    },
    // 数字类别转英文
    transType (typeNum) {
      for (var key in BACKTYPES) {
        if (BACKTYPES.hasOwnProperty(key)) {
          if (BACKTYPES[key] === typeNum) {
            return key
          }
        }
      }
    },
    // 数字类别转中文
    transTypeName (typeNum) {
      let theType = this.transType(typeNum)
      return (TYPES[theType] ? TYPES[theType] : '未知') + '曲谱'
    },
    handleManage () {
      if (this.collections.length === 0) {
        this.$Notice.error({
          title: '暂无可以管理的数据哦 ＞︿＜'
        })
      } else {
        this.showManage = !this.showManage
        this.showManage ? (this.manageText = '完成') : (this.manageText = '管理')
        if (!this.showManage) {
          this.checkedIds = []
          this.checkAll = false
          this.indeterminate = true
        }
      }
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false

      if (this.checkAll) {
        this.checkedIds = []
        for (let i = 0; i < this.collections.length; i++) {
          this.checkedIds.push(this.collections[i].id)
        }
      } else {
        this.checkedIds = []
      }
    },
    checkedIdsChange (data) {
      if (data.length === this.collections.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    changePage (page) {
      if (this.showManage) {
        this.handleManage()
      }
      const allPages = this.allPages
      if (page > allPages) {
        page = allPages
      }
      this.pageQo.page = page
      this.pageQo.offset = (page - 1) * this.pageQo.limit
      this.loadCollections()
    },
    changePageSize (pageSize) {
      if (this.showManage) {
        this.handleManage()
      }
      this.pageQo.limit = pageSize
      this.loadCollections()
    },
    handleDelete () {
      if (this.checkedIds.length === 0) {
        this.$Notice.error({
          title: '没有选择需要删除的数据哦 ＞︿＜'
        })
      } else {
        this.showDelModal = true
      }
    },
    delChecked () {
      this.showDelModal = false
      this.$api.user.cancelCollections(this.userId, this.checkedIds)
        .then(res => {
          if (res.data.success) {
            this.$Message.success('删除成功!')
            this.loadCollections()
          } else {
            this.$Message.error(res.data.msg)
            this.loadCollections()
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.userCollection
  margin 10px 20px
.sec-1
  padding 0 20px
  line-height 27px
  .manage-group > *
    margin-right 10px
  .manage-opt
    display inline-block
    vertical-align top
  .btn
    height 27px
    padding 0 20px
    margin-right 0
    font-size 14px
    line-height 25px
    letter-spacing 2px
.sec-2
  .collection-list
    border-top 1px dashed #e8eaec
    .collection-item
      padding 0 20px
      list-style none
      border-bottom 1px dashed #e8eaec
      .title
        font-size 16px
      line-height 40px
.no-data
  text-align center
</style>
