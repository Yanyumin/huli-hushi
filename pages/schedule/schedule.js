// pages/schedule/schedule.js
const {request} = require("../../utils/request")
import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekTimes: [],
    selectTime: [],
    selectWeek: '',
    isAllday: 2,
    result: []
  },
  getDatas () {
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    let userId = wx.getStorageSync('userInfo').Id
    request({
      method: "GET",
      url: 'NurseSchedule/GetNurseSchedule',
      data: {
        nurId: userId
      }
    }).then(res=>{
        Toast.clear(true)
        if (res.data.ResultCode == '0') {
          this.setData({
            weekTimes: res.data.RegDays,
            selectTime: res.data.RegDays[0].TimeSlices,
            selectWeek: res.data.RegDays[0].Date
          })
          let timeArr = []
          for (let i in this.data.selectTime) {
            let item = this.data.selectTime[i]
            if (item.IsFull) {
              timeArr.push(item.SliceTime)
            }
          }
          this.setData({
            result: timeArr
          })
        } else {
          wx.showToast({
            title: '无数据',
            icon: 'fail',
            duration: 2000
          })
        }
    })
  },
  clickThisWeek (e) { 
    // if (this.data.isAllday) {
    //   return
    // }
    let index = e.currentTarget.dataset['index']
    this.setData({
      selectWeek: e.currentTarget.dataset['date'],
      selectTime: this.data.weekTimes[index].TimeSlices
    })
    let timeArr = []
    for (let i in this.data.selectTime) {
      let item = this.data.selectTime[i]
      if (item.IsFull) {
        timeArr.push(item.SliceTime)
      }
    }
    this.setData({
      result: timeArr
    })
  },
  alldayClick (e) {
    let index = e.currentTarget.dataset['isallday']
    if (this.data.isAllday == index) {
      this.setData({
        isAllday: 3,
        result: ''
      })
    } else {
      this.setData({
        isAllday: index,
        result: ''
      })
    }
    
  },
  onChange(event) {
    if (this.data.isAllday == 1 || this.data.isAllday == 0) {
      return
    }
    this.setData({
      result: event.detail
    });
  },
  submit () {
    if (this.data.isAllday == 1) {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000,
        success: function () {
          wx.switchTab({
            url: '../personal/personal'
          })
        }
      })
      
      return
    }
    let times = ''
    if (this.data.result.length == 0) {
      times = ''
    } else {
      times = this.data.result.join(',')
    }
    let userId = wx.getStorageSync('userInfo').Id
    request({
      method: "GET",
      url: 'NurseSchedule/GetNurseNoTime',
      data: {
        nurId: userId,
        regDate: this.data.selectWeek,
        sliceTime: times
      }
    }).then(res=>{
        if (res.data.ResultCode == '0') {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.switchTab({
                url: '../personal/personal'
              })
            }
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
    this.getDatas()
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