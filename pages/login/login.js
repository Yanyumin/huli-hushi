const {
  request
} = require("../../utils/request")
import Toast from 'vant-weapp/toast/toast';
Page({
  data: {
      hospitalArray: [],
      hospitaNoArr: [],
      hospitaNo: '',
      hospitalName: '花都妇幼',
      phone_name: '',
      password: '',
      sms: '',
      phone: '',
      user_pro: "<<用户使用协议>>",
      checked: false,
      remPassword: false,
      active: 1,
      logIcon: "../../img/tab-personal-gray.png",
  },
  //发送验证码
  // onSms() {
  //     console.log("发送验证码");
  // },
      hospitaBindChange(e) {
          const {
              value,
          } = e.detail;
          this.setData({
              hospitalName: this.data.hospitalArray[value],
              hospitaNo: this.data.hospitaNoArr[value]
          })
      },
  onChangeLogin() {
      let remPassword = this.data.remPassword
      let UserName = this.data.phone_name
      let Password = this.data.password
      if (!UserName) {
          Toast.fail('请输入用户名/手机号');
      } else if (!Password) {
          Toast.fail('请输入密码');
      } else if (!this.data.checked) {
          Toast.fail('请勾选同意下方使用协议');
      } else {

          request({
              method: 'POST',
              url: 'NurseRegister/SignIn',
              data: {
                  UserName,
                  Password
              }
          }).then(res => {
              if (res.data.ResultCode == 1) {
                  wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000,
                      success: function () {
                          if (remPassword) {
                              wx.setStorageSync('token', res.data.row.token)
                          }
                          wx.setStorageSync('userInfo', res.data.row)
                          wx.setStorageSync('haveInfo', res.data.Result)
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
  handleLogin() {
      let that =this
      let phone = that.data.phone
      let phoneRes = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (phone == '' || phone == undefined) {
          Toast.fail('请输入手机号');
      } else if (!phoneRes.test(phone)) {
          Toast.fail('手机号码格式不正确');
          // } else if (this.data.sms == '' || this.data.sms == undefined) {
          //     Toast.fail('请输入验证码');
      } else if (!that.data.checked) {
          Toast.fail('请勾选同意下方使用协议');
      } else {
          request({
              method: 'POST',
              url: 'NurseRegister/SignInByPhone',
              data: {
                  Phone:phone,
                  HospitalId: that.data.hospitaNo
              }
          }).then(res => {
              if (res.data.ResultCode == 1) {
                wx.setStorageSync('token', res.data.row.token)
                wx.setStorageSync('userInfo', res.data.row)
                wx.setStorageSync('haveInfo', res.data.Result)
                  wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000,
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
  // 记住密码
  rememberPasd(e) {
      this.setData({
          remPassword: e.detail,
      })
  },
  onChangePhone(e) {
      this.setData({
          phone_name: e.detail,
      })
  },
  handlePassword(e) {
      this.setData({
          password: e.detail,
      })
  },
  handleSms(e) {
      this.setData({
          password: e.detail,
      })
  },
  handlePhone(e) {
      this.setData({
          phone: e.detail,
      })

  },
  handlebtn(event) {
      this.setData({
          checked: event.detail
      });
  },
  handleGetUserInfo(e) {
      wx.setStorageSync("userinfo", e.detail.userInfo);
      // 1 跳转回上一页
      //   wx.navigateBack({
      //       delta: 1
      //   });

  },

  // onChangeTab(event) {
  //     wx.showToast({
  //         title: `切换到标签 ${event.detail.index + 1}`,
  //         icon: 'none'
  //     });
  // },
      GetHospitallName() {
          request({
              url: 'NurseRegister/GetHospital',
              method: 'GET'
          }).then(res => {
              if (res.data.ResultCode == 1) {
                  let names = []
                  let Nos = []
                  for (let i in res.data.rows) {
                      names.push(res.data.rows[i].Value)
                      Nos.push(res.data.rows[i].Key)
                  }
                  this.setData({
                      hospitalArray: names,
                      hospitaNoArr: Nos,
                      hospitaNo: Nos[0]
                  })
              }
          })
      },
  onLoad: function (options) {
      this.GetHospitallName()
      // 页面初始化 options为页面跳转所带来的参数
        wx.clearStorageSync(); //清除缓存
      wx.login({
          success(res) {
              if (res.code) {
                  wx.request({
                      url: 'https://api.gdbkyz.com/AppUser/api/Auth/Login',
                      data: {
                          code: res.code
                      },
                      method: 'GET',
                      success(res) {
                          wx.hideLoading()
                          if (res.statusCode == "200") {
                              wx.setStorageSync('cookies', res.header['Set-Cookie'])
                          } else {}
                      }
                  })
                  //   request({
                  //       url: 'Auth/Login',
                  //       data: {
                  //           code: res.code
                  //       }
                  //   }).then(res => {
                  //       if (res.statusCode == "200") {
                  //           console.log(res)
                  //           wx.setStorageSync('cookies', res.cookies[0])

              }
              //   })
              //   }
          }

      })
  },
})