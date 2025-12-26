Page({
  data: {
    visitorList: [],
    isEmpty: false,
  },

  onLoad() {
    this.getVisitorList()
    this.getMoreVisitor = wx.utils.throttle(() => {
      if (!this.data.hasMore) return
      this.getVisitorList(++this._current)
    }, 500)
  },
  async getVisitorList(current = 1, pageSize = 5) {
    const {
      code,
      data: {pageTotal, rows: visitorList },
    } = await wx.http.get('/visitor', { current, pageSize })

    if (code !== 10000) return wx.utils.toast()
    this.setData({
      hasMore: pageTotal > current,
      visitorList: this.data.visitorList.concat(visitorList),
      isEmpty: visitorList.length === 0
    })

    this._current = current
  },
  goPassport(ev) {
    wx.navigateTo({
      url: '/visitor_pkg/pages/passport/index?id=' + ev.mark.id,
    })
    // console.log(ev);
    
  },

  
})
