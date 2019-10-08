// pages/invite/invite.js
const {
  request
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ''
  },
  patientInfo (e) {
    wx.navigateTo({
      url: '../patient_info/patient_info?id=' + e.currentTarget.dataset['id'],
    })
  },
  getList () {
    request({
        url: 'Auth/GetAppNurseUrlList',
        data: {nurseId: wx.getStorageSync('userInfo').Id}
    }).then(res => {
        if (res.data.ResultCode === '0') {
          this.setData({
            list: res.data.NurseList
          })
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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