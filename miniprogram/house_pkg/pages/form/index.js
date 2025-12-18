// \u4e00-\u9fa5] 中文验证规则
import validate from 'wechat-validate'

Page({
  // 通过behaviors注入validate方法
  behaviors: [validate],
  // 定义表单数据的验证规则
  rules: {
    mobile: [
      { required: true, message: '请填写手机号!' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
    ],
    name: [
      { required: true, message: '请填写业主姓名!' },
      { pattern: /^[\u4e00-\u9fa5]{2,4}$/, message: '请填写中文' },
    ],
    idcardBackUrl: [{ required: true, message: '请上传身份证人像面' }],
    idcardFrontUrl: [{ required: true, message: '请上传身份证国徽面' }],
  },
  data: {
    id: undefined,
    point: '',
    building: '',
    room: '',
    mobile: '',
    gender: 1,
    name: '',
    idcardFrontUrl: '',
    idcardBackUrl: '',
  },
  goList() {
    wx.reLaunch({
      url: '/house_pkg/pages/list/index',
    })
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({ [type]: '' })
  },
  onLoad({ point, building, room, id }) {
    if (id) {
      this.getDetail(id)
      // console.log(id);
      wx.setNavigationBarTitle({title: '修改房屋信息'})
    } else {
      
      this.setData({ point, building, room })
      wx.setNavigationBarTitle({title: '添加房屋信息'})
    }
  },

  async getDetail(id) {
    const res = await wx.http.get(`/room/${id}`)

    this,this.setData({
      ...res.data
    })
  },

  //提交审核
  async onSubmit() {
    // 校验所有的rules
    const isAllValid = this.validate()
    // console.log(isAllValid);
    if (isAllValid === false) return

    // eslint-disable-next-line no-unused-vars
    const { __webviewId__, status, ...body } = this.data
    // console.log(id, __webViewId__)
    // console.log(body);
    
    // 提交表单
    await wx.http.post('/room', body)
    // 后退回列表页，后退四级，中间的页面都要销毁
    wx.utils.toast('提交成功！')
    setTimeout(() => {
      wx.navigateBack({ delta: body.id ? 2 : 4 })
    }, 400);
    // console.log(res)
  },

  // 选择图片
  async choosePicture(e) {
    // 解构出事件参数
    const { type } = e.mark
    const { tempFiles } = await wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
    })

    if (tempFiles[0].size > 1024 * 1024 * 2) {
      return wx.utils.toast('图片不能大于2M')
    }
    // console.log(res.tempFiles[0].tempFilePath);
    const res = await wx.http.upload('/upload', {
      name: 'file',
      filePath: tempFiles[0].tempFilePath,
    })
    // console.log(res);
    this.setData({
      // 对象key 用[]插值
      [type]: res.data.url,
    })
  },
})
