<template>
  <div class="my">
    <div class="info">
      <image class="user-avatar" @error="imgError" :src="avatarSrc" background-size="cover" />
      <div>
        <p v-if="userInfo.name">{{ userInfo.name }}</p>
        <p @click="toLogin" v-else>点击登录</p>
      </div>
    </div>
    <i-cell-group>
      <i-cell v-for="(item, index) in mineClassify" :key="index" @click="goMy(index)" :title="item.label" is-link />
    </i-cell-group>
    <div class="division">&nbsp;</div>
    <i-cell-group>
      <i-cell is-link>
        <button class="my-cs" open-type="contact">在线客服</button>
      </i-cell>
      <i-cell title="联系电话" @click="phoneCall" is-link></i-cell>
      <i-cell title="商家地址" @click="getLocation" is-link></i-cell>
    </i-cell-group>
    <div class="division">&nbsp;</div>
    <i-cell-group>
      <i-cell title="意见反馈" @click="feedback" is-link></i-cell>
    </i-cell-group>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetters, mapActions } from 'vuex'
import { MINE_CLASSIFY } from '@/utils/constants'

export default {
  data () {
    return {
      avatarSrc: '/static/images/user.png',
      contactUs: {},
      mineClassify: MINE_CLASSIFY
    }
  },
  mounted () {
    this.checkLogin()
    this.getContactUs()
    this.avatarSrc = this.userInfo.head_icon || '/static/images/user.png'
  },
  methods: {
    ...mapActions(['checkLogin']),
    phoneCall () {
      wx.makePhoneCall({
        phoneNumber: this.contactUs.telephone,
        success () {
        },
        error () {
        }
      })
    },
    getContactUs () {
      api.getContactUs().then(res => {
        this.contactUs = res.data.data
      })
    },
    handleContact (e) {
      console.log(e)
    },
    imgError () {
      this.avatarSrc = '/static/images/user.png'
    },
    toLogin () {
      this.checkLogin(true)
    },
    goMy (index) {
      if (!this.isLogin) {
        this.toLogin()
        return false
      }
      mpvue.navigateTo({ url: '/pages/mineClassify/main?index=' + index })
    },
    getLocation () {
      const params = {
        latitude: this.contactUs.latitude || 0,
        longitude: this.contactUs.longitude || 0,
        scale: 28,
        name: process.env.PROJECT_NAME,
        address: this.contactUs.address
      }
      wx.openLocation(params)
    },
    feedback () {
      mpvue.navigateTo({ url: '/pages/feedback/main' })
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin'])
  },
  watch: {
    userInfo () {
      this.avatarSrc = this.userInfo.head_icon || '/static/images/user.png'
    }
  }
}
</script>

<style lang="scss">
  .my {
    background: #f0eff5;
    height: 100vh;

    .info {
      width: 100%;
      height: 140px;
      display: flex;
      align-items: center;
      background: #fd4c54;
      padding: 0 30px;
      margin-bottom: 10px;
      box-sizing: border-box;

      .user-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      div {
        margin-left: 30px;
      }

      p {
        color: #fff;
        font-size: 20px;
        margin-bottom: 10px
      }
    }

    .division {
      height: 10px;
    }

    .my-cs {
      background: transparent;
      border: 0;
      font-size: 13px;
      text-align: left;
      padding: 0;
    }

    .my-cs:after {
      display: none;
    }
  }
</style>
