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
}

// 模块导出
export default utils

