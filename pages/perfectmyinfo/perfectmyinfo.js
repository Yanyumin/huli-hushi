// pages/perfectmyinfo/perfectmyinfo.js
import Toast from 'vant-weapp/toast/toast';
import {
    checkIDCard,IdCardBirthday
} from '../../utils/util'
const {
    request
} = require("../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        columns: ['外科', '骨科', '神经科'],
        sexClumn: ['男', '女'],
        titleClumns: [],
        index: 0,
        workUnit: '',
        depart: '外科',
        userName: '',
        sex: false,
        birthday: '1999-01-01',
        cardNo: '',
        phone: '',
        address: '',
        title: '护士',
        myId: '',
        logo: '../../img/userNo.png',
        ScheduleNo: '',
        ScheduleNoArr: [],
        DepartmentId: '',
        DepartmentArr: []
    },
    onChange(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
    },
    workUnitOnChange(e) {
        this.setData({
            workUnit: e.detail
        })
    },
    userNameChange(e) {
        this.setData({
            userName: e.detail
        })
    },
    departBindChange(e) {
        
        const {
            picker,
            value,
            index
        } = e.detail;
        this.setData({
            depart: this.data.columns[value],
            DepartmentId: this.data.DepartmentArr[value]
        })
    },
    sexBindChange(e) {
        if (e.detail.value == '0') {
            this.setData({
                sex: true
            })
        } else if (e.detail.value == '1') {
            this.setData({
                sex: false
            })
        }


        // Toast(this.data.sex);
    },
    bindDateChange: function (e) {
        this.setData({
            birthday: e.detail.value
        })
    },
    cardNoChange(e) {
        this.setData({
            cardNo: e.detail
        })
    },
    phoneChange(e) {
        this.setData({
            phone: e.detail
        })
    },
    addressChange(e) {
        this.setData({
            address: e.detail
        })
    },
    addressChange(e) {
        this.setData({
            address: e.detail
        })
    },
    titleBindChange(e) {
        const {
            picker,
            value,
            index
        } = e.detail;
        this.setData({
            title: this.data.titleClumns[value],
            ScheduleNo: this.data.ScheduleNoArr[value]
        })
    },
    submitThis() {
        let phoneRes = /^1(3|4|5|6|7|8|9)\d{9}$/
        if (this.data.workUnit == '') {
            wx.showToast({
                title: '请填写医院名',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (this.data.userName == '') {
            wx.showToast({
                title: '请填写姓名',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (this.data.cardNo == '') {
            wx.showToast({
                title: '请填写身份证号',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (!checkIDCard(this.data.cardNo)) {
            wx.showToast({
                title: '身份证号格式不正确',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (this.data.phone == '') {
            wx.showToast({
                title: '请填写手机号码',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (!phoneRes.test(this.data.phone)) {
            wx.showToast({
                title: '手机号码格式不正确',
                icon: 'none',
                duration: 2000
            })
            return
        }
        let params = {
            Logo: this.data.logo,
            Name: this.data.userName,
            Sex: this.data.sex,
            HospitalName: this.data.workUnit,
            Birthday: IdCardBirthday(this.data.cardNo),
            ContactPhone: this.data.phone,
            ContactAddress: this.data.address,
            DepartmentName: this.data.depart,
            DepartmentId: this.data.DepartmentId,
            RankName: this.data.title,
            IDCard: this.data.cardNo,
            ScheduleNo: this.data.ScheduleNo
        }
        wx.setStorageSync('user_info', params);
        wx.navigateTo({
            url: '../uploadmycard/uploadmycard',
        })
    }, //上传头像
    certificateUpload: function (e) {
        var that = this;
        wx.chooseImage({
            count: 1, // 默认1
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log(res)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                logo: data.ResultMsg
                            })
                        }
                    }
                })
            }
        })
    },
    GetNurseSchedule() {
        request({
            url: 'NurseRegister/GetNurseSchedule',
            method: 'GET',
            data: {hospitalId: wx.getStorageSync('userInfo').HospitalId}
        }).then(res => {
            if (res.data.ResultCode == 0) {
                // wx.navigateTo({
                //     url: '../myinfo/myinfo',
                // })
                let names = []
                let Nos = []
                for (let i in res.data.rows) {
                    names.push(res.data.rows[i].Value)
                    Nos.push(res.data.rows[i].Key)
                }
                this.setData({
                    titleClumns: names,
                    ScheduleNoArr: Nos,
                    ScheduleNo: Nos[0]
                })
            }

        })
    },
    GetNurseDepart() {
        request({
            url: 'NurseOrder/DeptList',
            method: 'GET',
            data: {hospitalId: wx.getStorageSync('userInfo').HospitalId}
        }).then(res => {
            if (res.data.ResultCode == 0) {
                let names = []
                let Nos = []
                for (let i in res.data.DeptList) {
                    names.push(res.data.DeptList[i].DeptName)
                    Nos.push(res.data.DeptList[i].DeptNo)
                }
                this.setData({
                    columns: names,
                    DepartmentArr: Nos,
                    DepartmentId: Nos[0]
                })
            }

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.GetNurseSchedule()
        this.GetNurseDepart()
        this.setData({
            phone: wx.getStorageSync('userInfo').ContactPhone,
            workUnit: wx.getStorageSync('userInfo').HospitalName,
            userName: wx.getStorageSync('userInfo').UserName
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