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
    CardImages:[],
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
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: 'NurseRegister/Detail',
      data: params,
      method: 'GET'
    }).then(res => {
      wx.hideLoading()
      if (res.data.ResultCode === 1) {
         wx.setStorageSync('userInfo', res.data.row)
          console.log(res);
          let imgs = ''
          if (!res.data.row.OtherImages) {
            imgs = ''
          } else {
            imgs = res.data.row.OtherImages.split(";")
          }
           let imgs1 = ''
           if (!res.data.row.CardImages) {
               imgs1 = ''
           } else {
               imgs1 = res.data.row.CardImages.split(";")
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
          CardImages: imgs1,
          birthday: Birth
        })
      } else if (res.data.ResultCode === 2) {
          wx.showToast({
              title: '很抱歉,您的审核未通过,请重新提交',
              icon: '',
              duration: 2000
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