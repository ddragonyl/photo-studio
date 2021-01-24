<template>
  <div class="search-view">
    <div class="search-wrap">
      <div class="search-wrap-content">
        <i-icon class="search-icon" type="search" size="22" color="#a8acaf" />
        <label>
          <input v-model="keyword" type="text" placeholder="请输入搜索的关键字">
        </label>
        <div class="del" v-if="keyword" @click="deleteSearch">
          <i-icon type="close" size="14" color="#fff" />
        </div>
      </div>
      <div class="search-btn" :class="{cancel: !keyword}" @click="handleBtn">{{ keyword ? '完成' : '取消' }}</div>
    </div>
    <div class="classify-list">
      <Card v-for="(item, index) in dataList" :key="index" :item="item" :type-index="3" />
    </div>
    <div class="classify-list no-data" v-if="!dataList.length && keyword && searching">
      <span>没有搜索到您要的结果，换个关键字试试～</span>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Card from '@/components/ClassifyCard'

export default {
  data () {
    return {
      keyword: '',
      dataList: [],
      searching: false
    }
  },
  components: {
    Card
  },
  methods: {
    handleBtn () {
      if (this.keyword) {
        this.search()
      } else {
        this.cancel()
      }
    },
    search () {
      api.getProduct({ title: this.keyword }).then(res => {
        this.searching = true
        this.dataList = res.data.data
      })
    },
    cancel () {
      wx.navigateBack({ delta: 1 })
    },
    deleteSearch () {
      this.keyword = ''
      this.dataList = []
      this.searching = false
    }
  }
}
</script>
<style lang="scss">
  .search-view {
    background: #f0eff5;
    height: 100vh;

    .search-wrap {
      background: #ffffff;
      padding-bottom: 10px;

      .search-wrap-content {
        height: 36px;
        margin: 0 10px;
        line-height: 33px;
        position: relative;
        border-radius: 16px;
        background: #eff4fa;
        display: inline-block;
        width: calc(100% - 62px);

        .search-icon {
          margin-left: 10px;
        }

        input {
          height: 100%;
          float: right;
          width: calc(100% - 36px);
        }

        .del {
          top: 9px;
          right: 10px;
          width: 18px;
          height: 18px;
          text-align: center;
          line-height: 15px;
          border-radius: 50%;
          position: absolute;
          background: #c9c9c9;
          z-index: 111;
        }

      }

      .search-btn {
        width: 40px;
        float: right;
        z-index: 111;
        line-height: 36px;

        &.cancel {
          color: #a8acaf;
        }
      }
    }

    .classify-list {
      padding: 10px;

      &.no-data {
        padding-top: 50px;
        text-align: center;
      }
    }

  }
</style>
