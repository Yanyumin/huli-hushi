const {
  request
} = require("../../utils/request")

import Toast from 'vant-weapp/toast/toast';

Page({
  data: {
      phone_name: '',
      password: '',
      sms: '',
      phone: '',
      user_pro: "<<用户使用协议>>",
      checked: false,
      pasd: false,
      active: 1,
      logIcon: "../../img/tab-personal-gray.png",
  },
  //发送验证码
  // onSms() {
  //     console.log("发送验证码");

  //     wx.request({
  //         method: "POST",
  //         url: 'https://api.gdbkyz.com/AppUser/api/Auth/GetUserInfo',
  //         data: {

  //         },
  //         header: {
  //             'content-type': 'application/json' // 默认值
  //         },
  //         success(res) {
  //             console.log(res.data)
  //         }
  //     })
  // },
  onChangeLogin() {
      let pasd = this.data.pasd
      let UserName = this.data.phone_name
      let Password = this.data.password
      if (!this.data.phone_name) {
          Toast.fail('请输入用户名/手机号');
      } else if (!this.data.password) {
          Toast.fail('请输入密码');
      } else if (!this.data.checked) {
          Toast.fail('请勾选同意下方使用协议');
      } else {
          wx.login({
              success(res) {
                  if (res.code) {
                      request({
                          url: 'Auth/Login',
                          data: {
                              code: res.code
                          }
                      }).then(res => {
                          if (res.statusCode == "200") {
                              wx.setStorageSync('cookies', res.cookies[0])
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
                      })
                  }
              }

          })
      }
      return true;

  },
  handleLogin() {
      let phone = this.data.phone
      let phoneRes = /^1(3|4|5|7|8)\d{9}$/
      if (this.data.phone == '' || this.data.phone == undefined) {
          Toast.fail('请输入手机号');
      } else if (!phoneRes.test(this.data.phone)) {
          Toast.fail('手机号码格式不正确');
      // } else if (this.data.sms == '' || this.data.sms == undefined) {
      //     Toast.fail('请输入验证码');
      } else if (!this.data.checked) {
          Toast.fail('请勾选同意下方使用协议');
      }else{
                wx.login({
                    success(res) {
                        if (res.code) {
                            request({
                                url: 'Auth/Login',
                                data: {
                                    code: res.code
                                }
                            }).then(res => {
                                if (res.statusCode == "200") {
                                    wx.setStorageSync('cookies', res.cookies[0])
                                    request({
                                        method: 'POST',
                                        url: 'NurseRegister/SignInByPhone',
                                        data: {
                                           phone
                                        }
                                    }).then(res => {
                                        console.log(res);
                                        
                                        if (res.data.ResultCode == 1) {
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
                            })
                        }
                    }

                })
      }
      return true;
  },
  // 记住密码
  rememberPasd(e) {
      console.log(e);
      this.setData({
          pasd: e.detail,
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
      console.log(e.detail);
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
      console.log(e.detail.userInfo);

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
  onLoad: function (options) {
      // 页面初始化 options为页面跳转所带来的参数
    //   wx.clearStorageSync(); //清除缓存
  },
})