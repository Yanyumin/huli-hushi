const {
    request
} = require("../../utils/request")
import {
    tempId
} from '../../utils/util'

import Toast from 'vant-weapp/toast/toast';
import Dialog from 'vant-weapp/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hospitalArray: [],
        hospitaNoArr: [],
        hospitaNo: '',
        hospitalName: '',
        userName: '',
        checked: false,
        user_pro: "<<用户使用协议>>",
        password: '',
        password_c: '',
        phone: '',
        sms: '',
        isAcceptTemp: false,
        showSetBtn: false,
        checkedAccept: false
    },
    callback (res) {
        this.setData({
            showSetBtn: false
        })
        // this.toAccept()
    },
    formSubmit() {
        let that = this
        let phoneRes = /^1(3|4|5|6|7|8|9)\d{9}$/
        let passwordRes = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,16}$/
        if (that.data.userName == "" || that.data.userName == null || that.data.userName == undefined) {
            Toast.fail('请输入用户名');
            return
        } else if (that.data.password == "" || that.data.password == null || that.data.password == undefined) {
            Toast.fail('请输入密码');
            return
        } else if (!passwordRes.test(that.data.password)) {
            Toast.fail('密码格式不正确');
            return
        } else if (that.data.password_c == '') {
            Toast.fail('请确认密码');
            return
        } else if (that.data.password_c != that.data.password) {
            Toast.fail('两次密码不一致,请重新确认');
            return
        } else if (that.data.phone == '') {
            Toast.fail('请输入手机号');
            return
            //  } else if (that.data.sms == '') {
            //      Toast.fail('请输入验证码');
        } else if (!phoneRes.test(this.data.phone)) {
            Toast.fail('手机号码格式不正确');
            return
        } else if (!that.data.checked) {
            Toast.fail('请勾选同意下方使用协议');
            return
        }  else {
            request({
                method: "POST",
                url: 'NurseRegister/Register',
                data: {
                    UserName: that.data.userName,
                    Password: that.data.password,
                    Phone: that.data.phone,
                    HospitalId:that.data.hospitaNo
                }
            }).then(res => {
                console.log(res);
                if (res.data.ResultCode == 1) {
                      wx.setStorageSync('token', res.data.row.token)
                    wx.setStorageSync('userInfo', res.data.row)
                    wx.setStorageSync('haveInfo', res.data.Result)
                    wx.showToast({
                        title: res.data.Message,
                        icon: 'success',
                        duration: 3000,
                        success: function () {
                            wx.navigateTo({
                                url: '../perfectmyinfo/perfectmyinfo'
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
    hospitaBindChange(e) {
         const {
             value,
         } = e.detail;
         this.setData({
             hospitalName: this.data.hospitalArray[value],
            hospitaNo: this.data.hospitaNoArr[value]
         })
    },
    onChangeName(event) {
        // event.detail 为当前输入的值
        this.setData({
            userName: event.detail
        });
    },
    onChangePassword(e) {
        this.setData({
            password: e.detail
        });
    },
    onChangePassword_c(e) {
        this.setData({
            password_c: e.detail
        });
    },
    onChangePhone(e) {
        this.setData({
            phone: e.detail
        });
    },
    onChangeSms(e) {
        this.setData({
            sms: e.detail
        });
    },
    codeSubmit() {
        //  this.setData({
        //      userName: e.detail
        //  });
    },
    //  同意接收订阅消息
    onChangeAccept(e) {
        let that = this
        that.setData({
            checkedAccept: e.detail
        });
        if (that.data.checkedAccept) {
            wx.requestSubscribeMessage({
                tmplIds: [tempId],//刚申请的订阅模板id
                success(res) {
                    if (res[tempId] == 'accept') {
                        //用户同意了订阅
                        wx.showToast({
                            title: '订阅消息成功',
                            success: function () {
                                that.setData({
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
                                    showSetBtn: true
                                })
                            }
                        })
                    }
                },
                fail(res) {
                    console.log(res)
                    that.setData({
                        showSetBtn: true
                    })
                }
            })
        }
    },
    //  同意
    onChangebtn(e) {
        let that = this
        that.setData({
            checked: e.detail
        });
    },
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
                    hospitaNo: Nos[0] ? Nos[0] : '',
                    hospitalName: names[0] ? names[0] : ''
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.GetHospitallName()
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