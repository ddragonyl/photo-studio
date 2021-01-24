<template>
  <div class="goods-list">
    <div @click="goodsDetail(item.id)">
      <image :src="prefix + item.img" mode="widthFix" :alt="item.title" />
      <p class="title">{{item.title}}</p>
      <p class="price">
        <span>￥</span>{{item.price}}
        <span class="more"><i-icon type="more" size="16" color="#a7a7a7" /></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data () {
    return {
      prefix: process.env.PROXY_URL + '/storage/'
    }
  },
  methods: {
    goodsDetail (productId) {
      mpvue.navigateTo({ url: '/pages/goodsView/main?product_id=' + productId })
    }
  }
}
</script>

<style lang="scss">
  .goods-list {
    width: 50%;
    display: inline-block;

    > div {
      margin: 5px;
      border-radius: 4px;
      padding-bottom: 10px;
      border: 1px solid #f0f0f0;

      image {
        background: #eff4fa;
        max-width: 100%;
      }

      p {
        font-size: 14px;
        text-align: left;
        padding: 0 10px;
        margin-bottom: 5px;

        &.title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 5px;
        }

        &.price {
          color: #ff2900;

          span:first-child {
            font-size: 12px;
          }
          .more {
            float: right;
          }
        }
      }
    }
  }
</style>
