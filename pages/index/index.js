//index.js
const {
  request, pullDownrequest
} = require("../../utils/request")
import Dialog from 'vant-weapp/dialog/dialog';
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../img/swiper1.jpg',
      '../../img/swiper2.jpg'
    ],
    oderList: [],
    todayOderList: [],
    showEvent: true,
    todayServiceShow: false,
    show: false,
    remark: '',
    cancelOrderId: '',
    explainShow: true,
    explainTimer: '',
    explainTime: 5
  },
  remarkChange: function (e) {
      this.setData({
          remark: e.detail.value
      })
  },
  cancelService (e) {
      this.setData({
          show: true,
          cancelOrderId: e.detail.value
      })

  },
    falseCancel() {
        this.setData({
            show: false, 
            remark: ''
        })
    },
  clickEvent () {
    this.getList()
    this.setData({
      showEvent: true,
      todayServiceShow: false
    })
  },
  clickToday () {
    this.getTodayList()
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
  getTodayList () {
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: 'NurseOrder/GetNurseList',
      data: {
          type: 'today', nurseId:wx.getStorageSync('userInfo').Id
      }
  }).then(res => {
      if (res.data.ResultCode === '0') {
        let { NurseList } = res.data
        for (let i in NurseList) {
          NurseList[i].status = NurseList[i].OrderStatus
          NurseList[i].Price = NurseList[i].ItemMoney
        }
        this.setData({
          todayOderList: NurseList
        })
      }
      wx.hideLoading()
    })
  },
  getList () {
    wx.showLoading({
      title: '加载中',
    })
    if (!wx.getStorageSync('userInfo').Id) {
      wx.setStorageSync('explainShow', false)
    }
    request({
      url: 'NurseOrder/GetNurseList',
      data: {
          type: '',
          nurseId: wx.getStorageSync('userInfo').Id
      }
    }).then(res => {
      if (res.data.ResultCode === '0') {
        let { NurseList } = res.data
        let arr = []
        for (let i in NurseList) {
          let obj = {}
          if (NurseList[i].OrderStatus == 0 && !NurseList[i].IsStatus) {
            NurseList[i].status = NurseList[i].OrderStatus
            NurseList[i].Price = NurseList[i].ItemMoney
            obj = NurseList[i]
            arr.push(obj)
          }
        }
        this.getTodayList()
        this.setData({
            oderList: arr
        })
      }
      wx.hideLoading()
      wx.hideNavigationBarLoading(); //完成停止加载图标
      wx.stopPullDownRefresh();
    })
  },
  clickOrder(e) {
      let id = e.detail.value
      wx.navigateTo({
          url: '../infolist/infolist?id=' + id,
      })
  },
  acceptService (e) {
    let that = this
    wx.showLoading({
      title: '正在提交',
      mask: 'true'
    })
    request({
        url: 'NurseOrder/ReceiveSuccess',
        data: {orderId: e.detail.value}
    }).then(res => {
        if (res.data.ResultCode === '0') {
            wx.showToast({
                title: '成功接受',
                icon: 'success',
                duration: 2000,
                success: function () {
                  that.getList()
                  that.getTodayList()
                  that.setData({
                    showEvent: false,
                    todayServiceShow: true
                  })
                }
            })
        }
    })
  },
  toquxiao(e) {
      let that = this
      wx.showLoading({
        title: '正在提交',
        mask: 'true'
      })
      request({
          url: 'NurseOrder/BillOrderFailed',
          data:{
              orderId:e.detail.value
          }
      }).then(res => {
          if (res.data.ResultCode === '0') {
              wx.showToast({
                  title: '成功取消',
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                      that.clickToday()
                  }
              })
          }

      })

  },
  sureCancel (e) {
    let that = this
    if (!that.data.remark) {
        wx.showToast({
            title: '请填写原因',
            icon: 'none',
            duration: 2000
        })
        return
    }
    wx.showLoading({
      title: '加载中',
    })
    request({
        url: 'NurseOrder/ReceiveFailed',
        data: {orderId: that.data.cancelOrderId, remark: that.data.remark}
    }).then(res => {
        if (res.data.ResultCode === '0') {
            wx.showToast({
                title: '成功退回',
                icon: 'success',
                duration: 2000,
                success: function () {
                  that.setData({
                      show: false,
                      remark: ''
                  })
                  that.getList()
                }
            })
        }
        wx.hideLoading()
    })
  },
  toAppraise(e) {
      wx.navigateTo({
        url: '../pingjia/pingjia?id=' + e.detail.value
      })
  },
  explainTimer () {
    let self = this
    let explainShow = wx.getStorageSync("explainShow")
    self.setData({
      explainShow
    })
    if (self.data.explainShow !== '' && self.data.explainShow !== null && !self.data.explainShow) {
      return
    }
    self.setData({
      explainShow: true
    })
    self.data.explainTimer = setInterval(() => {
      if (self.data.explainTime) {
        let explainTime = self.data.explainTime - 1
        self.setData({
          explainTime
        })
      } else {
        self.setData({
          explainShow: false
        })
        wx.setStorageSync('explainShow', false)
        clearInterval(self.data.explainTimer)
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');
    wx.setStorageSync('hasLocation', true)
    if (!token) {
        console.log('没有 token 跳转到登录授权页');
        wx.navigateTo({
            url: '/pages/login/login',
        });
    }


    let userId = wx.getStorageSync('userInfo').Id
    let params = {
        Id: userId
    }
     request({
         url: 'NurseRegister/Detail',
         data: params,
         method: 'GET'
     }).then(res => {
         console.log(res); 
         if (res.data.ResultCode === 1) {
             wx.setStorageSync('userInfo', res.data.row)
             if (res.data.row.AuditStatus === 1) {
                 console.log('通过');

                 // wx.showToast({
                 //     title: '您的审核已通过!',
                 //     icon: 'none',
                 //     duration: 2000
                 // })
             } else if (res.data.row.AuditStatus === 2) {
                 console.log('不通过')

                 Dialog.confirm({
                     title: '您的审核未通过',
                     message: '原因: ' + res.data.row.RejectReason + ' \n 去重新提交'
                 }).then(() => {
                     wx.navigateTo({
                         url: '../../perfectmyinfo/perfectmyinfo'
                     })
                 }).catch(() => {
                     // on cancel
                 });
             }


         }
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
    this.getList()
    this.getTodayList()
    this.explainTimer()
   
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
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    this.getList()
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
