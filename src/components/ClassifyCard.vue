<template>
  <div class="classify-item" @click="goodsDetail(item.id)" :data-index="typeIndex">
    <div class="content" v-if="typeIndex === 1 || typeIndex === 2">
      <p v-if="typeIndex === 1" class="title">{{item.title}}</p>
      <image :src="prefix + item.img" mode="widthFix" :alt="item.title" />
      <p v-if="typeIndex === 2" class="title ellipsis pad-top">{{item.title}}</p>
      <p class="views" v-if="typeIndex === 1">
        <span>{{ item.views }} 阅读</span>
        <!-- <span class="like"><i-icon type="like" size="20" color="#a7a7a7" /> {{ item.lick }}</span>-->
        <span class="like">{{ item.created_at }}</span>
      </p>
    </div>
    <div class="content flex" v-if="typeIndex === 0 || typeIndex === 3">
      <image :src="prefix + item.img" mode="widthFix" :alt="item.title" />
      <div class="content-right">
        <p class="title">{{item.title}}</p>
        <div class="right-bottom">
          <span class="tips">包邮</span>
          <p class="price">
            <span>￥</span>{{item.price}}
            <span class="more"><i-icon type="more" size="16" color="#a7a7a7" /></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeIndex: Number,
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
  .classify-item {
    margin-bottom: 10px;

    .date {
      font-size: 14px;
      color: #9c9ba0;
      padding-bottom: 10px;
    }

    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > div.content {
      padding: 10px;
      border: 1px solid #f0f0f0;
      background: #ffffff;
      border-radius: 8px;

      &.flex {
        border: 0;
        display: flex;

        &:first-child {
          border-top: 0;
        }

        image, > div {
          flex: 1;
        }

        .content-right {
          padding-left: 10px;

          .title {
            padding: 0;
            min-height: 68px;
          }

          .right-bottom {
            .tips {
              font-size: 12px;
              color: #949494;
            }
          }
        }
      }

      image {
        width: 100%;
        max-width: 100%;
        border-radius: 8px;
        background: #eff4fa;
      }

      p {
        font-size: 14px;
        text-align: left;

        &.title {
          font-size: 16px;
          padding: 0 0 10px;
          color: #313131;

          &.pad-top {
            padding-top: 10px;
          }
        }

        &.views {
          color: #c9c9c9;
          margin-top: 10px;

          .like {
            float: right;
          }
        }

        &.price {
          color: #ff2900;

          span:first-child {
            font-size: 12px;
          }

          .more {
            float: right;

            i-icon {
              vertical-align: bottom;
            }
          }
        }
      }
    }
  }
</style>
