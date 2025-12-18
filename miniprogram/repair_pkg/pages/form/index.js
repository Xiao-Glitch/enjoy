import validate from 'wechat-validate'

Page({
  behaviors: [validate],
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 60 * 60 * 24 * 6 * 1000,
    houseList: [],
    houseName: '',
    repairItem: [],
    repairName: '',
    id: undefined,
    houseId: '',
    repairItemId: '',
    mobile: '',
    appointment: '',
    description: '',
    attachment: [],
  },
  rules: {
    houseId: [{ required: true, message: '请选择保修房屋！' }],
    repairItemId: [{ required: true, message: '请选择报修项目！' }],
    mobile: [
      { required: true, message: '请填写手机号码！' },
      { pattern: /^1[3-8]\d{9}$/, message: '请填写正确的手机号码！' },
    ],
    appointment: [{ required: true, message: '请填写预约时间！' }],
    description: [{ required: true, message: '请填写报修描述！' }],
  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  // 关闭报修弹窗
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  // 打开时间选择器
  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  // 关闭时间选择器
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  async submitForm() {
    // 验证表单
    if (!this.validate()) return
    const { houseId, repairItemId, mobile, appointment, description, attachment } = this.data
    const res = await wx.http.post('/repair', {
      houseId,
      repairItemId,
      mobile,
      appointment,
      description,
      attachment,
    })

    // 检测接口是否调用成功
    if (res.code !== 10000) return wx.utils.toast('提交失败')
    wx.utils.toast('提交成功')
    // 跳转导保修列表页面
    setTimeout(() => {
      wx.redirectTo({
        url: '/repair_pkg/pages/list/index',
      })
    }, 550)
  },
  // 选择房屋
  selectHouse(ev) {
    // console.log('selectHouse',ev.detail);
    this.setData({
      houseId: ev.detail.id,
      houseName: ev.detail.name,
    })
  },
  // 选择报修项目
  selectRepair(ev) {
    // console.log('selectRepair', ev.detail.name)
    this.setData({
      repairItemId: ev.detail.id,
      repairName: ev.detail.name,
    })
  },
  // 提交表单
  formatter(ev) {
    // console.log(this.data.currentDate);
    this.setData({
      appointment: wx.utils.timestampToDate(ev.detail),
      dateLayerVisible: false,
    })
  },
  // 选择文件后触发
  async afterRead(ev) {
    const res = await wx.http.upload('/upload', {
      name: 'file',
      filePath: ev.detail.file.tempFilePath,
    })
    // console.log(res.data.url);
    this.setData({
      attachment: [...this.data.attachment, res.data],
    })
  },
  // 删除图片
  uploaderDelete(ev) {
    this.setData({
      attachment: this.data.attachment.filter((v, index) => index !== ev.detail.index),
    })
  },

  // 文件读取前
  beforeRead(ev) {
    const { file, callback } = ev.detail
    if (file.type !== 'image') {
      wx.utils.toast('请上传图片')
      return callback(false)
    }

    if (file.size > 1024 * 1024 * 1) {
      wx.utils.toast('图片大小不能超过 1M')
      return callback(false)
    }
    callback(true)
  },
  onLoad() {
    this.getHouseList()
    this.getRepairList()
  },
  async getHouseList() {
    const res = await wx.http.get('/house')
    this.setData({
      houseList: res.data,
    })
  },
  async getRepairList() {
    const res = await wx.http.get('/repairItem')
    this.setData({
      repairItem: res.data,
    })
  },
})
