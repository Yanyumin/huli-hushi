// pages/uploadmycard/uploadmycard.js
const {
    request
} = require("../../utils/request")
let certy = []
let workCerty = []

let index = ''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploaderList: [],
        uploaderNum: 0,
        showUpload: true,
        uploaderList1: [],
        workuploaderList1: [],
        uploaderNum1: 0,
        showUpload1: true,
        certificateList: [],
        workCertificateList: [],
        certificateNum: 0,
         workCertificateNum: 0,

        certificateShowUpload: true,
        workCertificateShowUpload: true,
        certificateImages: [],
        workCertificateImages:[],
        img1: '',
        img2: '',
        img3: '',
        pId: ''
    },
    // 删除身份证正面图片
    clearImg: function (e) {
        var nowList = []; //新数据
        var uploaderList = this.data.uploaderList; //原数据
        for (let i = 0; i < uploaderList.length; i++) {
            if (i == e.currentTarget.dataset.index) {
                continue;
            } else {
                nowList.push(uploaderList[i])
            }
        }
        this.setData({
            uploaderNum: this.data.uploaderNum - 1,
            uploaderList: nowList,
            showUpload: true
        })
    },
    //展示身份证正面图片
    showImg: function (e) {
        var that = this;
        wx.previewImage({
            urls: that.data.uploaderList,
            current: that.data.uploaderList[e.currentTarget.dataset.index]
        })
    },
    //上传身份证正面图片
    upload: function (e) {
        var that = this;
        wx.chooseImage({
            count: 1 - that.data.uploaderNum, // 默认1
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                let uploaderList = that.data.uploaderList.concat(tempFilePaths);
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                img1: data.ResultMsg
                            })
                        }
                    }
                })
                if (uploaderList.length == 1) {
                    that.setData({
                        showUpload: false
                    })
                }
                that.setData({
                    uploaderList: uploaderList,
                    uploaderNum: uploaderList.length,
                })
            }
        })
    },
    // 删除身份证反面图片
    clearImg1: function (e) {
        var nowList = []; //新数据
        var uploaderList = this.data.uploaderList1; //原数据
        for (let i = 0; i < uploaderList.length; i++) {
            if (i == e.currentTarget.dataset.index) {
                continue;
            } else {
                nowList.push(uploaderList[i])
            }
        }
        this.setData({
            uploaderNum1: this.data.uploaderNum1 - 1,
            uploaderList1: nowList,
            showUpload1: true
        })
    },
    //展示身份证反面图片
    showImg1: function (e) {
        var that = this;
        wx.previewImage({
            urls: that.data.uploaderList1,
            current: that.data.uploaderList1[e.currentTarget.dataset.index]
        })
    },
    //上传身份证反面图片
    upload1: function (e) {
        var that = this;
        wx.chooseImage({
            count: 1 - that.data.uploaderNum1, // 默认1
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                let uploaderList = that.data.uploaderList1.concat(tempFilePaths);
                wx.showLoading({title: '加载中…'})
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        wx.hideLoading()
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                img2: data.ResultMsg
                            })
                        }
                    }
                })
                if (uploaderList.length == 1) {
                    that.setData({
                        showUpload1: false
                    })
                }
                that.setData({
                    uploaderList1: uploaderList,
                    uploaderNum1: uploaderList.length,
                })
            }
        })
    },
    // 删除证书图片
    certificateClearImg: function (e) {
        var nowList = []; //新数据
        var uploaderList = this.data.certificateList; //原数据
        for (let i = 0; i < uploaderList.length; i++) {
            if (i == e.currentTarget.dataset.index) {
                index = i
                certy.splice(index, 1)
                continue;
            } else {
                nowList.push(uploaderList[i])
            }
        }
        this.setData({
            certificateNum: this.data.certificateNum - 1,
            certificateList: nowList,
            certificateShowUpload: true
        })
        let isShow = true
        if (this.data.certificateNum >= 1) {
            isShow = false
        }
        this.setData({
            certificateShowUpload: isShow
        })
    },
       // 删除工作证图片
       workCertificateClearImg: function (e) {
           var nowList = []; //新数据
           var uploaderList = this.data.workCertificateList; //原数据
           for (let i = 0; i < uploaderList.length; i++) {
               if (i == e.currentTarget.dataset.index) {
                   index = i
                   workCerty.splice(index, 1)
                   continue;
               } else {
                   nowList.push(uploaderList[i])
               }
           }
           this.setData({
               workCertificateNum: this.data.workCertificateNum - 1,
               workCertificateList: nowList,
               workCertificateShowUpload: true
           })
           let isShow = true
           if (this.data.workCertificateNum >= 1) {
               isShow = false
           }
           this.setData({
               workCertificateShowUpload: isShow
           })
       },
    //展示证书图片
    certificateShowImg: function (e) {
        var that = this;
        wx.previewImage({
            urls: that.data.uploaderList1,
            current: that.data.uploaderList1[e.currentTarget.dataset.index]
        })
    },
     //展示工作证书图片
     workCertificateShowImg: function (e) {
         var that = this;
         wx.previewImage({
             urls: that.data.uploaderList1,
             current: that.data.uploaderList1[e.currentTarget.dataset.index]
         })
     },
    //上传证书图片
    certificateUpload: function (e) {
        var that = this;
        wx.chooseImage({
            count: 1 - that.data.certificateNum, // 默认1
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                let uploaderList = that.data.certificateList.concat(tempFilePaths);
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            certy.push(data.ResultMsg)
                            that.setData({
                                certificateImages: certy
                            })
                        }
                    }
                })
                that.setData({
                    certificateList: uploaderList,
                    certificateNum: uploaderList.length,
                    certificateShowUpload: false
                })
            }
        })
    },
        //上传工作证图片
        workCertificateUpload: function (e) {
            var that = this;
            wx.chooseImage({
                count: 1 - that.data.workCertificateNum, // 默认1
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    let tempFilePaths = res.tempFilePaths;
                    let uploaderList = that.data.workCertificateList.concat(tempFilePaths);
                    wx.uploadFile({
                        method: "POST",
                        url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                        filePath: tempFilePaths[0],
                        name: 'file',
                        success: function (res) {
                            let data = JSON.parse(res.data)
                            if (res.statusCode == 200) {
                                workCerty.push(data.ResultMsg)
                                that.setData({
                                  workCertificateImages: workCerty
                                })
                            }
                        }
                    })
                    that.setData({
                        workCertificateList: uploaderList,
                        workCertificateNum: uploaderList.length,
                        workCertificateShowUpload: false
                    })
                }
            })
        },
    //点击按钮增加上传证书
    certificateAdd: function (e) {
        this.setData({
            certificateShowUpload: true
        })
    },
      //点击按钮增加上传工作证
      workCertificateAdd: function (e) {
          this.setData({
              workCertificateShowUpload: true
          })
      },

    submitThis() {
        if (!this.data.img1) {
            Toast.fail('请上传身份证正面照片');
            return
        } else if (!this.data.img2) {
            Toast.fail('请上传身份证背面照片');
            return
        } else if (this.data.certificateImages.length == 0) {
            Toast.fail('请上传证书照片');
            return
        } else if (this.data.workCertificateImages.length == 0) {
            Toast.fail('请上传工作证照片');
            return
        }
        let params = {
            IDCardImage: this.data.img1,
            IDCardImage2: this.data.img2,
            OtherImages: this.data.certificateImages.join(';'),
            CardImages: this.data.workCertificateImages.join(';')
        }
        let userId = wx.getStorageSync('userInfo').Id

        var user_info = wx.getStorageSync("user_info")
        
        user_info.IDCardImage = this.data.img1
        user_info.IDCardImage2 = this.data.img2
        user_info.OtherImages = this.data.certificateImages.join(';')
        user_info.CardImages = this.data.workCertificateImages.join(';')

        user_info.HospitalId = wx.getStorageSync('userInfo').HospitalId
        user_info.Id = userId
        request({
            url: 'NurseRegister/Update',
            method: 'POST',
            data: user_info
        }).then(res => {
            console.log(res);
            if (res.data.ResultCode == 1) {
         wx.setStorageSync('userInfo', res.data.row)

                //              var user_info = wx.getStorageSync("user_info")
                //               let userInfo = wx.getStorageSync('userInfo')
                //         userInfo.IDCard = user_info.IDCard
                //   wx.setStorageSync('userInfo', userInfo)
                //   console.log(userInfo);

                wx.navigateTo({
                    url: '../submitresult/submitresult',
                })
                this.setData({
                    pId: res.data.row.Id
                })
            }

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},

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