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
        infolist: {},
        orderId: '',
        show: false,
        remark: '',
        canOrderId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id
        let infolist = this.data.infolist
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
    getOrderDetail() {
        request({
            url: 'NurseOrder/GetNurseDetail',
            data: {
                orderId: this.data.orderId
            }
        }).then(res => {
            if (res.data.ResultCode == '0') {
                let details = res.data.NurseList
                let caseImgs = ''
                if (details[0].PatientCaseImg) {
                    caseImgs = details[0].PatientCaseImg.split(',')
                } else {
                    caseImgs = []
                }
                let DatasObj = {
                    id: details[0].OrderId,
                    proLogo: '../../img/wechat.png',
                    proName: details[0].ItemName,
                    time: details[0].ItemTime,
                    proDesc: details[0].ItemIntroduce,
                    price: details[0].ItemMoney,
                    orderNo: details[0].OrderNo
                }
                wx.setStorageSync('caseImgs', caseImgs)
                wx.setStorageSync('UnitList', details[0].UnitList)
                let datasArr = [DatasObj]
                let patientObj = {
                    status: details[0].OrderStatus,
                    buycount: "1",
                    serveperson: details[0].PatientName,
                    phone: details[0].Phone,
                    serveaddress: details[0].Address,
                    servetime: details[0].RegDate + ' ' + details[0].RegTime,
                    history: caseImgs,
                    pricelist: details[0].ItemMoney,
                    remark: details[0].Remark,
                    id: details[0].OrderId,
                    IsStart: details[0].IsStart,
                    Score: details[0].Score,
                    EvaluateContent: details[0].EvaluateContent
                }
                this.setData({
                    datas: datasArr,
                    infolist: patientObj
                })
            }
        })
    },
    onStartService(e) {
        wx.navigateTo({
            url: '../order_details/order_details?id=' + e.detail.value,
        })
    },
    toAppraise(e) {
        wx.navigateTo({
            url: '../pingjia/pingjia?id=' + e.detail.value
        })
    },
    acceptService(e) {
        request({
            url: 'NurseOrder/ReceiveSuccess',
            data: {
                orderId: e.detail.value
            }
        }).then(res => {
            if (res.data.ResultCode === '0') {
                wx.showToast({
                    title: '成功接受',
                    icon: 'success',
                    duration: 2000,
                        success: function () {
                            wx.switchTab({
                                url: '../index/index'
                            })
                        }
                })
            }
        })
    },
    cancelService(e) {
        this.setData({
            show: true,
            canOrderId: e.detail.value
        })

    },
    sureCancel() {
        let that = this
        if (!that.data.remark) {
            wx.showToast({
                title: '请填写原因',
                icon: 'none',
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
                wx.showToast({
                    title: '成功退回',
                    icon: 'success',
                    duration: 2000,
                    success:function () {
                        that.setData({
                            show: false,
                            remark: ''
                        })
                         wx.switchTab({
                             url: '../index/index'
                         })
                    }
                })
            }
        })
    },
    falseCancel() {
        this.setData({
            show: false, 
            remark: ''
        })
    },
    successService(e) {
        let that = this
        request({
            method: "POST",
            url: 'NurseOrder/OrderSuccess',
            data: {
                orderId: e.detail.value,
                location: '',
                baseImg: '',
                patientName: '',
                idenNo: '',
                Score: '',
            }
        }).then(res => {
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
    toHistory() {
        wx.navigateTo({
            url: '../history/history'
        })
    },
    toCostList() {
        wx.navigateTo({
            url: '../consumable/consumable'
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