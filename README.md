# 微信小程序
## 摄影影楼通
#### 由首页、分类和我的三部分组成。首页中由搜索和精彩推荐，全部套系、本期推荐、优惠活动和人气排名几个分类。分类模块分为：旅拍、婚纱、中式喜服写真、儿童和全家福等等。我的模块：我的预约、我的收藏、浏览记录在线客服、联系电话、商家地址和意见反馈。
##### 支持微信、百度、头条、支付宝四种平台打包！


## 项目预览
<img width="375" src="https://github.com/ddragonyl/photo-studio/blob/master/examples/preview.gif">

## 扫码体验
使用微信扫一扫体验小程序示例

<img width="200" src="http://oss.dragonyl.com/github/v2vison/experience.png">

## 用到的组件和依赖

* [mpvue](https://github.com/Meituan-Dianping/mpvue)
* [iview](https://github.com/TalkingData/iview-weapp)
* [dotenv](https://github.com/motdotla/dotenv)

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn install

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
