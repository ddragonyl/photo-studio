<template>
  <div class="order">
    <div class="order-wrap" v-if="!dataList.length">
      <div class="item">
        <div class="item-header">
          <h4>订单号：YSS20200729104218001</h4>
          <span class="state">
            待支付
            <span class="countdown">剩余 <span class="col-red">9:32</span></span>
          </span>
        </div>
        <div class="item-content">
          <div class="title">tin-Tricolor现代：艺术与灵感的碰撞</div>
          <div>商品价格：1200</div>
          <div>下单时间：2020-08-16 15:52:11</div>
          <div>支付时间：2020-07-29 10:46:24</div>
          <div class="right"><button >去支付</button></div>
        </div>
      </div>
    </div>
    <div class="no-data" v-else>
      <span>还没有订单，赶快去下单吧</span>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters, mapActions } from 'vuex'
import { MINE_CLASSIFY } from '@/utils/constants'

export default {
  data () {
    return {
      dataList: []
    }
  },
  mounted () {
    wx.showLoading({ title: '拼命加载中...', mask: true })
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      api.getOrderList({ token: this.userInfo.token }).then(res => {
        this.dataList = res.data.data
        wx.hideLoading()
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin'])
  }
}
</script>

<style lang="scss">
  .order {
    background: #f0eff5;
    height: 100vh;
    box-sizing: border-box;

    .order-wrap {
      padding: 10px;

      .item {
        border-radius: 6px;
        background: white;

        .item-header {
          padding: 10px;
          font-size: 14px;
          color: rgba(44, 45, 46, 0.5);
          background: #fafafa;
          border-bottom: 1px solid rgba(51, 51, 51, 0.06);

          .state {
            float: right;
            color: #ffc954;
            font-size: 12px;
            padding: 2px 6px;
            margin-top: -21px;
            border-radius: 8px;
            .countdown {
              color: rgba(44, 45, 46, 0.8);
            }
          }

          .col-red {
            color: #EF4D3C;
          }
        }

        .item-content {
          padding: 10px;
          font-size: 14px;
          color: rgba(44, 45, 46, 0.5);
          position: relative;

          .title {
            font-size: 15px;
            color: rgba(44, 45, 46, 0.8);
          }

          > div {
            margin-bottom: 6px;
          }
          .right {
            position: absolute;
            right: 20px;
            bottom: 10px;
            button {
              width: 80px;
              height: 32px;
              line-height: 22px;
              font-size: 15px;
              padding: 6px;
              color: #fff;
              background: #38d3cd;
            }
          }
        }

      }

    }

    .no-data {
      text-align: center;
      padding-top: 30px;
    }
  }
</style>
