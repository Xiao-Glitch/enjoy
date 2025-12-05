Page({
  data: {
    list: []
  },
  onLoad() {
    wx.utils.toast('欢迎使用 Enjoy+ 小程序')

    this.getData()
  },

  async getData() {
    // wx.request({
    //   method: 'GET',
    //   url: 'https://live-api.itheima.net/announcement',
    //   success: (res) => {
    //     // console.log(res.data);

    //     this.setData({
    //       list: res.data.data
    //     })
        
    //   }
    // })

  const res = await wx.http({
    method: 'GET',
    url: '/announcement',

  })


  console.log(res);
  this.setData({
    list: res.data
  })
  
  }
})
