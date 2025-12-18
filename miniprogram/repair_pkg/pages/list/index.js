Page({
  data: {
    list: []
  },
  onLoad() {
    this.getRepairList()
  },
  goDetail(ev) {
    wx.navigateTo({
      url: '/repair_pkg/pages/detail/index?id=' + ev.mark.id,
    })
  },
  addRepair() {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index',
    })
  },
  async getRepairList() {
    const res = await wx.http.get('/repair')
    console.log('报修列表', res);
    this.setData({
      list: res.data.rows
    })
    
  }
})
