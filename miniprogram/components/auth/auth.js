// componts/auth/auth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {},

  lifetimes: {
    // 相当于vue的mounted
    attached() {
      const app = getApp()
      const isLogin = Boolean(app.token)
      this.setData({
        isLogin,
      })

      if (!isLogin) {
        // wx.navigateTo() 保留当前页面，跳转到应用内的某个页面
        // 相当于vue的this.$router.push()

        // wx.redirectTo() 相当于Vue的this.$router.replace()

        // 获取当前页面栈数组
        const pages = getCurrentPages()
        // 获取当前页面实例
        const currentPage = pages[pages.length - 1]
        // console.log(currentPage);

        // 重写页面的生命周期函数,未登录时,不执行 onLoad, onShow, onReady
        currentPage.onShow = () => {}

        currentPage.onLoad = () => {}

        currentPage.onReady = () => {}

        const { route, options } = currentPage
        console.log(route, options)

        // 关闭当前页面，跳转到应用内的某个页面。
        wx.redirectTo({
          url: '/pages/login/index?redirectUrl=/' + route,
        })
      }
    },
  },
})
