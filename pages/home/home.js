// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../img/cvr.png',
      '../../img/dingdan.png',
      '../../img/photos.jpg',
    ],
    orderData: [{
      orderNum: '1234568',
      status: '2',
      proImg: '../../img/cvr.png',
      proName: '打针',
      Price: '198',
      time: '2019-9-26 14:00',
      amount: 1
    },{
      orderNum: '1234568',
      status: '4',
      proImg: '../../img/cvr.png',
      proName: '打针',
      Price: '198',
      time: '2019-9-26 14:00',
      amount: 1
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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