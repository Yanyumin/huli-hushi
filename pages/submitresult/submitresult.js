import Toast from 'vant-weapp/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        timer: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: '3秒后回首页',
            loadingType: 'spinner',
            selector: '#custom-selector'
        });

        let second = 3;
        const timer = setInterval(() => {
            second--;
            if (second) {
                toast.setData({
                    message: ` ${second} 秒后回首页`
                });
            } else {
                clearInterval(timer);
                Toast.clear();
                wx.switchTab({
                    url: '../index/index',

                })
            }
        }, 1000);

        //  let that = this;
        //  let countDownNum = 3; 
        //  that.setData({
        //      timer: setInterval(function () { 
        //          countDownNum--;
        //          that.setData({
        //              countDownNum: countDownNum,
        //          })
        //          if (countDownNum == 0) {
        //                  wx.navigateTo({
        //                      url: '../index/index',

        //                  })
        //              clearInterval(that.data.timer);
        //          }
        //      }, 1000)
        //  })
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