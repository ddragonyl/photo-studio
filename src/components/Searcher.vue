<template>
  <div class="search">
    <div class="search-wrap" @click="goSearchPage">
      <i-icon class="search-icon" type="search" size="22" color="#a8acaf" />
      <div class="input">请输入搜索的内容</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goSearchPage (e) {
      e.preventDefault()
      mpvue.navigateTo({ url: '/pages/searchView/main' })
    }
  }
}
</script>

<style lang="scss">
  .search {
    .search-wrap {
      border-radius: 16px;
      background: #eff4fa;
      height: 36px;
      margin: 0 10px;
      line-height: 33px;

      .search-icon {
        margin-left: 10px;
      }

      .input {
        width: calc(100% - 36px);
        height: 100%;
        float: right;
        margin-top: 2px;
        color: #a8acaf;
      }
    }
  }
</style>
