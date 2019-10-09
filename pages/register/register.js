const {request} = require("../../utils/request")

import Toast from 'vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
  userName:'',
  checked:false,
  user_pro: "<<用户使用协议>>",
  password:'',
  password_c:'',
  phone:'',
  sms:''
  },
formSubmit(){
    console.log("注册");
    let that = this
    let passwordRes = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,16}$/
     if (that.data.userName == "" || that.data.userName == null ||that.data.userName == undefined) {
         Toast.fail('请输入用户名');
     } else if (that.data.password == "" || that.data.password == null || that.data.password == undefined) {
         Toast.fail('请输入密码');
     } else if (!passwordRes.test(that.data.password)) {
         Toast.fail('密码格式不正确');
     } else if (that.data.password_c=='') {
      Toast.fail('请确认密码');
     }else if (that.data.password_c != that.data.password) {
         Toast.fail('两次密码不一致,请重新确认');
     }else if (that.data.phone=='') {
         Toast.fail('请输入手机号');
    //  } else if (that.data.sms == '') {
    //      Toast.fail('请输入验证码');
     } else if (!that.data.checked) {
         Toast.fail('请勾选同意下方使用协议');
     } else {
        request({
             method: "POST",
            url: 'NurseRegister/Register',
            data: {
                UserName: that.data.userName,
                Password: that.data.password,
                Phone: that.data.phone
            }
        }).then(res=>{
            console.log(res);
                 if (res.data.ResultCode == 1) {
                      wx.setStorageSync('userInfo', res.data.row)
                      wx.setStorageSync('haveInfo', res.data.Result)
                     wx.showToast({
                         title: res.data.Message,
                         icon: 'success',
                         duration: 3000,
                         success: function () {
                             wx.switchTab({
                                 url: '../index/index'
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
 onChangeName(event) {
     // event.detail 为当前输入的值
     this.setData({
         userName: event.detail
     });
 },
 onChangePassword(e){
   this.setData({
       password: e.detail
   });
 },
 onChangePassword_c(e){
 this.setData({
     password_c: e.detail
 });
 },
 onChangePhone(e){
      this.setData({
          phone: e.detail
      });
 },
 onChangeSms(e){
 this.setData({
     sms: e.detail
 });
 },
 codeSubmit(){
console.log("发送一个验证码");
//  this.setData({
//      userName: e.detail
//  });
 },
//  同意
 onChangebtn(e){
     
 this.setData({
     checked: e.detail
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