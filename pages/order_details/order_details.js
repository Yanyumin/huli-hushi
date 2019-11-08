import Toast from 'vant-weapp/toast/toast';
import Dialog from 'vant-weapp/dialog/dialog';
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
				hasLocation: true,
        allDetails: '',
        opinion: '',
        Score: 0,
        overImg:'',
        overTime:'',
        overAddress: '',
        //结束打卡
        overClock:false,
        isOver:false,
        //安全到达打卡
        safetyClock: false,
        // 安全到达时间
        safetyTime: '',
        safetyImg: '',
        safetyAddress: '',
        isSafety: false,
        //护理结束
        nurseEndClock: false,
        nurseEndImg: '',
        measures: '',
        evaluate: '',
        isNurseEnd: false,
        nurseEndTime: '',
        nurseEndAddress: '',
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
        isPinggu: false,
        hldj: '',
        add:'',
        //到达打卡
        arriveClock: false,
        arriveTime: '',
        arriveImg: '',
        arriveAddress: '',
        isArrive: false,
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
        isGoOut: false,

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
                title: "　护理",
                isActive: false,
                isShow: false,
            },
             {
                 id: 5,
                 title: "离开打卡",
                 isActive: false,
                 isShow: false,
             }, {
                id: 6,
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
        },
        orderId: '',
        show: true,
        renderData: {
            ishave: ['有', '无'],
            Xlzt: ['稳定', '紧张', '焦虑', '烦躁'],
            Dxb: ['正常', '异常'],
            Yszt: ['清醒', '嗜睡', '烦躁', '昏迷', '其他'],
            Zznl: ['正常', '全瘫', '截瘫', '偏瘫'],
            Pgdj: ['一般', '病重', '病危'],
            Hldj: ['一级', '二级', '三级', '特级'],
        },
        showCancel: false,
        Cancelremark: ''
    },
		callback: function (res) {
				console.log(res)
				console.log(res.detail.authSetting['scope.userLocation'])
				// detail:
				//  authSetting:
				//   scope.userInfo:false
				//   scope.userLocation:false
				if (res.detail.authSetting['scope.userLocation']){
					wx.setStorageSync('hasLocation', true)
				}
			},
    //结束打卡
        onOver() {
            let that = this
            if (that.data.isNurseEnd || that.data.allDetails.ThreeConfirmTime) {
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
                                       overTime: time,
                                        overImg: data.ResultMsg
                                    })
                                }
                            }
                        })
                        //    用微信提供的api获取经纬度
                        that.getWXLocation(1)
                    }
                })
            } else {
                Toast.fail('上一步未操作');
            }

        },
        onOverBtn() {
            let that = this
            let {
                tabs
            } = that.data;
            if (!that.data.overClock) {
                Toast.fail('请先打卡');
                return
            } else if (that.data.nurseEndClock || that.data.allDetails.FourImg) {
                request({
                    method: "POST",
                    url: 'NurseOrder/FiveConfirm',
                    data: {
                        orderId: this.data.orderId,
                         location: that.data.overAddress,
                             baseImg: that.data.overImg,
                             patientName: '',
                             idenNo: '',
                             Score: '',
                    }
                }).then(res => {
                    console.log(res);
                    
                    if (res.data.ResultCode === '0') {

                        tabs[5].isShow = false
                        tabs[6].isActive = true
                        tabs[6].isShow = true
                        that.setData({
                            tabs,
                            isOver: true
                        })
                        this.getdetails()
                    } else {
                        Toast.fail(res.data.ResultMsg);
                    }
                })
            } else {
                Toast.fail('上一步未操作');

            }

        },
    //到达安全地点打卡
    onSafety() {
        let that = this
        if (that.data.isOver || that.data.allDetails.ThreeConfirmTime) {
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
                                      safetyTime: time,
                                      safetyImg: data.ResultMsg
                                  })
																	//    用微信提供的api获取经纬度
																	that.getWXLocation(2)
                              }
                          }
                      })
                  }
              })
        }else{
             Toast.fail('上一步未操作');
        }
      
    },
    // 护理结束打卡
    NurseEnd() {
        let that = this
        if (that.data.isPinggu || that.data.allDetails.hldj >= 1) {
            if (!that.data.nurseBeforeClock && !that.data.allDetails.ThreeImg) {
                Toast.fail('请先护理前打卡');
                return
            } else if (!that.data.measures || !that.data.evaluate) {
                Toast.fail('请填写护理记录');
                return
            }
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
                             var time = util.formatHour(new Date());

                             if (data.ResultCode == 0) {
                                 that.setData({
                                     nurseEndImg: data.ResultMsg,
                                     nurseEndTime: time
                                 })
														 }
														 //    用微信提供的api获取经纬度
														 that.getWXLocation(3)
                         }
                     })
                 }
             })

        } else {
            Toast.fail('上一步未操作');
        }
       
    },
    //护理前打卡
    NurseBefore() {
        console.log("好好");

        let that = this
        if (that.data.isPinggu || that.data.allDetails.hldj >= 1) {
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
                                                let addressArr = []
                                                addressArr.push(that.data.nurseAddress)
                                                let imgArr = []
                                                imgArr.push(that.data.nurseBeforeImg)
                                                request({
                                                    method: 'POST',
                                                    url: 'NurseOrder/ThreeConfirm',
                                                    data: {
                                                        orderId: that.data.orderId,
                                                        location: addressArr.join(','),
                                                        baseImg: imgArr.join(','),
                                                        patientName: '',
                                                        idenNo: '',
                                                        Score: ''
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
                                    }, 
																		fail: function () {
																			wx.setStorageSync('hasLocation', false)
																		}
                                })
                            }
                        }
                    })
                    

                }
            })
        } else {
            Toast.fail('上一步未操作');
        }


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
                       console.log(res);

                       let data = JSON.parse(res.data)
                       if (res.statusCode == 200) {
                           that.setData({
                               goOuttime: time,
                               goOutImg: data.ResultMsg
                           })
													 that.getWXLocation(5)
                       }
                   }
               })

           }
       })


   },
    // 准备完成
    onPrepare() {
        let that = this
        let {
            tabs
        } = this.data;
        if (!this.data.goOutClock) {
            Toast.fail('请先打卡');
            return
        } else {
            request({
                method: 'POST',
                url: 'NurseOrder/OneConfirm',
                data: {
                    orderId: that.data.orderId,
                    location: that.data.goOutAddress,
                    baseImg: that.data.goOutImg,
                    patientName: '',
                    idenNo: '',
                    Score: ''
                }
            }).then(res => {
                console.log(res);
                if (res.data.ResultCode == '0') {
                    tabs[1].isShow = false
                    tabs[2].isActive = true
                    tabs[2].isShow = true
                    this.setData({
                        isGoOut: true,
                        tabs
                    })
                } else {
                    Toast.fail(res.data.ResultMsg);
                }
            })

        }

    },
    // 到达打卡
    onarriveClock() {
        let that = this

        if (that.data.goOutClock || that.data.allDetails.OneConfirmTime) {
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    var time2 = util.formatHour(new Date());
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
                                    arriveTime: time2,
                                    arriveImg: data.ResultMsg
                                })
                                // let myOneClok = wx.getStorageSync('myOneClok')
                                //         myOneClok.arriveClock = that.arriveClock,
                                //         myOneClok.goOuttime =that.goOuttime,
                                //         myOneClok.arriveTime = that.goOutAddress,
                                //         myOneClok.arriveImg = that.goOutImg
                                //    用微信提供的api获取经纬度
																that.getWXLocation(6)
                            }
                        }
                    })
                    
                }
            })

        } else {
            Toast.fail('上一步未操作');
        }


    },
    //实名认证 
    attestationClock() {
        let that = this
        let arriveImg = that.data.arriveImg

        if (that.data.patientName == '' || that.data.idenNo == '') {
            Toast.fail('请输入患者姓名或身份证号');
            return
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
                                    patientImg: data.ResultMsg,
                                    attestation: true
                                })

                                let patientImg = that.data.patientImg
                                let imgsArr = []
                                imgsArr.push(arriveImg)
                                imgsArr.push(patientImg)
                                request({
                                    method: 'POST',
                                    url: 'NurseOrder/TwoConfirm',
                                    data: {
                                        orderId: that.data.orderId,
                                        location: that.data.arriveAddress,
                                        baseImg: imgsArr.join(','),
                                        patientName: that.data.patientName,
                                        idenNo: that.data.idenNo,
                                        Score: '',
                                    } 
                                }).then(res => {
                                    console.log(res);
                                    if (res.data.ResultCode == '0') {
                                        that.setData({
                                            isArrive: true,
                                        })
                                    } else {
                                        // Toast.fail(res.data.ResultMsg+ '，请重新确认并拍照');
                                        Dialog.alert({
                                            message: res.data.ResultMsg+ '，请重新确认并拍照签到'
                                        }).then(() => {
                                        // on close
                                        });
                                        that.setData({
                                            patientImg: '',
                                        })
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
    
    falseCancel() {
        this.setData({
            Cancelremark: '',
            showCancel: false
        })
    },
    remarkChange: function (e) {
        this.setData({
            Cancelremark: e.detail.value
        })
    },
    
    sureCancel() {
        let that = this
        if (!that.data.Cancelremark) {
            wx.showToast({
                title: '请填写原因',
                icon: 'error',
                duration: 2000
            })
            return
        }
        request({
            url: 'NurseOrder/ReceiveFailed',
            data: {
                orderId: that.data.orderId,
                remark: that.data.Cancelremark
            }
        }).then(res => {
            if (res.data.ResultCode === '0') {
                wx.showToast({
                    title: '取消订单成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                        that.setData({
                            Cancelremark: '',
                            showCancel: false
                        })
                        wx.switchTab({
                            url: '../myoder/myoder'
                        })
                    }
                })
            } else {
                Toast.fail(res.data.ResultMsg); 
            }
        })
    },
    //取消订单
    onOderderOff() {
        this.setData({
            showCancel: true
        })
    },

    // 下一步
    onNextStep() {
        let that = this

        let {
            tabs
        } = this.data;
        if (!this.data.arriveClock) {
            Toast.fail('请先打卡');
            return
        } else if (!this.data.isArrive) {
            Toast.fail('可能认证失败，请先实名认证');
            return
        } else if (!this.data.patientImg) {
            Toast.fail('请拍照记录');
            return
        } else {

            tabs[2].isShow = false
            tabs[3].isActive = true
            tabs[3].isShow = true
            that.setData({
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
    radioChangeAdd(e){
 this.setData({
     add: e.detail.value
 })
    },
    //验证 患者姓名
    onChangeName(e) {
        this.setData({
            patientName: e.detail
        })
    },
    onChangeOpinion(e) {
        this.setData({
            opinion: e.detail
        })
    },
    //护理记录
    onChangeMeasures(e) {
        this.setData({
            measures: e.detail
        })
    },
    onChangeEvaluate(e) {
        this.setData({
            evaluate: e.detail
        })
    },
    // 身份证
    onChangeCode(e) {
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
        let that = this
        if (!that.data.safetyClock) {
            Toast.fail('请先打卡');
            return
        }
        request({
            method: "POST",
            url: 'NurseOrder/OrderSuccess',
            data: {
                orderId: this.data.orderId,
                location: that.data.safetyAddress,
                baseImg: that.data.safetyImg,
                patientName: '',
                idenNo: '',
                Score: '',
            }
        }).then(res => {
            console.log(res);
            
            if (res.data.ResultCode == 0) {
                that.setData({
                    safetyClock: true,
                    isSafety: true
                })
                wx.switchTab({
                    url: '../index/index',
                })
            } else {
                console.log(res.data.ResultMsg);
            }
        })
    },
    // 护理结束
    onNurseEnd() {
        let that = this
        let {
            tabs
        } = this.data;
        if (that.data.allDetails.ThreeImg && that.data.allDetails.ThreeLocation) {
            that.setData({
                nurseBeforeClock: true
            })
        }
        if (!this.data.nurseBeforeClock || !this.data.nurseEndClock) {
            Toast.fail('请先打卡');
            return
        } else if (this.data.measures == '' || this.data.evaluate == '') {
            Toast.fail('请填写护理记录');
            return
        } else if (this.data.nurseEndImg == '') {
            Toast.fail('请等待图片上传成功');
            return
        } else {
            tabs[4].isShow = false
            tabs[5].isActive = true
            tabs[5].isShow = true
            this.setData({
                tabs
            })
            let addressArr = []
            addressArr.push(that.data.nurseAddress || that.data.allDetails.ThreeLocation)
            let imgArr = []
            // imgArr.push(that.data.nurseBeforeImg)
            imgArr.push(that.data.nurseEndImg)
            request({
                method: 'POST',
                url: 'NurseOrder/FourConfirm',
                data: {
                    orderId: this.data.orderId,
                    location: addressArr.join(','),
                    baseImg: imgArr.join(','),
                    patientName: '',
                    idenNo: '',
                    Score: ''
                }
            }).then(res => {
                console.log(res);
                if (res.data.ResultCode == 0) {
                    that.setData({
                        isNurseEnd: true
                    })
                } else {
                    console.log(res.data.ResultMsg);
                }
            })
            request({
                url: 'NurseOrder/OrderRecord',
                data: {
                    orderId: this.data.orderId,
                    Measures: that.data.measures,
                    Record: that.data.evaluate,
                }
            }).then(res => {
                console.log(res);
                if (res.data.ResultCode === '0') {
                    that.setData({
                        isNurseEnd: true
                    })
                }
            })
        }
        return true
    },
    // 开始护理
    onNurse() {
        let that = this
        let {
            tabs
        } = that.data;
        if (!this.data.gmywsw) {
            Toast.fail('请选择过敏药物食物');
            return
        } else if (!this.data.xlzt) {
            Toast.fail('请选择心理状态');
            return
        } else if (!this.data.xy || !this.data.yj || !this.data.dxb) {
            Toast.fail('请先勾选');
            return
        } else if (!this.data.yszt) {
            Toast.fail('请选择意识状态');
            return
        } else if (!this.data.zznl) {
            Toast.fail('请选择自主能力');
            return
        } else if (!this.data.pgdj) {
            Toast.fail('请选择评估等级');
            return
        } else if (!this.data.hldj) {
            Toast.fail('请选择护理等级');
            return
        } else if (this.data.arriveClock || this.data.allDetails.TwoConfirmTime) {
            request({
                url: 'NurseOrder/NurseAssessment',
                data: {
                    orderId: this.data.orderId,
                    gmywsw: that.data.gmywsw,
                    xlzt: that.data.xlzt,
                    xy: that.data.xy,
                    yj: that.data.yj,
                    dxb: that.data.dxb,
                    yszt: that.data.yszt,
                    zznl: that.data.zznl,
                    pgdj: that.data.pgdj,
                    hldj: that.data.hldj
                }
            }).then(res => {
                console.log(res);

                if (res.data.ResultCode === '0') {

                    tabs[3].isShow = false
                    tabs[4].isActive = true
                    tabs[4].isShow = true
                    that.setData({
                        tabs,
                        isPinggu: true
                    })
                    this.getdetails()
                } else {
                    Toast.fail(res.data.ResultMsg);
                }
            })
        } else {
            Toast.fail('上一步未操作');

        }

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
    getWXLocation (type) {
			/* 
				type= 1=>结束打卡
				type= 2=>到达安全地点打卡
				type= 3=>护理结束打卡
				type= 4=>护理前打卡
				type= 5=>出门打卡
				type= 6=>到达打卡
			*/
			let that = this
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
										console.log(res.result.address);
										switch (type) {
											case 1:
												that.setData({
														overAddress: res.result.address,
														overClock:true
												})
												break;
											case 2:
												that.setData({
														safetyAddress: res.result.address,
														safetyClock: true
												})
												break;
											case 3:
												that.setData({
														nurseEndAddress: res.result.address,
														nurseEndClock: true
												})
												break;
											case 5:
												that.setData({
														goOutAddress: res.result.address,
														goOutClock: true
												})
												break;
											case 6:
												that.setData({
														arriveAddress: res.result.address
												})
												break;
										
											default:
												break;
										}
										that.setData({
												hasLocation: true
										})
								}

						})
				},
				fail: function () {
				 wx.setStorageSync('hasLocation', false)
				 that.setData({
					 hasLocation: false
				 })
				}
		})
		},
    getdetails() {
        wx.showLoading({
            title: '加载中',
          })
        request({
            method: 'GET',
            url: 'NurseOrder/GetNurseDetail',
            data: {
                orderId: this.data.orderId
            }
        }).then(res => {
            console.log(res);
            wx.hideLoading()

            if (res.data.ResultCode == '0') {
                let caseImgs = ''
                let nurse = res.data.NurseList[0]
                if (nurse.PatientCaseImg) {
                    caseImgs = nurse.PatientCaseImg.split(',')
                } else {
                    caseImgs = []
                }
                if (nurse.OneConfirmTime) {
                    nurse.OneConfirmTime = nurse.OneConfirmTime.substring(11, 16)

                }
                if (nurse.TwoConfirmTime) {
                    nurse.TwoConfirmTime = nurse.TwoConfirmTime.substring(11, 16)
                }
                if (nurse.TwoImg) {
                    nurse.TwoImg = nurse.TwoImg.split(',')
                }
                // if (nurse.ThreeImg) {
                //     nurse.ThreeImg = nurse.ThreeImg.split(',')
                // }
                // if (nurse.ThreeImg) {
                //     nurse.ThreeImg = nurse.ThreeImg.split(',')
                // }
                if (nurse.ThreeConfirmTime) {
                    nurse.ThreeConfirmTime = nurse.ThreeConfirmTime.substring(11, 16)
                }
                if (nurse.FourConfirmTime) {
                    nurse.FourConfirmTime = nurse.FourConfirmTime.substring(11, 16)
                }
                 if (nurse.FiveConfirmTime) {
                     nurse.FiveConfirmTime = nurse.FiveConfirmTime.substring(11, 16)
                 }
                   if (nurse.EndConfirmTime) {
                       nurse.EndConfirmTime = nurse.EndConfirmTime.substring(11, 16)
                   }
                let listObj = {
                    status: nurse.OrderStatus,
                    buycount: "1",
                    serveperson: nurse.PatientName,
                    phone: nurse.Phone,
                    serveaddress: nurse.Address,
                    servetime: nurse.RegDate + ' ' + nurse.RegTime,
                    history: caseImgs,
                    pricelist: nurse.ItemMoney,
                    remark: nurse.Remark,
                    IsStart: nurse.IsStart
                }
                let serviceDataObj = {
                    id: nurse.OrderId,
                    proLogo: '../../img/wechat.png',
                    proName: nurse.ItemName,
                    price: nurse.ItemMoney,
                    time: nurse.ItemTime,
                    proDesc: nurse.ItemIntroduce
                }
                wx.setStorageSync('caseImgs', caseImgs)
                wx.setStorageSync('UnitList', nurse.UnitList)

                let serviseData = [serviceDataObj]
                this.setData({
                    infolist: listObj,
                    datas: serviseData,
                    allDetails: nurse
                })
                console.log(this.data.allDetails);

                let {
                    tabs
                } = this.data;
                let infolist = this.data.infolist
                if (infolist.status == 3) {
                    tabs[0].isShow = false
                    tabs[1].isShow = false
                    tabs[1].isActive = true
                    tabs[2].isActive = true
                    tabs[2].isShow = true
                    this.setData({
                        // arriveClock: true,
                        isGoOut: true,
                        tabs
                    })
                } else if (infolist.status == 4) {
                    tabs[0].isShow = false
                    tabs[1].isShow = false
                    tabs[2].isShow = false
                    tabs[3].isActive = true
                    tabs[1].isActive = true
                    tabs[2].isActive = true
                    tabs[3].isShow = true
                    this.setData({
                        isArrive: true,
                        tabs
                    })
                } else if (infolist.status == 5) {
                    tabs[0].isShow = false
                    tabs[1].isShow = false
                    tabs[2].isShow = false
                    tabs[3].isActive = true
                    tabs[1].isActive = true
                    tabs[2].isActive = true
                    tabs[3].isShow = false
                    tabs[4].isActive = true
                    tabs[4].isShow = true
                    this.setData({
                        isArrive: true,
                        tabs
                    })

                } else if (infolist.status == 7 || infolist.status == 12 || infolist.status == 8 || infolist.status == 13) {
                    tabs[0].isShow = false
                    tabs[1].isShow = false
                    tabs[3].isShow = false
                    tabs[1].isActive = true
                    tabs[2].isActive = true
                    tabs[3].isActive = true
                    tabs[4].isActive = true
                    tabs[4].isShow = true
                    this.setData({
                        tabs,
                        isPinggu: true
                    })
                } else if (infolist.status == 9) {
                    tabs[0].isShow = false
                    tabs[1].isShow = false
                    tabs[3].isShow = false
                    tabs[1].isActive = true
                    tabs[2].isActive = true
                    tabs[3].isActive = true
                    tabs[4].isActive = true
                    tabs[4].isShow = false
                    tabs[5].isActive = true
                    tabs[5].isShow = true
                    this.setData({
                        isNurseEnd: true,
                        isArrive: true,
                        tabs,
                        isPinggu: true
                    })
                } else if (infolist.status == 14) {
                    tabs[0].isShow = false
                    tabs[1].isShow = false
                    tabs[3].isShow = false
                    tabs[1].isActive = true
                    tabs[2].isActive = true
                    tabs[3].isActive = true
                    tabs[4].isActive = true
                    tabs[4].isShow = false
                    tabs[5].isActive = true
                    tabs[5].isShow = false
                    tabs[6].isShow = true
                    tabs[6].isActive = true

                    this.setData({
                        isNurseEnd: true,
                        isArrive: true,
                        tabs,
                        isPinggu: true
                    })
                }
            } else {
                console.log(res.data.ResultMsg);
            }
        })
    },
    toHistory() {
        wx.navigateTo({
            url: '../history/history'
        })
    },
    toCostList() {
        wx.navigateTo({
            url: '../consumable/consumable'
        })
    },
    goPay() {
        let that = this
        if (!this.data.gmywsw) {
            Toast.fail('请选择过敏药物食物');
            return
        } else if (!this.data.xlzt) {
            Toast.fail('请选择心理状态');
            return
        } else if (!this.data.xy || !this.data.yj || !this.data.dxb) {
            Toast.fail('请先勾选');
            return
        } else if (!this.data.yszt) {
            Toast.fail('请选择意识状态');
            return
        } else if (!this.data.zznl) {
            Toast.fail('请选择自主能力');
            return
        } else if (!this.data.pgdj) {
            Toast.fail('请选择评估等级');
            return
        } else if (!this.data.hldj) {
            Toast.fail('请选择护理等级');
            return
        } else if (this.data.arriveClock || this.data.allDetails.TwoConfirmTime) {
            let huliParams = {
                orderId: that.data.orderId,
                gmywsw: that.data.gmywsw,
                xlzt: that.data.xlzt,
                xy: that.data.xy,
                yj: that.data.yj,
                dxb: that.data.dxb,
                yszt: that.data.yszt,
                zznl: that.data.zznl,
                pgdj: that.data.pgdj,
                hldj: that.data.hldj
            }
            wx.setStorageSync('hlpinggu', huliParams);
            wx.navigateTo({
                url: '../costList/costList?id=' + this.data.orderId
            })
            // request({
            //     url: 'NurseOrder/NurseAssessment',
            //     data: {
            //         orderId: that.data.orderId,
            //         gmywsw: that.data.gmywsw,
            //         xlzt: that.data.xlzt,
            //         xy: that.data.xy,
            //         yj: that.data.yj,
            //         dxb: that.data.dxb,
            //         yszt: that.data.yszt,
            //         zznl: that.data.zznl,
            //         pgdj: that.data.pgdj,
            //         hldj: that.data.hldj
            //     }
            // }).then(res => {
            //     console.log(res);

            //     if (res.data.ResultCode === '0') {
            //         wx.navigateTo({
            //             url: '../costList/costList?id=' + this.data.orderId
            //         })
            //     } else {
            //         Toast.fail(res.data.ResultMsg);
            //     }
            // })
        } else {
            Toast.fail('上一步未操作');
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id
        this.setData({
            orderId: id
        })
        this.getdetails()

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