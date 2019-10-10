//index.js
const {
  request
} = require("../../utils/request")
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
    oderList: [],
    todayOderList: [],
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
    request({
      url: 'NurseOrder/GetNurseList',
      data: {
          type: 'today', nurseId:wx.getStorageSync('userInfo').Id
      }
  }).then(res => {
      let { NurseList } = res.data
      for (let i in NurseList) {
        NurseList[i].status = NurseList[i].OrderStatus
        NurseList[i].Price = NurseList[i].ItemMoney
      }
      this.setData({
        todayOderList: NurseList
      })
    })
    this.setData({
      showEvent: false,
      todayServiceShow: true
    })
  },
  startService (e) {
    wx.navigateTo({
        url: '../order_details/order_details?id=' + e.detail.value,
    })
  },
  getList () {
    request({
      url: 'NurseOrder/GetNurseList',
      data: {
          type: '',
          nurseId: wx.getStorageSync('userInfo').Id
      }
  }).then(res => {
      console.log(res);
      let { NurseList } = res.data
      for (let i in NurseList) {
        NurseList[i].status = NurseList[i].OrderStatus
        NurseList[i].Price = NurseList[i].ItemMoney
      }
      console.log(NurseList)
      this.setData({
          oderList: NurseList
      })
    })
  },
  clickOrder(e) {
      let id = e.detail.value
      wx.navigateTo({
          url: '../infolist/infolist?id=' + id,
      })
  },
  acceptService (e) {
    request({
        url: 'NurseOrder/ReceiveSuccess',
        data: {orderId: e.detail.value}
    }).then(res => {
        if (res.data.ResultCode === '0') {
            wx.showToast({
                title: '成功接受',
                icon: 'success',
                duration: 2000
            })
            this.getList()
        }
    })
  },
  sureCancel () {
    request({
        url: 'NurseOrder/ReceiveFailed',
        data: {orderId: e.detail.value, remark: ''}
    }).then(res => {
        if (res.data.ResultCode === '0') {
            wx.showToast({
                title: '成功退回',
                icon: 'success',
                duration: 2000
            })
        }
    })
  },
  toAppraise(e) {
      wx.navigateTo({
        url: '../pingjia/pingjia?id=' + e.detail.value
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    if (!token) {
        console.log('没有 token 跳转到登录授权页');
        wx.navigateTo({
            url: '/pages/login/login',
        });
    }
    this.getList()
    // this.clickToday()
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
