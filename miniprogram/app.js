// app.js

import utils from "./utils/utils"
import http from "./utils/http"
// 注册到全局wx对象上
wx.utils = utils
wx.http = http

App({
  globalData: {},
})
