// pages/patientInfo/patientinfo.js
const {
  request
} = require("../../utils/request")
import { formatDate } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['外科', '骨科', '神经科'],
    depart: '外科',
    workUnit: '',
    patientNo: '',
    beHosp: '2019-01-01',
    outHosp: '2019-01-01',
    describe: '',
    nowDate: '',
    character: 1,
    characterDescribe: '',
    recommendList: [{
      proLogo: '../../img/cvr.png',
      proName: '打针',
      proDesc: '打针打针打针',
      id: '123'
    }],
    orderId: ''
  },

  workUnitOnChange (e) {
    this.setData({
      workUnit: e.detail
    })
  },
  patientNoChange (e) {
    this.setData({
      patientNo: e.detail
    })
  },
  departBindChange(e) {
    this.setData({
      depart: this.data.columns[e.detail.value]
    })
  },
  bindbeHospChange: function (e) {
    this.setData({
      beHosp: e.detail.value
    })
  },
  bindoutHospChange: function (e) {
    this.setData({
      outHosp: e.detail.value
    })
  },
  describeChange (e) {
    this.setData({
      describe: e.detail
    })
  },
  characterTap (e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      character: type
    })
  },
  characterDescribeChange (e) {
    this.setData({
      characterDescribe: e.detail
    })
  },
  submitThis () {
    request({
      url: 'Auth/GetAppNurseUrlDetail',
      data: {orderId: this.data.orderId}
    }).then(res => {
        if (res.data.ResultCode === '0') {
          wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
          })
        } else {
          
          wx.showToast({
            title: '保存失败',
            icon: 'fail',
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
      nowDate: formatDate(),
      orderId: options.id
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