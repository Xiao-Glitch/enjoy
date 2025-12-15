// house_pkg/pages/room/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    point: '',
    building: '',
    rooms: []
  },

  onLoad({ point, building }) {
    // 创建房间
    // console.log(point, building);
    
    this.fake(point, building)
  },
  fake(point, building) {
    // 生成多少个房间
    const size = Math.floor(Math.random() * 19) + 1
    const rooms = []
    for (let i = 0; i < size; i++) {
      // 楼层号生成 1 ~ 20
      const floor = Math.floor(Math.random() * 19) + 1
      // 具体的房间生成1 ~ 3
      const No = Math.floor(Math.random() * 2) + 1
      const room = [floor, 0, No].join('')
      // 具体是否有重复的房间号
      if (rooms.includes(room)) return
      // 记录生成完整的房间号
      rooms.push(room)
    }
    console.log('rooms', rooms);
    
    // 渲染数据
    this.setData({ rooms, point, building })
  }

})