// pages/myinfo/myinfo.js
const {
  request
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    otherImgs: [],
    birthday: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = wx.getStorageSync('userInfo').Id
    let params = {
      Id: userId
    }
    request({
      url: 'NurseRegister/Detail',
      data: params,
      method: 'GET'
    }).then(res => {
      if (res.data.ResultCode === 1) {
          console.log(res);
          let imgs = ''
          if (!res.data.row.OtherImages) {
            imgs = ''
          } else {
            imgs = res.data.row.OtherImages.split(",")
          }
          let Birth = ''
          if (!res.data.row.Birthday) {
            Birth = ''
          } else {
            Birth = res.data.row.Birthday.slice(0, 10)
          }
        this.setData({
          userInfo: res.data.row,
          otherImgs: imgs,
          birthday: Birth
        })
      }
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