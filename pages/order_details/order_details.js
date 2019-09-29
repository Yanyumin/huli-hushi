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
          infolist: {
              clocktime: '',
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
        myAddress: "",
        img: "",
        value1: 3,
        list: {
            status: "",
            buycount: "",
            serveperson: '',
            phone:'',
            serveaddress: '',
            servetime:'',
            history:'',
            yuyueprice:'',
            pricelist: '',
            remark:'',
        },
        datas: [{
            id: 1,
            proLogo: '../../img/wechat.png',
            proName: "换药",
            price: "119",
            time: "30",
            proDesc: "更换敷料、检查伤口、清洁伤口"
        }],
        tabs: [
            {
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
                            method:"POST",
                              url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages', 
                              filePath: tempFilePaths[0],
                              name: 'file',
                              success: function (res) {
                                 let data = JSON.parse(res.data)
                             if (res.statusCode == 200) {
                                    that.setData({
                                        clocktime: time,
                                        img: data.ResultMsg
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
                                           myAddress: res.result.address
                                       })
                                       request({
                                           method: 'POST',
                                           url: 'NurseOrder/OneConfirm',
                                           data: {
                                               orderId: 7,
                                               location: that.data.myAddress,
                                               baseImg: that.data.img,
                                               patientName: '',
                                               idenNo: ''
                                           }
                                       }).then(res => {
                                           console.log(res);

                                       })
                                   }
                               })
                           }
                       })
            }
        })
 

    },
    radioChange: function (e) {
        console.log(e);
        
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    onChange(event) {
        // event.detail 为当前输入的值
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
        let {
            tabs
        } = this.data;
        tabs[3].isShow = false
        tabs[4].isActive = true
        tabs[4].isShow = true
        this.setData({
            tabs
        })
    },

    // 下一步
    onNextStep() {
        let {
            tabs
        } = this.data;
        tabs[2].isShow = false
        tabs[3].isActive = true
        tabs[3].isShow = true
        this.setData({
            tabs
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