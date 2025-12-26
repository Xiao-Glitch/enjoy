Page({
  data: {
    encryptedData: undefined,
    houseInfo: '',
    id: '',
    url: '',
    validTime: '',
  },
  onShareAppMessage() {
    const encryptedData = this.data.encryptedData
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index?encryptedData=' + encryptedData,
      imageUrl: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png',
    }
  },
  onLoad(query) {
    if (query.id) {
      this.getPassport(query.id)
    } else if (query.encryptedData) {
      this.getPassportShare(query.encryptedData)
    }
  },

    async getPassportShare(encryptedData) {
      if (!encryptedData) return wx.utils.toast('参数错误')
    const res = await wx.http.get('/visitor/share/' + encryptedData)
    // console.log(res);
    if (!res.data) return wx.utils.toast('未找到该信息')
    if (res.code !== 10000) return wx.utils.toast()
    this.setData({
      houseInfo: res.data.houseInfo,
      id: res.data.id,
      url: res.data.url,
      validTime: res.data.validTime
    })
    // console.log(res);
    
  }, 
  async getPassport(id) {
    const res = await wx.http.get('/visitor/' + id)
    // console.log(res);
    if (!res.data) return wx.utils.toast('未找到该访客')
    if (res.code !== 10000) return wx.utils.toast()
    this.setData({
      encryptedData: res.data.encryptedData,
      houseInfo: res.data.houseInfo,
      id: res.data.id,
      url: res.data.url,
      validTime: res.data.validTime
    })
    // console.log(res);
    
  },

  async saveQRCode() {
    try {
    const {path} = await wx.getImageInfo({
      src: this.data.url,
    })
    wx.saveImageToPhotosAlbum({
      filePath: path
    })
  } catch (err) {
    wx.utils.toast('保存失败, 稍后重试')
  }
  }
})
