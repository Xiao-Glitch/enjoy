import validate from 'wechat-validate'

Page({
  // 通过behaviors注入validate方法
  behaviors: [validate],
  data: {
    countDownVisible: false,
    mobile: '',
    code: '',
  },

  onLoad(query) {
    this.query = query
    // console.log(query);
    
  },

  // 校验规则
  rules: {
    mobile: [
      { required: true, message: '请填写手机号!' },
      { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确!' }
    ],
    code: [
      { required: true, message: '请填写短信验证码!'},
      { pattern: /^\d{6}$/, message: '验证码错误!' }
    ]
  },
  countDownChange(ev) {
    
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },

  async getSMSCode() {
    const { valid, message } = this.validate('mobile')
    if (!valid) {
      wx.showToast({
        title: message,
        icon: 'none',
        mask: true
      })
      return
    } else {
      this.setData({
        countDownVisible: true
      })

      const res = await wx.http.get('/code', {
        mobile: this.data.mobile
      })

      setTimeout(() => {
        wx.utils.toast(res.data.code)
      }, 2800)
    }
  },

  // 登录表单提交
  async onSubmit() {
    const {mobile, code} = this.data
    // console.log(mobile, code);

    const isValidate = this.validate()
    if(isValidate) {
      const res = await wx.http.post('/login', {
        mobile,
        code
      })
    //   console.log(res);
      const app = getApp()
      app.setToken('token', res.data.token)
      app.setToken('refresh_token', res.data.refreshToken)
      wx.utils.toast('登录成功')
      setTimeout(() => {
        wx.redirectTo({
          url: this.query.redirectUrl
        })
        
      }, 1500)
    }
    
  }
})
