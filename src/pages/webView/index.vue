<template>
  <block>
    <web-view v-if="pageUrl" @load="loadSuccess" @error="loadError" :src="pageUrl" />
  </block>
</template>

<script>
export default {
  data () {
    return {
      pageUrl: ''
    }
  },
  methods: {
    loadSuccess () {
      wx.hideLoading()
    },
    loadError () {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '页面加载失败，请稍后重试！',
        success () {
          wx.navigateBack(1)
        }
      })
    }
  },
  mounted () {
    const query = this.$root.$mp.query
    wx.showLoading({ title: '拼命加载中...', mask: true })
    this.pageUrl = decodeURIComponent(query.href)
    wx.setNavigationBarTitle({ title: query.title || process.env.PROJECT_NAME })
  }
}
</script>
