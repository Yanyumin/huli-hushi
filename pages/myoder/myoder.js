// pages/myoder/myoder.js
const {
    request
} = require("../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oderList: [
           
        ],
        oderList1: [{
                orderNum: "vs123333333322222",
                OrderStatus: "1",
                proImg: "../../img/cvr.png",
                proName: "看看病",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                OrderStatus: "1",
                proImg: "../../img/cvr.png",
                proName: "护理康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            }
        ],
        oderList2: [{
                orderNum: "vs123333333322222",
                OrderStatus: "2",
                proImg: "../../img/cvr.png",
                proName: "看看病",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                OrderStatus: "2",
                proImg: "../../img/cvr.png",
                proName: "护理康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            }
        ],
        oderList3: [{
                orderNum: "vs223333333322222",
                OrderStatus: "3",
                proImg: "../../img/cvr.png",
                proName: "看看",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                OrderStatus: "3",
                proImg: "../../img/cvr.png",
                proName: "护理康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            }
        ],
        oderList4: [{
            orderNum: "vs224444444422222",
            OrderStatus: "4",
            proImg: "../../img/cvr.png",
            proName: "看看病",
            Price: "328.00",
            time: "2019-09-09",
            amount: "1",

        }],
        oderList5: [{
                orderNum: "vs225555555522222",
                OrderStatus: "5",
                proImg: "../../img/cvr.png",
                proName: "看看病",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                OrderStatus: "5",
                proImg: "../../img/cvr.png",
                proName: "护理康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            }
        ],
    },
    toAppraise(e) {
        console.log(e);

    },
    cancelService(e) {
        console.log(e , "拒绝");
 request({
     url: 'NurseOrder/ReceiveFailed',
     data: {
         orderId: 1
     }
 }).then(res => {
     console.log(res);

 })
    },
    acceptService(e) {
        console.log("接受");
     request({
         url: 'NurseOrder/ReceiveSuccess',
         data:{
             orderId:1
         }
     }).then(res => {
         console.log(res);

     })

    },
    clickOrder(e) {
        console.log(e);
        let status = e.currentTarget.dataset.status
        console.log(status);

        console.log("点击查看详情--待确认");
        wx.navigateTo({
            url: '../infolist/infolist?id=' + status,
        })

    },
    startService(e) {
        console.log("开始服务");

        // console.log(e);
        wx.navigateTo({
            url: '../order_details/order_details',
        })
    },
    onChange(event) {
        // wx.showToast({
        //     title: `切换到标签 ${event.detail.index + 1}`,
        //     icon: 'none'
        // });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        request({
            url: 'NurseOrder/GetNurseList',
        }).then(res => {
            console.log(res);
            let {
                NurseList
            } = res.data
            this.setData({
                oderList: NurseList
            })
            console.log(this.data.oderList);
            
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