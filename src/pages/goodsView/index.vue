<template>
  <div class="goods-view">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true"
              duration="500">
        <block v-for="(item, index) in goodsDetail.images" :key="index">
          <swiper-item class="swiper-item" :key="item.id">
            <img :src="prefix + item" class="slide-image" alt="轮播图" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="goods-detail-content">
      <h1 class="content-item">套餐介绍</h1>
      <div class="content-item">
        <h2>
          造型
          <img src="/static/images/icon/face.png" alt="造型">
        </h2>
        <p>{{ goodsDetail.sculpt }}</p>
      </div>
      <div class="content-item">
        <h2>
          内景
          <img src="/static/images/icon/right.png" alt="内景">
        </h2>
        <p>{{ goodsDetail.interior }}</p>
      </div>
      <div class="content-item">
        <h2>
          外景
          <img src="/static/images/icon/right.png" alt="外景">
        </h2>
        <p>{{ goodsDetail.exterior }}</p>
      </div>
      <div class="content-item">
        <h2>
          拍摄
          <img src="/static/images/icon/photo.png" alt="拍摄">
        </h2>
        <p>{{ goodsDetail.film }}张</p>
      </div>
      <div class="content-item">
        <h2>
          精修
          <img src="/static/images/icon/truing.png" alt="精修">
        </h2>
        <p>{{ goodsDetail.truing }}张</p>
      </div>
      <div class="content-item">
        <h2>相册包含
          <img src="/static/images/icon/right.png" alt="相册包含">
        </h2>
        <p>{{ goodsDetail.album }}</p>
      </div>
      <div class="content-item">
        <h2>相框包含
          <img src="/static/images/icon/right.png" alt="相框包含">
        </h2>
        <p>{{ goodsDetail.frame }}</p>
      </div>
      <div class="content-item">
        <h2>
          摄影师
          <img src="/static/images/icon/film.png" alt="摄影师">
        </h2>
        <p>{{ goodsDetail.cameraman }}</p>
      </div>
      <div class="content-item">
        <h2>
          化妆师
          <img src="/static/images/icon/makeup.png" alt="摄影师">
        </h2>
        <p>{{ goodsDetail.dresser }}</p>
      </div>
      <image v-for="(item, index) in goodsDetail.images" mode="widthFix" :src="prefix + item" alt="" />
    </div>
    <div class="fix-bar self">
      <div class="collection" :class="{active: isCollection}">
        <span class="collection-wrap" @click="goCollection">
          <i-icon class="icon" :type="isCollection ? 'collection_fill' : 'collection'" size="26" />
          <span>{{ isCollection ? '已收藏':'收藏'}}</span>
        </span>
      </div>
      <div class="subscribe">
        <button @click="visibleModal = true" class="booking" :disabled="isSubscribe" :class="{disabled: isSubscribe}">
          {{isSubscribe ? '已预约' : '预约到店'}}
        </button>
        <!--        <button @click="createOrder" class="order">立即购买</button>-->
      </div>
    </div>
    <i-modal title="预约到店" :visible="visibleModal" @ok="goSubscribe" ok-text="预约" @cancel="visibleModal = false">
      <picker mode="date" :value="date" fields='day' :start="maxDate" @change="dateChange">
        <view class="picker">
          到店日期：
          <label>
            <input type="text" v-model="date">
          </label>
        </view>
      </picker>
      <picker mode="time" :value="time" :start="'09:00'" end="'23:00'" @change="timeChange">
        <view class="picker">
          到店时间：
          <label>
            <input type="text" v-model="time">
          </label>
        </view>
      </picker>
    </i-modal>
  </div>
</template>

