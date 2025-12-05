// componts/auth/auth.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached() {

      const app = getApp()
      const isLogin = Boolean(app.token)
      this.setData({
        isLogin
      })
      
      if (!isLogin) {
        // wx.navigateTo 保留当前页面，跳转到应用内的某个页面

        // 获取当前页面栈数组
        const pages = getCurrentPages()
        // 获取当前页面实例
        const currentPage = pages[pages.length -1]
        const { route, options } = currentPage

        // 关闭当前页面，跳转到应用内的某个页面。
        wx.redirectTo({
          url: '/pages/login/index'
        })
      }
    }
  }
})