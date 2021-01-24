<template>
  <div class="mine-view">
    <div class="classify-list" v-if="dataList.length">
      <Card v-for="(item, index) in dataList" :key="index" :item="item" :type-index="typeIndex" />
    </div>
    <div class="classify-list no-data" v-else>
      <span v-if="typeIndex === 1">您没有浏览记录～</span>
      <span v-if="typeIndex === 2">您没有预约记录～</span>
      <span v-if="typeIndex === 3">您没有收藏记录～</span>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Card from '@/components/ClassifyCard'
import { MINE_CLASSIFY } from '@/utils/constants'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      index: 0,
      dataList: [],
      typeIndex: '',
      mineClassify: MINE_CLASSIFY
    }
  },
  components: {
    Card
  },
  mounted () {
    this.dataList = []
    wx.showLoading({ title: '拼命加载中...', mask: true })
    this.index = Number(this.$root.$mp.query.index)
    this.typeIndex = this.mineClassify[this.index].typeIndex
    this.getDataList()
    wx.setNavigationBarTitle({ title: this.mineClassify[this.index].label || process.env.PROJECT_NAME })
  },
  methods: {
    getDataList () {
      const func = ['getBooking', 'getCollect', 'getHistoryViews']
      api[func[this.index]]({ token: this.userInfo.token }).then(res => {
        this.dataList = res.data.data
        wx.hideLoading()
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="scss">
  .mine-view {
    height: 100vh;
    overflow: scroll;
    background: #f0eff5;

    .classify-list {
      padding: 10px;

      &.no-data {
        text-align: center;
        padding-top: 30px;
      }
    }
  }
</style>
