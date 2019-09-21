// pages/perfectmyinfo/perfectmyinfo.js
import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    columns: ['外科', '骨科', '神经科'],
    sexClumn: ['男', '女'],
    titleClumns: ['护士', '护士长', '主任'],
    index: 0,
    workUnit: '',
    depart: '外科',
    userName: '',
    sex: '男',
    birthday: '1999-01-01',
    cardNo: '',
    phone: '',
    address: '',
    title: '护士'
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  workUnitOnChange (e) {
    this.setData({
      workUnit: e.detail
    })
  },
  userNameChange (e) {
    this.setData({
      userName: e.detail
    })
  },
  departBindChange(e) {
    this.setData({
      depart: this.data.columns[e.detail.value],
      index: e.detail.value
    })
  },
  sexBindChange (e) {
    this.setData({
      sex: this.data.sexClumn[e.detail.value]
    })
    Toast(`当前值：`);
  },
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  cardNoChange (e) {
    this.setData({
      cardNo: e.detail
    })
  },
  phoneChange (e) {
    this.setData({
      phone: e.detail
    })
  },
  addressChange (e) {
    this.setData({
      address: e.detail
    })
  },
  addressChange (e) {
    this.setData({
      address: e.detail
    })
  },
  titleBindChange (e) {
    this.setData({
      title: this.data.sexClumn[e.detail.value]
    })
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