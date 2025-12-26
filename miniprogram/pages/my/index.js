Page({
  goLogin() {
    if(wx.getStorageSync('token')) return wx.utils.toast('已登录')
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },

  data: {
    userInfo: {}
  },

  // 用户显示触发
  onShow() {
    const token = wx.getStorageSync('token')
    if (token) {
      // 获取用户信息
      this.getUserInfo()
      console.log('token', token);
      
    }
  },

  // 获取用户信息
  async getUserInfo() {
    const res = await wx.http.get('/userInfo')
    console.log('用户信息', res);
    this.setData({
      userInfo: res.data
    })
    
  }
})
