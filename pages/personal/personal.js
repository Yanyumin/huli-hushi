// pages/personal/personal.js
import Dialog from 'vant-weapp/dialog/dialog';
import {
    tempId
} from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: '',
        datas: [
            {
                img: '../../img/erweima.png',
                text: '我的二维码',
                event: 'toQrcode',
                class: 'erweima'
            },
            {
                img: '../../img/users.png',
                text: '患者管理',
                event: 'toPatientList',
                class: 'pImg'
            },
            {
                img: '../../img/scheduling.png',
                text: '排班管理',
                event: 'toSchedule',
                class: 'schedule'
            },
            {
                img: '../../img/edit1.png',
                text: '修改个人资料',
                event: 'toUpdateInfo',
                class: 'update'
            },
            {
                img: '../../img/shouquan.png',
                text: '允许收取订阅消息',
                event: 'toAccept',
                class: 'accept'
            },
            {
                img: '../../img/ruler.png',
                text: '互联网+护理相关规章',
                event: 'toRuler',
                class: 'ruler'
            }
        ],
        isAcceptTemp: false,
        showSetBtn: false
    },
    toPersonalInfo() {
        let user = wx.getStorageSync('userInfo')
        if (user.IDCard) {
            wx.navigateTo({
                url: '../myinfo/myinfo',
            })
        } else {
            wx.navigateTo({
                url: '../perfectmyinfo/perfectmyinfo',
            })
        }
    },
    toQrcode() {
        wx.navigateTo({
            url: '../qrcode/qrcode',
        })
    },
    toPatientList() {
        wx.navigateTo({
            url: '../invite/invite',
        })
    },
    toSchedule() {
        wx.navigateTo({
            url: '../schedule/schedule',
        })
    },
    toUpdateInfo () {
        wx.navigateTo({
            url: '../updatemyinfo/updatemyinfo',
        })
    },
    toRuler () {
        wx.navigateTo({
            url: '../ruler/ruler',
        })
    },
    callback (res) {
        this.setData({
            showSetBtn: false
        })
        // this.toAccept()
    },
    toAccept () {
        let that = this
        wx.requestSubscribeMessage({
            tmplIds: [tempId],//刚申请的订阅模板id
            success(res) {
                if (res[tempId] == 'accept') {
                    //用户同意了订阅
                    wx.showToast({
                        title: '订阅消息成功',
                        success: function () {
                            that.setData({
                                isAcceptTemp: true,
                                showSetBtn: false
                            })
                        }
                    })

                } else {
                    //用户拒绝了订阅或当前游戏被禁用订阅消息
                    wx.showToast({
                        title: '订阅消息失败',
                        success: function () {
                            that.setData({
                                isAcceptTemp: false,
                                showSetBtn: true
                            })
                        }
                    })
                }
            },
            fail(res) {
                //用户拒绝了订阅或当前游戏被禁用订阅消息
                // Dialog.alert({
                //     // message: '请点击右上角“...” → 设置 → 消息订阅 → 接收订阅消息提醒！'
                //     message: '请点击接收消息按钮打开消息订阅！'
                // }).then(() => {
                // // on close
                // });
                that.setData({
                    isAcceptTemp: false,
                    showSetBtn: true
                })
            }
        })
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
        let userInfo = wx.getStorageSync('userInfo')
        this.setData({
            userInfo: userInfo
        })
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