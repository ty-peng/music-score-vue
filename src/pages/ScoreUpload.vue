<template>
  <main>
    <h1 align="center"
        class="page-title">上传曲谱</h1>
    <Form ref="scoreInfo"
          :model="scoreInfo"
          :rules="scoreRule"
          :label-width="90"
          class="form">
      <FormItem label="曲谱标题"
                prop="title">
        <Input type="text"
               clearable
               v-model="scoreInfo.title"
               placeholder="请输入曲谱标题~" />
      </FormItem>
      <FormItem label="音乐人"
                prop="artist">
        <Input type="text"
               clearable
               v-model="scoreInfo.artist"
               placeholder="请输入关联音乐人~" />
      </FormItem>
      <FormItem label="曲谱封面图"
                prop="img">
        <div class="upload-list"
             v-for="(item, index) in uploadImgs"
             :key="index">
          <template v-if="item.status === 'finished'">
            <img :src="item.url"
                 @click="handleView(item.url)">
          </template>
        </div>
        <div>
          <Upload ref="imgUpload"
                  action="/imgApi/upload"
                  name="smfile"
                  type="drag"
                  :show-upload-list="true"
                  :format="['jpg','jpeg','png']"
                  :max-size="1024 * 5"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeImgUpload"
                  :on-success="handleImgSuccess"
                  class="img-upload">
            <div style="width: 200px;height:100px;line-height: 100px;">
              <Icon type="ios-camera"
                    size="20"></Icon>
            </div>
          </Upload>
        </div>
      </FormItem>
      <FormItem label="曲谱描述"
                prop="desc">
        <Input type="textarea"
               clearable
               v-model="scoreInfo.desc"
               placeholder="请输入曲谱描述~" />
      </FormItem>
      <FormItem label="曲谱"
                prop="content">
        <div class="upload-list"
             style="width: 100px; height: 100px"
             v-for="(item, index) in uploadContents"
             :key="index">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="upload-list-cover">
              <Icon type="ios-eye-outline"
                    @click.native="handleView(item.url)"></Icon>
              <Icon type="ios-trash-outline"
                    @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress"
                      :percent="item.percentage"
                      hide-info></Progress>
          </template>
        </div>
        <Upload ref="contentUpload"
                :show-upload-list="false"
                :on-success="handleContentSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="1024 * 5"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeContentUpload"
                multiple
                type="drag"
                action="/imgApi/upload"
                name="smfile"
                style="display: inline-block;width:100px;">
          <div style="width: 100px;height:100px;line-height: 100px;">
            <Icon type="ios-camera"
                  size="20"></Icon>
          </div>
        </Upload>
      </FormItem>
      <FormItem>
        <Button type="primary"
                size="large"
                style="width: 100px"
                :loading="loading"
                @click="uploadScore('scoreInfo')">提交</Button>
      </FormItem>
    </Form>
    <Modal title="查看图片"
           v-model="visible">
      <img :src="imgUrl"
           v-if="visible"
           style="width: 100%">
    </Modal>
  </main>
</template>

<script>
export default {
  data () {
    const validateImg = (rule, value, callback) => {
      if (!this.scoreInfo.img) {
        return callback(new Error('请上传曲谱封面图'))
      } else {
        callback()
      }
    }
    const validateContent = (rule, value, callback) => {
      if (this.scoreInfo.content.imgUrl.length <= 0) {
        return callback(new Error('请上传曲谱图片'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      scoreRule: {
        title: [
          { required: true, type: 'string', message: '请输入曲谱标题', trigger: 'blur' }
        ],
        artist: [
          { required: true, type: 'string', message: '请输入曲谱关联的音乐人', trigger: 'blur' }
        ],
        img: [
          { required: true, validator: validateImg, trigger: 'blur' }
        ],
        desc: [
          { required: true, type: 'string', message: '请输入曲谱描述', trigger: 'blur' }
        ],
        content: [
          { required: true, validator: validateContent, trigger: 'blur' }
        ]
      },
      scoreInfo: {
        title: '',
        artist: '',
        img: '',
        desc: '',
        content: {
          url: '',
          imgUrl: []
        }
        // 上传用户和时间在后台通过token获取
      },
      imgUrl: '',
      visible: false,
      imgUpload: {}, // 上一次上传的图片的返回信息
      uploadImgs: [],
      uploadContents: []
    }
  },
  methods: {
    handleView (url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.contentUpload.fileList
      this.$refs.contentUpload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleBeforeImgUpload () {
      this.$refs.imgUpload.clearFiles()
      this.uploadImgs = []
      return true
    },
    handleImgSuccess (res, file, fileList) {
      if (res.code === 'success') {
        file.url = res.data.url
        this.uploadImgs = fileList
        this.imgUpload = {
          url: res.data.url,
          delete: res.data.delete,
          fileName: res.data.filename,
          storeName: res.data.storename
        }
        this.scoreInfo.img = res.data.url
      } else {
        this.$Message.error('图片上传失败！（图片服务器上传限制）')
      }
    },
    handleBeforeContentUpload () {
      const check = this.uploadContents.length < 10
      if (!check) {
        this.$Notice.warning({
          title: '每次最多只能上传10张图片哦~'
        })
      }
      return check
    },
    handleContentSuccess (res, file, fileList) {
      if (res.code === 'success') {
        file.url = res.data.url
        this.uploadContents = fileList
        this.imgUpload = {
          url: res.data.url,
          delete: res.data.delete,
          fileName: res.data.filename,
          storeName: res.data.storename
        }
      } else {
        this.$Message.error('图片上传失败！（图片服务器上传限制）')
      }
    },
    getImgUrlFromFileList () {
      this.$refs.contentUpload.fileList.forEach(item => {
        this.scoreInfo.content.imgUrl.push(item.url)
      })
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确~',
        desc: '文件 ' + file.name + ' 格式有误，请选择 jpg 或者 png图片'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件 ' + file.name + ' 过大，单个文件不超过 5M.'
      })
    },
    uploadScore (refName) {
      this.getImgUrlFromFileList()
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$api.scores.uploadScore(this.scoreInfo)
            .then(res => {
              this.loading = false
              if (res.data.success) {
                this.$Message.success('上传曲谱成功~')
                this.handleReset('scoreInfo')
              } else {
                this.$Message.error(res.data.msg)
              }
            })
        } else {
          this.$Message.error('请正确填写曲谱信息!')
        }
      })
    },
    handleReset (refName) {
      this.$refs[refName].resetFields()
      this.$refs['imgUpload'].clearFiles()
      this.uploadImgs = []
      this.$refs['contentUpload'].clearFiles()
      this.uploadContents = []
    }
  }
}
</script>

<style lang="stylus" scoped>
main
  margin 20px 20px
  padding 30px
.page-title
  margin 30px auto
.form
  width 550px
  margin 0 auto
.upload-list
  display inline-block
  width 200px
  height 200px
  text-align center
  line-height 200px
  border 1px solid transparent
  border-radius 4px
  overflow hidden
  background #fff
  position relative
  box-shadow 0 1px 1px rgba(0, 0, 0, 0.2)
  margin-right 4px
.upload-list img
  width 100%
  height 100%
.upload-list-cover
  display none
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background rgba(0, 0, 0, 0.6)
.upload-list:hover, .upload-list-cover
  display block
.upload-list-cover i
  color #fff
  font-size 20px
  cursor pointer
  margin 0 2px
.img-upload
  display inline-block
  width 200px
</style>
