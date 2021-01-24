<template>
  <div class="feedback">
    <div class="title">意见与反馈</div>
    <div class="cont">
      <label>
        <textarea class="text" maxlength="150" v-model="content" placeholder="请填写你的意见和反馈"></textarea>
      </label>
      <span>{{content.length}}/150</span>
    </div>
    <div @click="submitFeedback" class="bottom">提交</div>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    wx.setNavigationBarTitle({ title: process.env.PROJECT_NAME })
  },
  methods: {
    submitFeedback () {
      if (!this.content) {
        wx.showToast({ title: '请输入您的意见啊～', icon: 'none' })
        return false
      }
      api.createFeedback({
        token: this.userInfo.token,
        content: this.content
      }).then(() => {
        this.content = ''
        wx.showToast({
          title: '感谢您的意见',
          icon: 'success',
          duration: 2000,
          mask: true
        })
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}

</script>
<style lang='scss' scoped>
  .feedback {
    height: 100%;
    background: #fff;
    padding: 0 10px;

    .title {
      padding: 10px 0;
      border-bottom: 1px solid #d9d9d9;
    }

    .cont {
      position: relative;
      box-sizing: border-box;
      border-bottom: 1px solid #d9d9d9;

      .text {
        width: 95%;
        height: 152px;
        margin: 0 auto;
        line-height: 20px;
        padding-top: 15px;
      }

      span {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }

    .bottom {
      text-align: center;
      width: 95%;
      height: 40px;
      border-radius: 5px;
      line-height: 40px;
      background: #fd4c54;
      color: #fff;
      font-size: 16px;
      margin: 50px auto;
    }
  }
</style>
