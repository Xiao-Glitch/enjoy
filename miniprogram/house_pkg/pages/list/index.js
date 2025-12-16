Page({
  data: {
    dialogVisible: false,
    list: [],
  },

  // 页面显示获取房屋列表
  onShow() {
    this.getList()
  },

  async getList() {
    const res = await wx.http.get('/room')
    console.log(res)
    this.setData({
      list: res.data,
    })
  },

  swipeClose(ev) {
    const { position, instance } = ev.detail
    this.setData({
      id: ev.mark.id,
    })
    // console.log(ev);

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })

      // swiper-cell 滑块关闭
      instance.close()
    }
  },
  async dialogClose(e) {
    // console.log(e);
    if (e.detail === 'confirm') {
      await wx.http.delete(`/room/${this.data.id}`)
      
      // 乐观更新
      this.setData({
        list: this.data.list.filter((v) => v.id !== this.data.id)
      })
    }
  },
  goDetail(ev) {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + ev.mark.id,
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
