// pages/fogetPwdT/forgetPwdT.js
const {
  request
} = require("../../utils/request")

import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newPwd: '',
    confirmPwd: '',
    id: ''
  },


  onChangePwd(event) {
    // event.detail 为当前输入的值
    this.setData({
      newPwd: event.detail
    });
  },
  onChangeCPwd(event) {
    // event.detail 为当前输入的值
    this.setData({
      confirmPwd: event.detail
    });
  },
  formSubmit() {
    let that = this
    let passwordRes = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,16}$/
    if (that.data.newPwd == "" || that.data.newPwd == null || that.data.newPwd == undefined) {
        Toast.fail('请输入密码');
        return
    } else if (!passwordRes.test(that.data.newPwd)) {
        Toast.fail('密码格式不正确');
        return
    } else if (that.data.confirmPwd == '') {
        Toast.fail('请确认密码');
        return
    } else if (that.data.confirmPwd != that.data.newPwd) {
        Toast.fail('两次密码不一致,请重新确认');
        return
    } else {
        request({
            method: "POST",
            url: 'NurseRegister/ResetPassword',
            data: {
                UserName: '',
                NurseId: that.data.id,
                Phone: '',
                OldPassword: '',
                NewPassword: that.data.newPwd,
            }
        }).then(res => {
            console.log(res);
            if (res.data.ResultCode == 1) {
                  // wx.setStorageSync('token', res.data.row.token)
                // wx.setStorageSync('userInfo', res.data.row)
                // wx.setStorageSync('haveInfo', res.data.Result)
                wx.showToast({
                    title: res.data.Message,
                    icon: 'success',
                    duration: 3000,
                    success: function () {
                        wx.navigateTo({
                            url: '../login/login'
                        })
                    }
                })
            } else {
                Toast.fail(res.data.Message);
                return false
            }
        })
    }
    return true;
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
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