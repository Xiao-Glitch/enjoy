// house_pkg/pages/locate/index.ts
import qqmapsdk from "../../../utils/qqmapsdk"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    address: ''
  },

  search({longitude, latitude}) {
    qqmapsdk.search({
      location: {
        longitude,
        latitude
      },
      keyword: '住宅小区',
      page_size: 5,
      success: (res) => {
        // console.log(res);
        this.setData({
          list: res.data
        })
      }
    })
  },

  getPonit({ longitude, latitude}) {
    qqmapsdk.reverseGeocoder({
      location: {
        longitude,
        latitude
      },
      success: (res) => {
        // console.log('逆地址解析', res);
        this.setData({
          address: res.result.address
        })
        
      }
    })
  },

  // 打开地图选择位置
  async chooseLocation() {
    const {name, latitude, longitude} = await wx.chooseLocation()
    // console.log('选择位置', res);
    this.setData({
      address: name
    })
    // 基于新选择的经纬度，重新地理位置搜索
    this,this.search({latitude, longitude})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() { 
    const { longitude, latitude } = await wx.getLocation({
      type: 'wgs84',
    })
    this.search({ longitude, latitude })
    this.getPonit({ longitude, latitude })
    console.log('当前地理位置：' ,{ longitude, latitude });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})