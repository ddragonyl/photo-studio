<template>
  <div class="swiper">
    <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true"
            duration="500">
      <block v-for="(item, index) in adList" :key="index">
        <swiper-item class="swiper-item" :key="item.id" @click="goodsDetail(item.id)">
          <img :src="prefix + item.img" class="slide-image" :alt="item.title" />
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>
<script>

export default {
  props: {
    canJump: Boolean,
    adList: Array
  },
  data () {
    return {
      prefix: process.env.PROXY_URL + '/storage/'
    }
  },
  methods: {
    goodsDetail (productId) {
      if (this.canJump) {
        mpvue.navigateTo({ url: '/pages/goodsView/main?product_id=' + productId })
      }
    }
  }
}
</script>
<style lang="scss">
  .swiper {
    margin: 10px;
    border-radius: 6px;
    background: #eff4fa;

    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
</style>
