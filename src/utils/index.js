import qs from 'qs'

function getUrl (pages) {
  const curPage = pages[pages.length - 1]
  const params = qs.stringify(curPage.options)
  return encodeURIComponent(curPage.route + (params ? '?' + params : params))
}

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date, format = '-') {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join(format)
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  getUrl
}
