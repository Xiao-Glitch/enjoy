const utils = {
  /**
   * 轻提示
   * @param {*} title 提示内容
   */

  toast(title) {
    wx.showToast({
      title,
      icon: 'none',
      mask: true,
    })
  },
  /**
   * 日期格式化
   * @param {*} timestamp 
   * @returns 
   */
    timestampToDate(timestamp) {
    const date = new Date(timestamp * (timestamp.toString().length === 10 ? 1000 : 1))
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },


  /**
   * 防抖
   * @param {*} fn 
   * @param {*} delay 
   * @param {*} immediate 
   * @returns 
   */
  debounce(fn, delay, immediate) {
    let timer = null
    return function(...args) {
      if (timer) clearInterval(timer)
      if (immediate && !timer) fn.apply(this, args)
        timer = setTimeout(() => {
          fn.apply(this, args)
        }, delay)
    }
  },

  /**
   * 节流
   * @param {*} fn 
   * @param {*} delay 
   * @returns 
   */
  throttle(fn, delay) {
    let last = 0
    return function (...args) {
      const now = Date.now()
      if (now - last > delay) {
        fn.apply(this, args)
        last = now

      }
    }
  }
}

// 模块导出
export default utils

