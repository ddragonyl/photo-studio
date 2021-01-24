<template>
  <div class="home-index">
    <div class="head">
      <v-search />
      <v-swiper :adList="adList" :can-jump="true" />
      <div class="channel">
        <div v-for="(item, index) in homeClassify" @click="goClassify(index)" :key="index">
          <img :src="'/static/images/channel/' + item.img_sort + '.png'" :alt="item.label">
          <p>{{ item.label }}</p>
        </div>
      </div>
    </div>
    <div class="recommend">
      <div class="title">精彩推荐
        <i-icon class="icon-enter" type="enter" size="20" color="#b0b0b0" />
      </div>
      <div class="card-wrap">
        <Card v-for="(item, index) in goodsList" :key="index" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Searcher from '@/components/Searcher'
import Swiper from '@/components/Swiper'

// 订单
//
// 底部 图标
//
// 详情页- 订单存在   type 活动和商品的详情是一个吗
//

// 999999   fd4c54



import Card from '@/components/HomeCard'
import { HOME_CLASSIFY } from '@/utils/constants'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      adList: [],
      goodsList: [],
      homeClassify: HOME_CLASSIFY
    }
  },
  mounted () {
    this.getSides()
    this.getProduct()
    this.autoLogin()
  },
  components: {
    'v-swiper': Swiper,
    'v-search': Searcher,
    Card
  },
  methods: {
    ...mapActions(['autoLogin', 'checkLogin']),
    getSides () {
      api.getSides().then(res => {
        this.adList = res.data.data
      })
    },
    getProduct () {
      api.getProduct({ is_index: 1 }).then(res => {
        this.goodsList = res.data.data
      })
    },
    goClassify (index) {
      console.log(index)
      mpvue.navigateTo({ url: '/pages/homeClassify/main?index=' + index })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-index {
    background: #f0eff5;

    .head {
      margin-bottom: 10px;
      background: #ffffff;

      .channel {
        padding: 10px 0;

        > div {
          width: 25%;
          font-size: 14px;
          color: #818181;
          text-align: center;
          display: inline-block;

          img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }

    .recommend {
      padding: 16px 10px;
      background: #ffffff;

      .title {
        color: #161616;
        font-size: 16px;

        .icon-enter {
          margin-left: -5px;
          vertical-align: text-top;
        }
      }

      .card-wrap {
        margin-left: -5px;
        margin-right: -5px;
      }
    }
  }
</style>
