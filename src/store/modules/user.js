import types from '../types'
import api from '../../api'
import { LOGIN_TOKEN, USER_INFO } from '../../utils/constants'
import utils from '../../utils/'

const state = {
  isLogin: false,
  userInfo: ''
}

const getters = {
  isLogin: state => state.isLogin,
  userInfo: state => state.userInfo
}

const mutations = {
  [types.LOGIN_INFO]: (state, data) => {
    state.userInfo = data
    state.isLogin = true
  }
}

const actions = {
  checkLogin ({ dispatch }, flag = false) {
    if (wx.getStorageSync(LOGIN_TOKEN) && wx.getStorageSync(USER_INFO)) {
      dispatch('storageToObject', JSON.parse(wx.getStorageSync(USER_INFO)))
    } else {
      const curUrl = utils.getUrl(getCurrentPages())
      wx.getSetting({
        success (res) {
          if (res.authSetting['scope.userInfo']) {
            dispatch('autoLogin')
          } else {
            flag && wx.reLaunch({ url: '/pages/login/main?url=' + curUrl })
          }
        },
        fail () {
          flag && wx.reLaunch({ url: '/pages/login/main?url=' + curUrl })
        }
      })
    }
  },
  autoLogin ({ commit, dispatch }) {
    wx.login({
      success (res) {
        if (res.code) {
          api.login({ code: res.code }).then(res => {
            wx.setStorage({ key: LOGIN_TOKEN, data: res.data.data.token })
            commit(types.LOGIN_INFO, res.data.data)
            dispatch('updateUserInfo', res.data.data.token)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  updateUserInfo ({ commit }, data) {
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              const params = {
                token: data,
                name: res.userInfo.nickName,
                head_icon: res.userInfo.avatarUrl
              }
              api.updateUserInfo(params)
              commit(types.LOGIN_INFO, params)
              wx.setStorage({ key: USER_INFO, data: JSON.stringify(params) })
            }
          })
        } else {
          console.log(res)
        }
      }
    })
  },
  storageToObject ({ commit }, data) {
    commit(types.LOGIN_INFO, data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
