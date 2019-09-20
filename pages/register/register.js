import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userName:'',
  checked:true,
  user_pro: "<<用户使用协议>>",
  password:'',
  password_c:'',
  phone:'',
  sms:''
  },
formSubmit(){
    console.log("登录");
     if (this.data.userName == "" || this.data.userName == null ||this.data.userName == undefined) {
         Toast.fail('请输入用户名');
     } else if (this.data.password == "" || this.data.password == null || this.data.password == undefined) {
         Toast.fail('请输入密码');
     } else if (this.data.password.length < 6) {
         Toast.fail('密码至少要6位');
     } else if (this.data.password_c=='') {
      Toast.fail('请确认密码');
     }else if (this.data.password_c != this.data.password) {
         Toast.fail('两次密码不一致,请重新确认');
     }else if (this.data.phone=='') {
         Toast.fail('请输入手机号');
     } else if (this.data.sms == '') {
         Toast.fail('请输入验证码');
     }
     return true;
}
  ,
 onChangeName(event) {
     // event.detail 为当前输入的值
     console.log(event.detail);
     this.setData({
         userName: event.detail
     });
 },
 onChangePassword(e){
     console.log(e.detail);
   this.setData({
       password: e.detail
   });
 },
 onChangePassword_c(e){
     console.log(e.detail);
 this.setData({
     password_c: e.detail
 });
 },
 onChangePhone(e){
     console.log(e.detail);
      this.setData({
          phone: e.detail
      });
 },
 onChangeSms(e){
     console.log(e.detail);
 this.setData({
     sms: e.detail
 });
 },
 codeSubmit(){
console.log("发送一个验证码");
 this.setData({
     userName: e.detail
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