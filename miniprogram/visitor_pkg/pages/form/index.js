import validate from 'wechat-validate'

Page({
  behaviors: [validate],
  data: {
    name: '',
    gender: 1,
    mobile: '',
    houseId: undefined,
    visitDate: '',
    dateLayerVisible: false,
    houseLayerVisible: false,
    houseList: [],
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime() + 86400000 * 2,
  },

  rules: {
    name: [
      { required: true, message: '请填写访客姓名' },
      { pattern: /^[\u4e00-\u9fa5]{2,4}$/, message: '请填写中文' },
    ],
    mobile: [
      { required: true, message: '请填写手机号!' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
    ],
    houseId: [{ required: true, message: '请选择到访房屋' }],
    visitDate: [{ required: true, message: '请选择来访日期' }],
  },
  onLoad() {
    this.getHouseList()
  },
  // 获取房屋列表
  async getHouseList() {
    const res = await wx.http.get('/house')

    if (res.code !== 10000) return wx.toast('获取数据失败')
    // console.log('房屋列表', res)
    this.setData({
      houseList: res.data,
    })
  },
  selectHouseInfo(ev) {
    // console.log(ev.detail);
    this.setData({
      houseInfo: ev.detail.name,
      houseId: ev.detail.id,
    })
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },

  selectDateInfo(ev) {
    this.setData({
      visitDate: wx.utils.timestampToDate(ev.detail),
      dateLayerVisible: false,
    })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  async goPassport() {
    if (!this.validate()) return
    const res = await wx.http.post('/visitor', {
      houseId: this.data.houseId,
      name: this.data.name,
      gender: this.data.gender,
      mobile: this.data.mobile,
      visitDate: this.data.visitDate,
    })
    if (res.code !== 10000) return wx.utils.toast('提交失败')
    wx.utils.toast('提交成功')
    setTimeout(() => {
      wx.redirectTo(
        {
          url: '/visitor_pkg/pages/passport/index?id=' + res.data.id
        }
      )
    }, 550)
  },
})
