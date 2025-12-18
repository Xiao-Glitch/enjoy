// map.js
// import qqmapsdk from "../../../utils/qqmapsdk"

Page({
  data: {
    list: [],
    latitude: 40.060539,
    longitude: 116.343847,
    scale: 18,
    markers: [
      {
        id: 1,
        latitude: 40.060539,
        longitude: 116.343847,
        width: 32,
        height: 50,
      },
      {
        id: 2,
        latitude: 40.061539,
        longitude: 116.341847,
        iconPath: '../../../static/images/marker.png',
        width: 40,
        height: 40,
      },
    ],
  },
  onLoad(query) {
    this.setData({
      id: query.id
    })
    this.getRepairDetail(this.data.id)
  },
  async getRepairDetail(id) {
    const res = await wx.http.get(`/repair/${id}`)
    this.setData({
      list: res.data
    })
    // console.log(res);
    
  }
})
