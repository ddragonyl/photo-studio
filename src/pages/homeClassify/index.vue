<template>
  <div class="classify-view">
    <div class="head">
      <v-search />
    </div>
    <div class="classify-list" :class="{'bg-white': !layoutSwitch}">
      <div class="whole-head" v-if="!typeIndex">
        <div v-for="item in tabList" @click="tabChange(item.key)"
             :class="{active: curTab === item.key, price: item.key === 2}">
          {{ item.label }}
          <image v-if="item.key === 2" :src="imgSrc" mode="heightFix" alt="sort" />
        </div>
        <div class="switch">
          <image @click="layoutSwitch = !layoutSwitch" :src="switchSrc" mode="heightFix" alt="switch" />
        </div>
      </div>
      <Card v-if="layoutSwitch" v-for="(item, index) in dataList" :key="index" :item="item" :type-index="typeIndex" />
      <HomeCard v-if="!layoutSwitch" v-for="(item, index) in dataList" :key="index" :item="item" />
    </div>
  </div>
</template>

<script>
import api from '@/api'
import HomeCard from '@/components/HomeCard'
import Searcher from '@/components/Searcher'
import Card from '@/components/ClassifyCard'
import { HOME_CLASSIFY } from '@/utils/constants'

export default {
  data () {
    return {
      curTab: 0,
      sort: true,
      typeIndex: '',
      dataList: [],
      layoutSwitch: true,
      homeClassify: HOME_CLASSIFY,
      tabList: [{ key: 0, label: '综合' }, { key: 1, label: '人气' }, { key: 2, label: '价格' }]
    }
  },
  components: {
    Card,
    HomeCard,
    'v-search': Searcher
  },
  mounted () {
    this.dataList = []
    wx.showLoading({ title: '拼命加载中...', mask: true })
    this.typeIndex = Number(this.$root.$mp.query.index)
    wx.setNavigationBarTitle({ title: this.homeClassify[this.typeIndex].label || process.env.PROJECT_NAME })
    this.getProduct()
  },
  methods: {
    tabChange (key) {
      if (this.curTab === 2 && key === 2) {
        this.sort = !this.sort
      }
      this.curTab = key
      this.getProduct()
    },
    getProduct () {
      let func = 'getProduct'
      let params = {}
      if (this.typeIndex) {
        params.is_index = this.typeIndex
      } else {
        if (this.curTab) {
          params.order = 'DESC'
          params.order_by = this.curTab === 1 ? 'views' : 'price'
          if (this.curTab === 2) {
            params.order = this.sort ? 'ASC' : 'DESC'
          }
        }
      }
      if (this.typeIndex === 2) {
        func = 'getActivity'
        params = {}
      }
      api[func](params).then(res => {
        wx.hideLoading()
        this.dataList = res.data.data
      })
    }
  },
  computed: {
    imgSrc () {
      let imgName = 'sort'
      if (this.curTab === 2) {
        imgName = this.sort ? 'sort-down' : 'sort-up'
      }
      return `/static/images/icon/${imgName}.png`
    },
    switchSrc () {
      const imgName = this.layoutSwitch ? 'switch-all' : 'switch-half'
      return `/static/images/icon/${imgName}.png`
    }
  }
}
</script>
<style lang="scss">
  .classify-view {
    height: 100vh;
    overflow: scroll;
    background: #f0eff5;

    .head {
      padding-bottom: 10px;
      background: #ffffff;
    }

    .sort-wrap {
      position: relative;
      transform-origin: 50% 50%;
      transform: rotate(190deg);

      .sort-up {
        transform: rotate(90deg);
      }

      .sort-down {
        transform: rotate(-90deg);
      }
    }

    .classify-list {
      padding: 10px;

      &.bg-white {
        background: white;
      }

      .whole-head {
        background: #fff;
        padding: 5px 15px 0;
        border-radius: 8px 8px 0 0;

        + .classify-item > div.content.flex {
          border-radius: 0 0 8px 8px;
        }

        > div {
          height: 30px;
          line-height: 30px;
          display: inline-block;
          text-align: center;
          margin-right: 24px;

          &.active {
            color: #fd4c54;
          }

          &.price {
            image {
              height: 16px;
              vertical-align: middle;
              margin-left: -5px;
              margin-top: -2px;
            }
          }

          &.switch {
            float: right;
            margin-right: 0;

            image {
              height: 24px;
              vertical-align: middle;
              margin-top: -6px;
            }
          }
        }
      }
    }
  }
</style>
