// map.js
import qqmapsdk from '../../../utils/qqmapsdk'

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
      id: query.id,
    })
    this.getRepairDetail(this.data.id)
    this.getPolyline()
  },
  async getRepairDetail(id) {
    if (!id) return wx.utils.toast('参数错误')
    const res = await wx.http.get(`/repair/${id}`)
    if (res.code !== 10000) return wx.utils.toast()
    this.setData({
      list: res.data,
    })
    console.log(this.data.list)
  },

  getPolyline() {
    qqmapsdk.direction({
      mode: 'bicycling',
      from: '40.061539,116.341847',
      to: '40.060539,116.343847',
      success: (res) => {
        // console.log(res);
        const coors = res.result.routes[0].polyline
        const points = []
        const kr = 1000000
        for (let i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr
        }

        for (let i = 0; i < coors.length; i += 2) {
          points.push({ latitude: coors[i], longitude: coors[i + 1] })
        }
        // console.log(points)
        this,this.setData({
          latitude: points[0].latitude,
          longitude: points[0].longitude,
          polyline: [{
            points,
            color: '#5591af',
            width: 4,

          }]
        })
      },
    })
  },

  editRepair(ev) {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index?id=' + ev.mark.id
    })
  }
})
