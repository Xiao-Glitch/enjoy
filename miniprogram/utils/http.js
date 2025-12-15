import http from "wechat-http";

// 设置全局默认请求地址
http.baseURL = 'https://live-api.itheima.net';


// 设置请求拦截器
http.intercept.request = (config) => {

  // 常见错误
  // config.header.Authorization = wx.getStorageSync('token')
  config.header = {
    // 携带token
    Authorization: 'Bearer ' + wx.getStorageSync('token'),
    // 如果有传递token信息，可覆盖默认的header信息
    ...config.header
  }
  console.log('请求被我拦截了', config);
  return config
}

// 设置响应拦截器

http.intercept.response = (res) => {

  // console.log('响应被我拦截到了', res.data);
  if (res.data.code === 10000) {
    
    return res.data
  } else {
    wx.utils.toast(res.data.message || '业务错误')
    return Promise.reject(res.data)
  }
  
}
 

// 到出

export default http