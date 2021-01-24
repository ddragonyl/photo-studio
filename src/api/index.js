import request from './request'

let baseUrl = process.env.PROXY_URL + '/api/v1'

const api = {
  getSides () { // 轮播图
    return request(`${baseUrl}/photo/getSides`, 'GET')
  },
  getProduct (params) { // 商品列表
    return request(`${baseUrl}/photo/getProduct`, 'GET', params)
  },
  getType () { // 分类列表
    return request(`${baseUrl}/photo/getType`, 'GET')
  },
  getProductDetail (params) { // 商品详情
    return request(`${baseUrl}/photo/getProductDetail`, 'GET', params)
  },
  login (params) { // 登录
    return request(`${baseUrl}/photo/login`, 'POST', params)
  },
  updateUserInfo (params) { // 修改信息
    return request(`${baseUrl}/photo/updateUserInfo`, 'POST', params)
  },
  getHistoryViews (params) { // 浏览历史
    return request(`${baseUrl}/photo/getHistoryViews`, 'GET', params)
  },
  createHistoryViews (params) { // 创建历史记录
    return request(`${baseUrl}/photo/createHistoryViews`, 'POST', params)
  },
  getCollect (params) { // 收藏列表
    return request(`${baseUrl}/photo/getCollect`, 'GET', params)
  },
  createCollect (params) { // 收藏
    return request(`${baseUrl}/photo/createCollect`, 'POST', params)
  },
  createBooking (params) { // 预约
    return request(`${baseUrl}/photo/createBooking`, 'POST', params)
  },
  getBooking (params) { // 预约列表
    return request(`${baseUrl}/photo/getBooking`, 'GET', params)
  },
  createFeedback (params) { // 反馈
    return request(`${baseUrl}/photo/createFeedback`, 'POST', params)
  },
  getFeedback (params) { // 反馈列表
    return request(`${baseUrl}/photo/getFeedback`, 'GET', params)
  },
  getContactUs (params) { // 联系我们
    return request(`${baseUrl}/photo/getContactUs`, 'GET', params)
  },
  bindMobile (params) { // 绑定手机号
    return request(`${baseUrl}/photo/bindMoble`, 'POST', params)
  },
  createOrder (params) { // 下单
    return request(`${baseUrl}/photo/createOrder`, 'POST', params)
  },
  getOrderList (params) { // 订单详情
    return request(`${baseUrl}/photo/getOrderList`, 'GET', params)
  },
  getActivityDetail (params) { // 活动详情
    return request(`${baseUrl}/photo/getActivityDetail`, 'GET', params)
  },
  getActivity (params) { // 活动列表
    return request(`${baseUrl}/photo/getActivity`, 'GET', params)
  }
}

export default api
