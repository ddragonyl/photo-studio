<template>
  <div class="classification">
    <i-tabs :current="curKey" scroll @change="handleChangeScroll">
      <i-tab v-for="item in typeList" :key="item.id" :title="item.title"></i-tab>
    </i-tabs>
    <div class="content-wrap" v-if="goodsList.length">
      <Card v-for="(item, index) in goodsList" :key="index" :item="item" :type-index="1" />
    </div>
    <div class="content-wrap no-data" v-else>
      <span>暂无样品</span>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Searcher from '@/components/Searcher'
import Card from '@/components/ClassifyCard'

export default {
  data () {
    return {
      curKey: '',
      typeList: [],
      goodsList: []
    }
  },
  components: {
    Card,
    'v-search': Searcher
  },
  mounted () {
    this.getClassificationType()
  },
  methods: {
    getClassificationType () {
      api.getType().then(res => {
        this.typeList = res.data.data
        this.curKey = this.typeList[0].id
        this.getProduct(this.curKey)
      })
    },
    handleChangeScroll ({ target }) {
      this.curKey = target.key
      this.getProduct(this.curKey)
    },
    getProduct (typeId) {
      api.getProduct({ is_index: 0, type_id: typeId }).then(res => {
        this.goodsList = res.data.data
      })
    }
  }
}
</script>
<style lang="scss">
  .classification {
    background: #f0eff5;
    height: 100vh;

    .content-wrap {
      margin-top: 10px;
      padding: 0 10px;

      &.no-data {
        padding-top: 50px;
        text-align: center;
      }
    }
  }
</style>
