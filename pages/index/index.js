//index.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../img/cvr.png',
      '../../img/dingdan.png',
      '../../img/photos.jpg'
    ],
    oderList: [{
      orderNum: "vs123333333322222",
      status: "1",
      proImg: "../../img/cvr.png",
      proName: "看看病",
      Price: "328.00",
      time: "2019-09-09",
      amount: "1",

    },
    {
      orderNum: "vs123333333322222",
      status: "2",
      proImg: "../../img/cvr.png",
      proName: "护理康复",
      Price: "328.00",
      time: "2019-09-09",
      amount: "1",

    }],
    todayOderList: [{
      orderNum: "vs123333333322222",
      status: "2",
      proImg: "../../img/cvr.png",
      proName: "看看病ya",
      Price: "328.00",
      time: "2019-09-09",
      amount: "2",

    },
    {
      orderNum: "vs123333333322222",
      status: "2",
      proImg: "../../img/cvr.png",
      proName: "护理康复ya",
      Price: "328.00",
      time: "2019-09-09",
      amount: "1",

    }],
    showEvent: true,
    todayServiceShow: false
  },
  clickEvent () {
    this.setData({
      showEvent: true,
      todayServiceShow: false
    })
  },
  clickToday () {
    this.setData({
      showEvent: false,
      todayServiceShow: true
    })
  },
  startService () {
    console.log(123)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const token = wx.getStorageSync('token');
    // if (!token) {
    //     console.log('没有 token 跳转到登录授权页');
    //     wx.navigateTo({
    //         url: '/pages/login/login',
    //     });
    //     // 没有授权就退出函数，需要返回 Promise 对象，防止外部 then 的时候报错。
    // }
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
