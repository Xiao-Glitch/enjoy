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
  }
}

export default utils

