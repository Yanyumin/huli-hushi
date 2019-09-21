// pages/order_details/order_details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                title: "预约信息",
                isActive: false
            },
            {
                id: 1,
                title: "出门准备",
                isActive: true
            },
            {
                id: 2,
                title: "到达地点",
                isActive: false
            }, {
                id: 3,
                title: "评估报告",
                isActive: false
            }, {
                id: 4,
                title: "护理　",
                isActive: false
            }, {
                id: 5,
                title: "安全打卡",
                isActive: false
            }
        ],
        cart: {
            goods_logo: '../../img/wechat.png',
            goods_name: "换药",
            goods_price: "119",
            goods_time: "30分钟",
            goods_info: "更换敷料、检查伤口、清洁伤口"
        }
    },
    // 改变tabs标签的选中效果
    handleTitleChange(e) {
        // 先获取子组件传递过来的数据
        const {
            index
        } = e.detail;
        // 获取源数组
        let {
            tabs
        } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        this.setData({
            tabs
        });
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