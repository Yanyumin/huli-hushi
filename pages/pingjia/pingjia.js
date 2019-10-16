// pages/pingjia/pingjia.js
const {
  request
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Score: 1,
    evaMsg: [
      '',
      '非常不满意',
      '不满意',
      '比较满意',
      '满意',
      '非常满意'
    ],
    opinion: '',
    false: false,
    orderId: ''
  },
  textareaChange (e) {
    this.setData({
      opinion: e.detail.value
    })
  },
  onChange(event) {
    this.setData({
      Score: event.detail
    });
  },
  submitOrderEva () {
    request({
      url: 'NurseOrder/OrderEvaluate',
      data: {
        orderId: this.data.orderId,
        content: this.data.opinion,
        score: this.data.Score
      }
    }).then(res => {
        if (res.data.ResultCode === '0') {
            console.log(res);
            
            wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000,
                success: function () {
                  wx.switchTab({
                    url: '../myoder/myoder'
                  })
                }
            })
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
        })
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    console.log(id)
    this.setData({
      orderId: id
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