<template>
  <div class="login">
    <div class="login-logo">
      <img src="/static/images/login.png" alt="">
    </div>
    <button class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo"> 授权登录</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      backUrl: ''
    }
  },
  mounted () {
    const query = this.$root.$mp.query
    this.backUrl = '/' + (decodeURIComponent(query.url || 'pages/index/main'))
    wx.setNavigationBarTitle({ title: '微信登录授权' })
  },
  methods: {
    ...mapActions(['checkLogin']),
    getUserInfo (e) {
      if (e.target.userInfo) {
        wx.reLaunch({ url: this.backUrl })
      }
    }
  }
}

</script>
<style lang='scss' scoped>
  .login {
    height: 100vh;
    background: #fff;

    .login-logo {
      margin-top: 50px;
      text-align: center;

      img {
        width: 128px;
        height: 128px;
      }
    }

    .login-btn {
      text-align: center;
      width: 50%;
      height: 40px;
      border-radius: 5px;
      line-height: 40px;
      background: #fd4c54;
      color: #fff;
      font-size: 16px;
      margin: 20px auto;
    }
  }
</style>
