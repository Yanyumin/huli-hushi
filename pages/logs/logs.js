//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  toIndex () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
