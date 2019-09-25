// pages/myoder/myoder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oderList: [
            {
                orderNum: "vs123333333322222",
                status: "1",
                proImg: "../../img/cvr.png",
                proName: "看看病",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                status: "2",
                proImg: "../../img/cvr.png",
                proName: "护理康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                status: "3",
                proImg: "../../img/cvr.png",
                proName: "偏瘫康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            }, {
                orderNum: "vs123333333322222",
                status: "4",
                proImg: "../../img/cvr.png",
                proName: "偏瘫康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            }, {
                orderNum: "vs123333333322222",
                status: "5",
                proImg: "../../img/cvr.png",
                proName: "偏瘫康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",
            }
        ],
        oderList1: [{
                orderNum: "vs123333333322222",
                status: "1",
                proImg: "../../img/cvr.png",
                proName: "看看病",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                status: "1",
                proImg: "../../img/cvr.png",
                proName: "护理康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            }
        ],
        oderList2: [{
                orderNum: "vs123333333322222",
                status: "2",
                proImg: "../../img/cvr.png",
                proName: "看看病",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                status: "2",
                proImg: "../../img/cvr.png",
                proName: "护理康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            }
        ],
        oderList3: [{
                orderNum: "vs223333333322222",
                status: "3",
                proImg: "../../img/cvr.png",
                proName: "看看",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                status: "3",
                proImg: "../../img/cvr.png",
                proName: "护理康复",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            }
        ],
        oderList4: [{
            orderNum: "vs224444444422222",
            status: "4",
            proImg: "../../img/cvr.png",
            proName: "看看病",
            Price: "328.00",
            time: "2019-09-09",
            amount: "1",

        }],
        oderList5: [{
                orderNum: "vs225555555522222",
                status: "5",
                proImg: "../../img/cvr.png",
                proName: "看看病",
                Price: "328.00",
                time: "2019-09-09",
                amount: "1",

            },
            {
                orderNum: "vs123333333322222",
                status: "5",
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
        console.log(e);

    },
    acceptService(e) {
console.log("接受");

    },
    clickOrder(e) {
        console.log(e);
        
        console.log("点击查看详情--待确认");
 wx.navigateTo({
     url: '../infolist/infolist?id=1',
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