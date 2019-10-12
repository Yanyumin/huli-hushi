// pages/myoder/myoder.js
const {
    request
} = require("../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canOrderId:'',
        remark:'',
        showRemark:'',
        oderList: [],
        oderList1: [],
        oderList2: [],
        oderList3: [],
        oderList4: [],
        oderList5: [],
    },
        sureCancel() {
            let that = this
            if (!that.data.remark) {
                wx.showToast({
                    title: '请填写原因',
                    icon: 'error',
                    duration: 2000
                })
                return
            }
            request({
                url: 'NurseOrder/ReceiveFailed',
                data: {
                    orderId: that.data.canOrderId,
                    remark: that.data.remark
                }
            }).then(res => {
                if (res.data.ResultCode === '0') {
                    that.setData({
                        show: false
                    })
                    wx.showToast({
                        title: '成功退回',
                        icon: 'success',
                        duration: 2000,
                       success:function () {
                       that.initPage()
                           
                       }
                    })
                }
            })
        },
      falseCancel() {
          this.setData({
              showRemark: false
          })
      },
      remarkChange: function (e) {
          this.setData({
              remark: e.detail.value
          })
          console.log(this.data.remark);

      },
    toAppraise(e) {
        wx.navigateTo({
            url: '../pingjia/pingjia?id=' + e.detail.value
          })

    },
    cancelService(e) {
        console.log(e , "拒绝");
        this.setData({
            showRemark: true,
            canOrderId: e.detail.value
        })
    },
    acceptService(e) {
        console.log("接受");
        let that = this
        request({
            url: 'NurseOrder/ReceiveSuccess',
            data:{
                orderId:e.detail.value
            }
        }).then(res => {
            if (res.data.ResultCode === '0') {
                wx.showToast({
                    title: '成功接受',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        console.log('lalalalal')
                        that.initPage()
                    }
                })
            }

        })

    },
    toquxiao(e) {
        let that = this
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
                        that.initPage()
                    }
                })
            }

        })

    },
    clickOrder(e) {
        console.log(e);
        let id = e.detail.value
        console.log(id);

        console.log("点击查看详情--待确认");
        wx.navigateTo({
            url: '../infolist/infolist?id=' + id,
        })

    },
    startService(e) {
        console.log("开始服务");

        // console.log(e);
        wx.navigateTo({
            url: '../order_details/order_details?id=' + e.detail.value,
        })
         this.initPage()
    },
    onChange(event) {
        this.initPage()
    },
    toAppraise(e) {
        wx.navigateTo({
          url: '../pingjia/pingjia?id=' + e.detail.value
        })
    },
    initPage (){
        request({
            url: 'NurseOrder/GetNurseList',
            data:{
                type: '', nurseId: wx.getStorageSync('userInfo').Id
            }
        }).then(res => {
            let {
                NurseList
            } = res.data
            let list1 = []
            let list2 = []
            let list3 = []
            let list4 = []
            let list5 = []
            for (let i in NurseList) {
                let obj = NurseList[i]
                obj.status = obj.OrderStatus
                obj.Price = obj.ItemMoney
                if (NurseList[i].OrderStatus == 0 ) {
                    list1.push(obj)
                    this.setData({
                        oderList1: list1 
                    })
                } else if (NurseList[i].OrderStatus ==2 ) {
                    list2.push(obj)
                    this.setData({
                        oderList2: list2 
                    })
                } else if (NurseList[i].OrderStatus == 3 || NurseList[i].OrderStatus == 4 || NurseList[i].OrderStatus == 5 || NurseList[i].OrderStatus == 6 || NurseList[i].OrderStatus == 7 || NurseList[i].OrderStatus == 8 || NurseList[i].OrderStatus == 9) {
                    list3.push(obj)
                    this.setData({
                        oderList3: list3 
                    })
                } else if (NurseList[i].OrderStatus == 11) {
                    list4.push(obj)
                    this.setData({
                        oderList4: list4 
                    })
                } else if (NurseList[i].OrderStatus == 10 || NurseList[i].OrderStatus == 9) {
                    list5.push(obj)
                    this.setData({
                        oderList5: list5 
                    })
                } else if (NurseList[i].OrderStatus == 0 || NurseList[i].OrderStatus == 1 || NurseList[i].OrderStatus == 3) {
                    list3.push(obj)
                    this.setData({
                        oderList6: list3 
                    })
                }
            }
            this.setData({
                oderList: NurseList
            })
            console.log(this.data.oderList);
            
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initPage()
console.log(this.data.oderList1);

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
    this.initPage()
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