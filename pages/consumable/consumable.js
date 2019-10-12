// pages/consumable/consumable.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        narcosis: 200,
        blood: 200,
        cloth: 200,
        totalPrice: 0,
        costList: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let totalPrice = this.data.narcosis + this.data.blood + this.data.cloth
        
        let costList = wx.getStorageSync('UnitList')
        let price = 0
        for (let i in costList) {
            price = Number(costList[i].Money) + price
        }
        this.setData({
            costList: costList,
            totalPrice: price
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