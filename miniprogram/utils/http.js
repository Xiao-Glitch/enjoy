import http from 'wechat-http'

// 设置全局默认请求地址
http.baseURL = 'https://live-api.itheima.net'

// 设置请求拦截器
http.intercept.request = (config) => {
  // 常见错误
  // config.header.Authorization = wx.getStorageSync('token')
  config.header = {
    // 携带token
    Authorization: 'Bearer ' + wx.getStorageSync('token'),
    // 如果有传递token信息，可覆盖默认的header信息
    ...config.header,
  }
  console.log('请求被我拦截了', config)
  return config
}

// 设置响应拦截器
http.intercept.response = async (res) => {
  const app = getApp()
  // console.log('响应被我拦截到了', res.data);
  if (res.data.code === 10000) {
    return res.data
  } else if (res.data.code === 401) {
    if (res.config.url.includes('/refreshToken')) {
      app.setToken('token', '')
      app.setToken('refresh_token', '')
      setTimeout(() => {
        wx.utils.toast('登录过期, 请重新登录')
      }, 500)
      return wx.navigateTo({
        url: '/pages/login/index',
      })
    }
    const reToken = await http.post(
      '/refreshToken',
      {},
      {
        header: {
          Authorization: `Bearer ` + wx.getStorageSync('refresh_token'),
        },
      }
    )
    // console.log(reToken)
    app.setToken('token', reToken.data.token)
    app.setToken('refresh_token', reToken.data.refreshToken)

    res.config.header = {
      Authorization: `Bearer ` + wx.getStorageSync('token'),
    }

    const reRes = await http(res.config)
    console.log('重新请求成功', reRes)
    return reRes
  } else {
    wx.utils.toast(res.data.message || '业务错误')
    return Promise.reject(res.data)
  }
}

// 导出

export default http
