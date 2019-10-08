// pages/costList/costList.js
const {
  request
} = require("../../utils/request")
let costList = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveCost1: 10,
    cost1: 10,
    costValue1: 1,
    list: '',
    orderId: '',
    unitList: [],
    allCost: ''
  },
  onChange(event) {
    this.setData({
      costValue1: event.detail,
    })
  },
  addChange(e) {
    debugger
    let price = e.currentTarget.dataset['price']
    let amount = e.currentTarget.dataset['amount']
    let index = e.currentTarget.dataset['index']
    let list1 = this.data.list
    let saveCost1 = costList[index].Money
    list1[index].amount = amount
    let cost = parseInt(price) + parseInt(saveCost1)
    list1[index].Money = cost
    // costList = list1
    this.setData({
      cost1: cost,
      list: list1
    })
  },
  cutChange(e) {
    let price = e.currentTarget.dataset['price']
    let amount = e.currentTarget.dataset['amount']
    let index = e.currentTarget.dataset['index']
    let saveCost1 = costList[index].Money
    let list1 = this.data.list
    list1[index].amount = amount
    let cost = parseInt(price) - parseInt(saveCost1)
    list1[index].Money = cost
    // costList = list1
    this.setData({
      cost1: cost,
      list: list1
    })
  },
  getUnitList () {
    request({
        url: 'NurseOrder/GetUnitList',
        data: {orderId:  this.data.orderId}
    }).then(res => {
        // if (res.data.ResultCode === '0') {
          let arr = []
          let unitList = []
          let allCost = 0
          for (let i in res.data.UnitList) {
            let obj = res.data.UnitList[i]
            obj.amount = 1
            arr.push(obj)
            allCost = parseInt(res.data.UnitList[i].Money) + allCost
            costList.push(res.data.UnitList[i].Money)
            unitList.push(res.data.UnitList[i].UnitNo)
          }
          this.setData({
            list: arr,
            unitList: unitList,
            allCost
          })
          costList = arr
        // }
    })
  },
  submit () {
    request({
      url: 'NurseOrder/GetUnitMoney',
      data: {visitNo: this.data.unitList.join(',')}
    }).then(res => {
        if (res.data.ResultCode === '0') {
          request({
            url: 'NurseOrder/CreateBillOrder',
            data: {
              visitNo: this.data.unitList.join(','),
              orderId: this.data.orderId,
              recipeSeq: '',
              prescMoney: res.data.SumMoney,
              Remark: ''
            }
          }).then(res => {
              if (res.data.ResultCode === '0') {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.switchTab({
                  url: '../index/index'
                })
              } else {
                wx.showToast({
                  title: '提交失败',
                  icon: 'fail',
                  duration: 2000
                })
              }
          })
        } else {
          wx.showToast({
            title: '提交失败',
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
      orderId: options.id
    })
    this.getUnitList()
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