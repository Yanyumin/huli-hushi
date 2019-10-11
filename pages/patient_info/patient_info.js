// pages/patient_info/patient_info.js
const {
  request
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['外科', '骨科', '神经科'],
    depart: '外科',
    workUnit: '南方医院',
    patientNo: '1120',
    beHosp: '2019-01-01',
    outHosp: '2019-01-01',
    describe: '烦躁,失眠',
    nowDate: '',
    character: 1,
    characterDescribe: '  平易近人,非常好相处',
    recommendList: [{
      proLogo: '../../img/cvr.png',
      proName: '打针',
      proDesc: '打针打针打针',
      id: '123'
    }],
    detailInfo: '',
    orderId: ''
  },
  getDetail () {
    request({
      url: 'Auth/GetAppNurseUrlDetail',
      data: {orderId: this.data.orderId}
    }).then(res => {
        if (res.data.ResultCode === '0') {
          let obj = {
            proLogo: '../../img/cvr.png',
            proName: res.data.NurseList[0].ItemName,
            proDesc: res.data.NurseList[0].ItemIntroduce,
            id: ''
          }
          let arr = [obj]
          this.setData({
            detailInfo: res.data.NurseList[0],
            recommendList: arr
          })
        } else {
          
          wx.showToast({
            title: '保存失败',
            icon: 'error',
            duration: 2000
        })
        }
    })
  },
 
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.id
    })
    this.getDetail()
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