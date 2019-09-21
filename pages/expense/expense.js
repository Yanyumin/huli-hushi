// pages/expense/expense.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
door:200,
serve:200,
insurance:200,
consumable:200,
totalPrice:0,
  },
//   查看耗材费
onConsumable(){
wx.navigateTo({
    url: '../consumable/consumable'
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 let totalPrice = this.data.door + this.data.serve + this.data.insurance+this.data.consumable
 this.setData({
     totalPrice,
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