<script>
import api from '@/api'
import utils from '@/utils/'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      date: '',
      maxDate: '',
      time: '10:00',
      productId: 0,
      goodsDetail: {
        images: []
      },
      isCollection: false,
      isSubscribe: false,
      visibleModal: false,
      prefix: process.env.PROXY_URL + '/storage/'
    }
  },
  mounted () {
    wx.showLoading({ title: '拼命加载中...', mask: true })
    this.productId = Number(this.$root.$mp.query.product_id)
    this.maxDate = utils.formatTime(new Date()).slice(0, 10)
    this.date = this.maxDate
    this.init()
  },
  methods: {
    ...mapActions(['checkLogin']),
    dateChange: function (e) {
      this.date = e.mp.detail.value
    },
    timeChange (e) {
      this.time = e.mp.detail.value
    },
    init () {
      this.getProductDetail()
      if (this.isLogin) {
        this.createHistoryViews()
      }
    },
    getProductDetail () {
      api.getProductDetail({ product_id: this.productId, token: this.userInfo.token }).then(res => {
        wx.hideLoading()
        this.goodsDetail = res.data.data
        this.isSubscribe = Number(this.goodsDetail.is_booking)
        this.isCollection = Number(this.goodsDetail.is_collect)
        wx.setNavigationBarTitle({ title: this.goodsDetail.title || process.env.PROJECT_NAME })
      })
    },
    createHistoryViews () {
      api.createHistoryViews({ token: this.userInfo.token, product_id: this.productId })
    },
    goCollection () {
      if (!this.isLogin) {
        this.checkLogin(true)
        return false
      }
      api.createCollect({ token: this.userInfo.token, product_id: this.productId }).then(res => {
        this.isCollection = true
        wx.showToast({ title: '收藏成功', icon: 'success', duration: 2000, mask: true })
      })
    },
    goSubscribe () {
      if (!this.isLogin) {
        this.checkLogin(true)
        return false
      }
      const timeStr = this.date + ' ' + this.time
      const time = new Date(timeStr.replace(/-/g, '/')).getTime() / 1000
      api.createBooking({ token: this.userInfo.token, product_id: this.productId, time }).then(res => {
        this.isSubscribe = true
        this.visibleModal = false
        wx.showToast({ title: '预约成功', icon: 'success', duration: 2000, mask: true })
      })
    },
    createOrder () {
      api.createOrder({ token: this.userInfo.token, product_id: this.productId, type: 0 }).then(res => {
        console.log(res)
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin'])
  }
}
</script>
<style lang="scss">
  .goods-view {
    background: #f0eff5;

    .swiper {
      padding: 10px;
      background: #ffffff;

      .swiper-container {
        height: 247px;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
      }
    }

    .goods-detail-content {
      padding: 10px 10px 58px 10px;
      margin-top: 10px;
      background: #fff;

      h1.content-item {
        color: #292929;
        font-size: 20px;
      }

      .content-item {
        font-size: 12px;
        padding: 4px 0;
        color: #2c2c2c;
        border-bottom: 1px solid #f1f1f1;

        h2 {
          color: #393939;
          font-size: 16px;
          line-height: 30px;
        }

        img {
          width: 30px;
          height: 30px;
          margin-top: -3px;
          float: right;
        }

      }

      image {
        width: 100%;

        &:first-child {
          margin-top: 10px;
        }
      }
    }

    .fix-bar {
      position: fixed;
      bottom: 0;
      height: 40px;
      width: 100%;
      background: #fff;
      border-top: 1px solid #eaeaea;

      .collection {
        width: 35%;
        height: 40px;
        float: left;
        color: #7c7b80;
        line-height: 38px;
        display: inline-block;
        text-align: center;

        &.active {
          color: #fd4c54;
        }

        .collection-wrap {
          padding: 10px 15px;
        }

        .icon {
          vertical-align: 4%;
        }
      }

      .subscribe {
        width: 65%;
        height: 40px;
        float: right;
        text-align: center;
        display: inline-block;

        button {
          height: 40px;
          width: 90%;
          border-radius: 18px;
          /*width: 50%;*/
          /*border-radius: 0;*/
          font-size: 16px;
          line-height: 40px;
          color: #ffffff;
          display: inline-block;

          &.booking {
            background: #feb250;

            &.disabled {
              color: #333;
              border: 0;
              background: #f0eff5;
            }
          }

          &.order {
            background: #fd4c54;
          }

          &:after {
            display: none;
          }
        }
      }

      &.self {
        height: 50px;

        .collection {
          height: 50px;
          line-height: 48px;
        }

        .subscribe {
          height: 50px;
        }

        button {
          margin-top: 5px;
        }
      }
    }

    picker {
      .picker {
        label {
          height: 24px;
          border: 1px solid #eaeaea;
          border-radius: 6px;
          display: inline-block;
          vertical-align: middle;

          input {
            height: 24px;
            text-align: left;
            line-height: 24px;
            padding-left: 10px;
          }
        }
      }

      &:first-child {
        margin-bottom: 15px;
      }
    }
  }
</style>
