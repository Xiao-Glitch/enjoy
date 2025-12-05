// app.js

import utils from "./utils/utils"
import http from "./utils/http"
// 注册到全局wx对象上
wx.utils = utils
wx.http = http

App({
  token: wx.getStorageSync('token') || '',
  globalData: {},
  setToken(key, token) {
    // 保存token到全局变量App
    this[key] = token
    // 保存token到本地缓存
    wx.setStorageSync(key, token)
  },
})
