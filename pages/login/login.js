import Toast from 'vant-weapp/toast/toast';

Page({
    data: {
        phone_name: '',
        password: '',
        sms: '',
        phone: '',
        user_pro: "<<用户使用协议>>",
        checked: false,
        checked_password: false,
        active: 1,
        logIcon: "../../img/tab-personal-gray.png",
    },
    onChangeLogin() {
        if (!this.data.phone_name) {
            Toast.fail('请输入用户名/手机号');
        } else if (!this.data.password) {
            Toast.fail('请输入密码');
        } else if (!this.data.checked) {
            Toast.fail('请勾选同意下方使用协议');
        } else if (this.data.phone_name == "admin" && this.data.password == "123") {
              wx.login({
                  success(res) {
                      console.log(res.code);
                      
                      if (res.code) {
                          //发起网络请求
                        //   wx.request({
                        //       url: 'https://test.com/onLogin',
                        //       data: {
                        //           code: res.code
                        //       }
                        //   })
                      } else {
                          console.log('登录失败！' + res.errMsg)
                      }
                  }
              })
            // 这里修改成跳转的页面
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

            wx.showToast({

                title: '登录失败',
                icon: 'none',

                duration: 2000

            })
        }
        return true;

    },
    handleLogin() {
        console.log("登录");
        let phoneRes = /^1(3|4|5|7|8)\d{9}$/
        if (this.data.phone == '' || this.data.phone == undefined) {
            Toast.fail('请输入手机号');
        } else if (!phoneRes.test(this.data.phone)) {
            Toast.fail('手机号码格式不正确');
        } else if (this.data.sms == '' || this.data.sms == undefined) {
            Toast.fail('请输入验证码');
        } else if (!this.data.checked) {
            Toast.fail('请勾选同意下方使用协议');
        }
        return true;
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
    onChangeTab(event) {
        wx.showToast({
            title: `切换到标签 ${event.detail.index + 1}`,
            icon: 'none'
        });
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        wx.clearStorageSync(); //清除缓存
    },

    formSubmit(e) { //form提交内容 对登录信息做判断
        var param = e.detail.value;
        this.mysubmit(param);
        console.log("登录页提交", param)


    },
    mysubmit: function (param) { //验证帐号密码输入信息完整度
        var flag = this.checkUserName(param) && this.checkPassword(param);
        console.log('信息填写', flag)
        if (flag) {
            this.setLoginData1();
            this.checkUserInfo(param);
        }
    },
    setLoginData1: function () { //登录态提示
        this.setData({
            loginBtnTxt: "登录中",
            disabled: !this.data.disabled,
            loginBtnBgBgColor: "#999",
            btnLoading: !this.data.btnLoading
        });
    },
    setLoginData2: function () {
        this.setData({
            loginBtnTxt: "登录",
            disabled: !this.data.disabled,
            loginBtnBgBgColor: "#0099FF",
            btnLoading: !this.data.btnLoading
        });
    },
    // checkUserName: function (param) {
    //     var userid = util.regexConfig().cards; //姓名正则检验
    //     var inputUserName = param.phone.trim(); //输入信息确认
    //     var wellname = param.username.length; //字符长度确认
    //     console.log(inputUserName, wellname)
    //     if (userid.test(inputUserName)) { //xxx.test是检测函数。
    //         return true;
    //     } else {
    //         wx.showModal({
    //             title: '提示',
    //             showCancel: false,
    //             content: '姓名输入错误'
    //         });
    //         return false;
    //     }
    // },
    checkPassword: function (param) {
        var phone = util.regexConfig().phone; //校验手机号
        var inputPassword = param.password.trim(); //核对输入手机号
        var password = param.password.length;
        if (phone.test(inputPassword) && password == 11) { //验证手机号格式及长度
            return true;
        } else {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '手机号输入错误'
            });
            return false;
        }
    },
    checkUserInfo: function (param) {
        var username = param.username.trim();
        var password = param.password.trim();
        var goodname = param.username; //提取帐号
        var goodpass = param.password; //提取密码
        var that = this;
        if (username == goodname && password == goodpass) { //无需存贮，只为验证
            setTimeout(function () {
                wx.showToast({
                    title: '',
                    icon: 'success',
                    duration: 1500
                });
                that.setLoginData2();
                that.redirectTo(param);
            }, 2000);
        } else {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '信息有误，请重新输入'
            });
            this.setLoginData2();
        }
    },
    redirectTo: function (param) {
        //需要将param转换为字符串
        param = JSON.stringify(param);
        wx.redirectTo({
            url: '../main/index?param=' + param //参数只能是字符串形式，不能为json对象
        })
    },
    onGotUserInfo: function (e) { //授权过后不再调起
        // console.log(e.detail.errMsg)
        console.log(e.detail.userInfo)
        var tip = e.detail.userInfo;
        if (tip == undefined) {
            wx.redirectTo({
                url: '../login/index',
            })
        } else {
            wx.setStorage({ //存储数据并准备发送给下一页使用
                key: "myMessage",
                data: e.detail.userInfo,
            })
        }
    },

})