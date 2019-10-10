// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */  
  data: {
    userInfo: ''
  },
  toPersonalInfo () {
      let user = wx.getStorageSync('userInfo')
    if (user.IDCard) {
      wx.navigateTo({
        url: '../myinfo/myinfo',
      })
    } else {
      wx.navigateTo({
        url: '../perfectmyinfo/perfectmyinfo',
      })
    }
  },
  toQrcode () {
    wx.navigateTo({
      url: '../qrcode/qrcode',
    })  
  },
  toPatientList () {
    wx.navigateTo({
      url: '../invite/invite',
    })
  },
  toSchedule () {
    wx.navigateTo({
      url: '../schedule/schedule',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})