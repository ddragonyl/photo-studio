const request = (url, method, data, complete) => {
  let header = {}
  return new Promise((success, fail) => {
    wx.request({ url, method, data, header, success, fail, complete })
  })
}

export default request
