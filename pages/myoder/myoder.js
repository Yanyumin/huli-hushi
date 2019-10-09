// pages/myoder/myoder.js
const {
    request
} = require("../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oderList: [],
        oderList1: [],
        oderList2: [],
        oderList3: [],
        oderList4: [],
        oderList5: [],
    },
    toAppraise(e) {
        wx.navigateTo({
            url: '../pingjia/pingjia?id=' + e.detail.value
          })

    },
    cancelService(e) {
        console.log(e , "拒绝");
        request({
            url: 'NurseOrder/ReceiveFailed',
            data: {
                orderId: e.detail.value
            }
        }).then(res => {
            if (res.data.ResultCode === '0') {
                wx.showToast({
                    title: '成功退回',
                    icon: 'success',
                    duration: 2000
                })
            }
            this.initPage()

        })
    },
    acceptService(e) {
        console.log("接受");
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
                    duration: 2000
                })
                this.initPage()
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
    },
    onChange(event) {
        // wx.showToast({
        //     title: `切换到标签 ${event.detail.index + 1}`,
        //     icon: 'none'
        // });
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
    initPage (){
        request({
            url: 'NurseOrder/GetNurseList',
            data:{
                type:''
            }
        }).then(res => {
            console.log(res);
            let {
                NurseList
            } = res.data
            for (let i in NurseList) {
                let obj = NurseList[i]
                obj.status = obj.OrderStatus
                obj.Price = obj.ItemMoney
                if (NurseList[i].OrderStatus == 2 ) {
                    let list1 = []
                    list1.push(obj)
                    this.setData({
                        oderList1: list1 
                    })
                } else if (NurseList[i].OrderStatus == 3 || NurseList[i].OrderStatus == 4) {
                    let list2 = []
                    list2.push(obj)
                    this.setData({
                        oderList2: list2 
                    })
                } else if (NurseList[i].OrderStatus == 5 || NurseList[i].OrderStatus == 6 || NurseList[i].OrderStatus == 7 || NurseList[i].OrderStatus == 8) {
                    let list3 = []
                    list3.push(obj)
                    this.setData({
                        oderList3: list3 
                    })
                } else if (NurseList[i].OrderStatus == 10 || NurseList[i].OrderStatus == 9) {
                    let list4 = []
                    list4.push(obj)
                    this.setData({
                        oderList4: list4 
                    })
                } else {
                    let list5 = []
                    list5.push(obj)
                    this.setData({
                        oderList5: list5 
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