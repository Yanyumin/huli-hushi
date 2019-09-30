import Toast from 'vant-weapp/toast/toast';

const QQMapWX = require('../../lib/qqmap/qqmap-wx-jssdk.js');
const {
    request
} = require("../../utils/request")
var util = require('../../utils/util.js');
// 实例化API核心对象，对象调用方法实现功能
let qqmapsdk = new QQMapWX({
    key: '53IBZ-7X36X-CWE4D-TKKLE-T7K3V-STBS3'
});
//  console.log(qqmapsdk);
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //安全到达打开
        safetyClock: false,
        // 安全到达时间
        safetyTime: '',
        //护理结束
        nurseEndClock: false,
        nurseEndImg: '',
        measures:'',
        evaluate:'',
        //护理前
        nurseBeforeClock: false,
        nurseTime: '',
        nurseAddress: '',
        nurseBeforeImg: '',
        // 评估报告数据
        pgdj: '',
        zznl: '',
        yszt: '',
        dxb: '',
        yj: '',
        xy: '',
        xlzt: '',
        gmywsw: '',

        //到达打卡
        arriveClock: false,
        arriveTime: '',
        arriveImg: '',
        arriveAddress: '',
        //实名认证
        attestation: false,
        patientName: '',
        idenNo: '',
        patientImg: '',
        // 出门打卡
        goOutClock: false,
        goOutime: '',
        goOutImg: "",
        goOutAddress: "",


        infolist: {
            status: "待服务",
            buycount: "1",
            serveperson: '温秀秀',
            phone: '135434343',
            serveaddress: '广东广州海珠',
            servetime: '2019-09-22',
            history: '5',
            pricelist: '221',
            remark: '疑难杂症',
        },
        myLatitude: "",
        myLongitude: "",
        value1: 3,
        list: {
            status: "",
            buycount: "",
            serveperson: '',
            phone: '',
            serveaddress: '',
            servetime: '',
            history: '',
            yuyueprice: '',
            pricelist: '',
            remark: '',
        },
        datas: [{
            id: 1,
            proLogo: '../../img/wechat.png',
            proName: "换药",
            price: "119",
            time: "30",
            proDesc: "更换敷料、检查伤口、清洁伤口"
        }],
        tabs: [{
                id: 0,
                title: "预约信息",
                isActive: true,
                isShow: true,
            },
            {
                id: 1,
                title: "出门准备",
                isActive: false,
                isShow: false,
            },
            {
                id: 2,
                title: "到达地点",
                isActive: false,
                isShow: false,
            }, {
                id: 3,
                title: "评估报告",
                isActive: false,
                isShow: false,
            }, {
                id: 4,
                title: "　 护理",
                isActive: false,
                isShow: false,
            }, {
                id: 5,
                title: "安全打卡",
                isActive: false,
                isShow: false,
            }
        ],
        cart: {
            goods_logo: '../../img/wechat.png',
            goods_name: "换药",
            goods_price: "119",
            goods_time: "30分钟",
            goods_info: "更换敷料、检查伤口、清洁伤口"
        }
    },
    // 护理结束打卡
    NurseEnd() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        console.log(res);

                        if (data.ResultCode == 0) {
                            that.setData({
                                nurseEndImg: data.ResultMsg
                            })
                            request({
                                method: "POST",
                                url: 'NurseOrder/ThreeConfirm',
                                data: {
                                    orderId: 2,
                                    location: that.data.nurseAddress,
                                    baseImg: that.data.nurseEndImg,
                                    patientName: '',
                                    idenNo: '',
                                    Score: '',
                                }
                            }).then(res => {
                                console.log(res);
                                if (res.data.ResultCode == 0) {
                                    that.setData({
                                        nurseBeforeClock: true
                                    })
                                } else {
                                    console.log(res.data.ResultMsg);
                                }
                            })
                        }
                    }
                })
            }
        })

    },
    //护理前打卡
    NurseBefore() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                var time = util.formatHour(new Date());
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                nurseTime: time,
                                nurseBeforeImg: data.ResultMsg
                            })
                        }
                    }
                })
                //    用微信提供的api获取经纬度
                wx.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        that.setData({
                            myLatitude: res.latitude,
                            myLongitude: res.longitude
                        })
                        //用腾讯地图的api，根据经纬度获取城市
                        qqmapsdk.reverseGeocoder({
                            location: {
                                latitude: that.data.myLatitude,
                                longitude: that.data.myLongitude
                            },
                            success: function (res) {
                                that.setData({
                                    nurseAddress: res.result.address
                                })
                                request({
                                    method: 'POST',
                                    url: 'NurseOrder/TwoConfirm',
                                    data: {
                                        orderId: 2,
                                        location: that.data.nurseAddress,
                                        baseImg: that.data.nurseBeforeImg,
                                        patientName: '',
                                        idenNo: ''
                                    }
                                }).then(res => {
                                    console.log(res);
                                    if (res.data.ResultCode == 0) {
                                        that.setData({
                                            nurseBeforeClock: true
                                        })
                                    } else {
                                        console.log(res.data.ResultMsg);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    },
    // 出门打卡
    takePhoto() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                var time = util.formatHour(new Date());
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                goOuttime: time,
                                goOutImg: data.ResultMsg
                            })
                        }
                    }
                })
                //    用微信提供的api获取经纬度
                wx.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        that.setData({
                            myLatitude: res.latitude,
                            myLongitude: res.longitude
                        })
                        //用腾讯地图的api，根据经纬度获取城市
                        qqmapsdk.reverseGeocoder({
                            location: {
                                latitude: that.data.myLatitude,
                                longitude: that.data.myLongitude
                            },
                            success: function (res) {
                                that.setData({
                                    goOutAddress: res.result.address
                                })
                                request({
                                    method: 'POST',
                                    url: 'NurseOrder/OneConfirm',
                                    data: {
                                        orderId: 2,
                                        location: that.data.goOutAddress,
                                        baseImg: that.data.goOutImg,
                                        patientName: '',
                                        idenNo: ''
                                    }
                                }).then(res => {
                                    console.log(res);
                                    if (res.data.ResultCode == 0) {
                                        that.setData({
                                            arriveClock: true
                                        })
                                    } else {
                                        console.log(res.data.ResultMsg);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })


    },
    // 到达打卡
    onarriveClock() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                var time = util.formatHour(new Date());
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                arriveClock: true,
                                arriveTime: time,
                                arriveImg: data.ResultMsg
                            })
                        }
                    }
                })
                //    用微信提供的api获取经纬度
                wx.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        that.setData({
                            myLatitude: res.latitude,
                            myLongitude: res.longitude
                        })
                        //用腾讯地图的api，根据经纬度获取城市
                        qqmapsdk.reverseGeocoder({
                            location: {
                                latitude: that.data.myLatitude,
                                longitude: that.data.myLongitude
                            },
                            success: function (res) {
                                that.setData({
                                    arriveAddress: res.result.address
                                })
                            }
                        })
                    }
                })
            }
        })


    },
    //实名认证 
    attestationClock() {
        let that = this
        let arriveImg = that.data.arriveImg
        let patientImg = that.data.patientImg

        if (that.data.patientName == '' || that.data.idenNo == '') {
            Toast.fail('请输入患者姓名或身份证号');
        } else {
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    const tempFilePaths = res.tempFilePaths
                    wx.uploadFile({
                        method: "POST",
                        url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                        filePath: tempFilePaths[0],
                        name: 'file',
                        success: function (res) {
                            let data = JSON.parse(res.data)
                            if (res.statusCode == 200) {
                                that.setData({
                                    patientImg: data.ResultMsg
                                })
                                request({
                                    method: 'POST',
                                    url: 'NurseOrder/TwoConfirm',
                                    data: {
                                        orderId: 2,
                                        location: that.data.arriveAddress,
                                        baseImg: arriveImg,
                                        patientImg,
                                        patientName: that.data.patientName,
                                        idenNo: that.data.idenNo,
                                        Score: '',
                                    }
                                }).then(res => {
                                    console.log(res);

                                    if (res.data.ResultCode == 0) {
                                        //  实名认证成功
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
        return true;

    },
    //取消订单
    onOderderOff() {
        request({
            url: 'NurseOrder/BillOrderFailed',
            data: {
                orderId: 2,
            }
        }).then(res => {
            console.log(res);

        })
    },

    // 下一步
    onNextStep() {
        let {
            tabs
        } = this.data;
        if (!this.data.arriveClock) {
            Toast.fail('请先打卡');
            // } else if (!this.data.attestation) {
            //     Toast.fail('请先实名认证');
        } else {
            tabs[2].isShow = false
            tabs[3].isActive = true
            tabs[3].isShow = true
            this.setData({
                tabs
            })
        }

    },
    radioChangeGmyw: function (e) {
        this.setData({
            gmywsw: e.detail.value
        })
    },
    radioChangeXlzt: function (e) {
        this.setData({
            xlzt: e.detail.value
        })
    },
    radioChangeXy: function (e) {
        this.setData({
            xy: e.detail.value
        })
    },
    radioChangeYj: function (e) {
        this.setData({
            yj: e.detail.value
        })
    },
    radioChangeDxb: function (e) {
        this.setData({
            dxb: e.detail.value
        })
    },
    radioChangeYszt: function (e) {
        this.setData({
            yszt: e.detail.value
        })
    },
    radioChangeZznl: function (e) {
        this.setData({
            zznl: e.detail.value
        })
    },
    radioChangePgdj: function (e) {
        this.setData({
            pgdj: e.detail.value
        })
    },
    radioChangeHldj: function (e) {
        this.setData({
            hldj: e.detail.value
        })
    },
    //验证 患者姓名
    onChangeName(e) {
        this.setData({
            patientName: e.detail
        })
    },
    //护理记录
    onChangeMeasures(e){
 this.setData({
     measures:e.detail
 })
    },
    onChangeEvaluate(e){
this.setData({
     evaluate:e.detail
 })
    },
    // 身份证
    onChangeCode(e) {
        console.log(e)
        this.setData({
            idenNo: e.detail
        })
    },
    // 查看费用清单
    onExpense() {
        wx.navigateTo({
            url: '../expense/expense'
        })
    },
    //查看病历
    onHistory() {
        console.log("查看病历");
        wx.navigateTo({
            url: '../history/history'
        })
    },
    onSubmit() {
        console.log("护理已结束");

    },
    // 护理结束
    onNurseEnd() {
        
        let {
            tabs
        } = this.data;
        tabs[4].isShow = false
        tabs[5].isActive = true
        tabs[5].isShow = true
        this.setData({
            tabs
        })
    },
    // 开始护理
    onNurse() {
        let that = this
        let {
            tabs
        } = that.data;
        tabs[3].isShow = false
        tabs[4].isActive = true
        tabs[4].isShow = true
        that.setData({
            tabs
        })
        request({
            url: 'NurseOrder/NurseDetail',
            data: {
                orderId: 2,
                gmywsw: that.data.gmywsw,
                xlzt: that.data.xlzt,
                xy: that.data.xy,
                yj: that.data.yj,
                dxb: that.data.dxb,
                yszt: that.data.yszt,
                zznl: that.data.zznl,
                pgdj: that.data.pgdj
            }
        }).then(res => {
            console.log(res);

        })
    },

    // 准备完成
    onPrepare() {
        let {
            tabs
        } = this.data;
        tabs[1].isShow = false
        tabs[2].isActive = true
        tabs[2].isShow = true
        this.setData({
            tabs
        })
    },
    // 开始服务
    onStartService() {
        let {
            tabs
        } = this.data;
        tabs[0].isShow = false
        tabs[1].isActive = true
        tabs[1].isShow = true
        this.setData({
            tabs
        })
        console.log(tabs);

    },
    // 改变tabs标签的选中效果
    handleTitleChange(e) {
        const {
            index
        } = e.detail;
        let {
            tabs
        } = this.data;
        tabs.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
        this.setData({
            tabs
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

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