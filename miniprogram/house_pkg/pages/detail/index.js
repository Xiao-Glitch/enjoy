Page({

  data: {
    house: {}
  },

  onLoad(query) {
    const {id} = query
    this,this.setData({
      id
    })
    this.getDetail(id)
  },

  async getDetail(id) {
    const res = await wx.http.get(`/room/${id}`)
    this.setData({
      house: res.data
    })
    console.log(res);
    
  },

  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index?id=' + this.data.id,
    })
  },
})
