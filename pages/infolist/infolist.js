// pages/infolist/infolist.jsconst {
const {
    request
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    infolist:{},
    orderId: '',
    show: false,
    remark: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let id = options.id
    let infolist =this.data.infolist
    this.setData({
        orderId: id
    })
    // if (id=='1') {
    //     infolist.status = "待确认"
    //     this.setData({
    // infolist
    //     })
    // } else if (id=='2') {
    //     infolist.status = "待服务"
    //         this.setData({
    //             infolist
    //         })
    // } else if (id=='3') {
    //     infolist.status = "服务中"
    //     this.setData({
    //         infolist
    //     })
    // } else if (id=='4') {
    //     infolist.status = "待评价"
    //     this.setData({
    //         infolist
    //     })
        
    // }else if (id=="5") {
    //     infolist.status = "完成"
    //     this.setData({
    //         infolist
    //     })
    // }
    this.getOrderDetail()

  },
  
  remarkChange: function (e) {
    this.setData({
        remark: e.detail.value
    })
},
  getOrderDetail () {
    request({
        url: 'NurseOrder/GetNurseDetail',
        data: {orderId: this.data.orderId}
    }).then(res => {
        if (res.data.ResultCode == '0') {
            let details = res.data.NurseList
            let DatasObj = {
                id: details[0].OrderId,
                proLogo: '../../img/wechat.png',
                proName: details[0].ItemName,
                time: details[0].ItemTime,
                proDesc: details[0].ItemIntroduce,
                price: details[0].ItemMoney,
                orderNo: details[0].OrderNo
            }
            let datasArr = [DatasObj]
            let patientObj = {
                status: details[0].OrderStatus,
                buycount: "1",
                serveperson: details[0].PatientName,
                phone: details[0].Phone,
                serveaddress: details[0].Address,
                servetime: details[0].RegDate + ' ' + details[0].RegTime,
                history: '5',
                yuyueprice: '20',
                pricelist: details[0].ItemMoney,
                remark: details[0].Remark,
                id: details[0].OrderId
            }
            this.setData({
                datas: datasArr,
                infolist: patientObj
            })
        }
    })
  },
  onStartService (e) {
      console.log(e.detail.value)
  },
  acceptService (e) {
      console.log(e.detail.value)
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
        }
    })
  },
  cancelService (e) {
      this.setData({
        show: true
      })
    console.log(e.detail.value)
    
  },
  sureCancel () {
      if (!this.data.remark) {
        wx.showToast({
            title: '请填写原因',
            icon: 'error',
            duration: 2000
        })
        return
      }
    request({
        url: 'NurseOrder/ReceiveFailed',
        data: {orderId: e.detail.value, remark: this.data.remark}
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
  falseCancel () {
    this.setData({
        show: false
      })
  },
  successService (e) {
      let that = this
      request({
          method: "POST",
          url: 'NurseOrder/OrderSuccess',
          data: {
              orderId: e.detail.value,
              location:'',
              baseImg: '',
              patientName: '',
              idenNo: '',
              Score: '',
          }
      }).then(res => {
          console.log(res);
          if (res.data.ResultCode == '0') {
            wx.showToast({
                title: '成功结束服务',
                icon: 'success',
                duration: 2000
            })
          } else {
              console.log(res.data.ResultMsg);
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