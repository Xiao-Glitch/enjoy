Page({
  data: {
    list: [],
    isEmpty: false
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
    if (res.code !== 10000) return wx.toast('获取数据失败')
      console.log('报修列表', res);
    this.setData({
      list: res.data.rows,
      isEmpty: res.data.rows.length === 0
    })
    
  }
})
