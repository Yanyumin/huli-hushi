// pages/uploadmycard/uploadmycard.js
import Toast from 'vant-weapp/toast/toast';
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
        workCertificateList: [],
        workCertificateNum: 0,
        workCertificateShowUpload: true,
        workCertificateImages:[],
        practisingcardList: [],
        practisingcardNum: 0,
        practisingcardShowUpload: true,
        practisingcardImages: [],
        img1: '',
        img2: '',
        img3: '',
        pId: '',
        uploadFlag: true,
        upload1Flag: true,
        workCardFlag: true,
        practisingcardFlag: true
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
            showUpload: true,
            img1: ''
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
        if (that.data.uploadFlag) {
          that.setData({
            uploadFlag: false
          })
        //   setTimeout(function () {
            // that.setData({
            //   uploadFlag: true
            // })
            wx.chooseImage({
                count: 1, // 默认1
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    let tempFilePaths = res.tempFilePaths;
                    wx.uploadFile({
                        method: "POST",
                        url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                        filePath: tempFilePaths[0],
                        name: 'file',
                        success: function (res) {
                            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                            let uploaderList = that.data.uploaderList.concat(tempFilePaths);
                            let data = JSON.parse(res.data)
                            if (res.statusCode == 200) {
                                that.setData({
                                    img1: data.ResultMsg,
                                    uploadFlag: true
                                })
                            }
                            if (uploaderList.length == 1) {
                                that.setData({
                                    showUpload: false
                                })
                            }
                            that.setData({
                                uploaderList: uploaderList,
                                uploaderNum: uploaderList.length,
                            })
                        },
                        fail: function() {
                            wx.showToast({
                                title: '图片上传失败,请重新上传',
                                icon: 'none',
                                success: function () {
                                    that.setData({
                                        uploadFlag: true
                                    })
                                }
                            })
                        },
                    })
                },
                // fail: function() {
                //     wx.showToast({
                //         title: '选择图片失败,请检查网络并重新上传',
                //         icon: 'none',
                //         success: function () {
                //             that.setData({
                //                 uploadFlag: true
                //             })
                //         }
                //     })
                // },
            })
        //   }, 2000)
        }
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
            showUpload1: true,
            img2: ''
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
        if (that.data.upload1Flag) {
          that.setData({
            upload1Flag: false
          })
        //   setTimeout(function () {
        //     that.setData({
        //       upload1Flag: true
        //     })
            wx.chooseImage({
              count: 1, // 默认1
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                //   wx.showLoading({title: '加载中…'})
                        let tempFilePaths = res.tempFilePaths;
                  wx.uploadFile({
                      method: "POST",
                      url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                      filePath: tempFilePaths[0],
                      name: 'file',
                      success: function (res) {
                        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                        let uploaderList = that.data.uploaderList1.concat(tempFilePaths);
                        //   wx.hideLoading()
                          let data = JSON.parse(res.data)
                          if (res.statusCode == 200) {
                              that.setData({
                                  img2: data.ResultMsg,
                                  upload1Flag: true
                              })
                          }
                          if (uploaderList.length == 1) {
                              that.setData({
                                  showUpload1: false
                              })
                          }
                          that.setData({
                              uploaderList1: uploaderList,
                              uploaderNum1: uploaderList.length,
                          })
                      },
                      fail: function() {
                          wx.showToast({
                              title: '图片上传失败,请重新上传',
                              icon: 'none',
                              success: function () {
                                that.setData({
                                    upload1Flag: true
                                })
                              }
                          })
                      },
                  })
                },
                // fail: function() {
                //     wx.showToast({
                //         title: '选择图片失败,请检查网络并重新上传',
                //         icon: 'none',
                //         success: function () {
                //             that.setData({
                //                 upload1Flag: true
                //             })
                //         }
                //     })
                // },
            })
        //   }, 2000)
        }
        
    },
    // 删除证书图片
    practisingcardClearImg: function (e) {
        var nowList = []; //新数据
        var uploaderList = this.data.practisingcardList; //原数据
        var practisingcardImages = this.data.practisingcardImages; //原数据
        for (let i = 0; i < uploaderList.length; i++) {
            if (i == e.currentTarget.dataset.index) {
                index = i
                practisingcardImages.splice(index, 1)
                continue;
            } else {
                nowList.push(uploaderList[i])
            }
        }
        this.setData({
            practisingcardNum: this.data.practisingcardNum - 1,
            practisingcardList: nowList,
            practisingcardShowUpload: true,
            practisingcardImages: practisingcardImages
        })
        let isShow = true
        if (this.data.practisingcardNum >= 1) {
            isShow = false
        }
        this.setData({
            practisingcardShowUpload: isShow
        })
    },
       // 删除工作证图片
       workCertificateClearImg: function (e) {
           var nowList = []; //新数据
           var uploaderList = this.data.workCertificateList; //原数据
           var workCertificateImages = this.data.workCertificateImages; //原数据
           for (let i = 0; i < uploaderList.length; i++) {
               if (i == e.currentTarget.dataset.index) {
                   index = i
                  //  workCerty.splice(index, 1)
                   workCertificateImages.splice(index, 1)
                   continue;
               } else {
                   nowList.push(uploaderList[i])
               }
           }
           this.setData({
               workCertificateNum: this.data.workCertificateNum - 1,
               workCertificateList: nowList,
               workCertificateShowUpload: true,
               workCertificateImages: workCertificateImages
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
    practisingcardShowImg: function (e) {
        var that = this;
        wx.previewImage({
            urls: that.data.practisingcardList,
            current: that.data.practisingcardList[e.currentTarget.dataset.index]
        })
    },
     //展示工作证书图片
     workCertificateShowImg: function (e) {
         var that = this;
         wx.previewImage({
             urls: that.data.workCertificateList,
             current: that.data.workCertificateList[e.currentTarget.dataset.index]
         })
     },
    //上传证书图片
    practisingcardUpload: function (e) {
        var that = this;
        if (that.data.practisingcardFlag) {
          that.setData({
            practisingcardFlag: false
          })
          wx.chooseImage({
              count: 1, // 默认1
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                let tempFilePaths = res.tempFilePaths;
                  wx.uploadFile({
                      method: "POST",
                      url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                      filePath: tempFilePaths[0],
                      name: 'file',
                      success: function (res) {
                          let data = JSON.parse(res.data)
                          if (res.statusCode == 200) {
                            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                            let uploaderList = that.data.practisingcardList.concat(tempFilePaths);
                              certy.push(data.ResultMsg)
                              that.setData({
                                  practisingcardImages: certy,
                                  practisingcardFlag: true,
                                  practisingcardList: uploaderList,
                                  practisingcardNum: uploaderList.length,
                                  practisingcardShowUpload: false
                              })
                          }
                      },
                      fail: function() {
                          wx.showToast({
                              title: '图片上传失败,请重新上传',
                              icon: 'none',
                              success: function () {
                                that.setData({
                                    practisingcardFlag: true
                                })
                              }
                          })
                      },
                  })
              },
            //   fail: function() {
            //       wx.showToast({
            //           title: '选择图片失败,请检查网络并重新上传',
            //           icon: 'none',
            //           success: function () {
            //             that.setData({
            //                 practisingcardFlag: true
            //             })
            //           }
            //       })
            //   },
          })
        }
    },
        //上传工作证图片
        workCertificateUpload: function (e) {
            var that = this;
            if (that.data.workCardFlag) {
              that.setData({
                workCardFlag: false
              })
              wx.chooseImage({
                  count: 1, // 默认1
                  sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                  success: function (res) {
                    let tempFilePaths = res.tempFilePaths;
                      wx.uploadFile({
                          method: "POST",
                          url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                          filePath: tempFilePaths[0],
                          name: 'file',
                          success: function (res) {
                              let data = JSON.parse(res.data)
                              if (res.statusCode == 200) {
                                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                                let uploaderList = that.data.workCertificateList.concat(tempFilePaths);
                                  workCerty.push(data.ResultMsg)
                                  that.setData({
                                    workCertificateImages: workCerty,
                                    workCardFlag: true,
                                    workCertificateList: uploaderList,
                                    workCertificateNum: uploaderList.length,
                                    workCertificateShowUpload: false
                                  })
                              }
                          },
                          fail: function() {
                              wx.showToast({
                                  title: '图片上传失败,请重新上传',
                                  icon: 'none',
                                  success: function () {
                                    that.setData({
                                        workCardFlag: true
                                    })
                                  }
                              })
                          },
                      })
                  },
                //   fail: function() {
                //       wx.showToast({
                //           title: '选择图片失败,请检查网络并重新上传',
                //           icon: 'none',
                //           success: function () {
                //             that.setData({
                //                 workCardFlag: true
                //             })
                //           }
                //       })
                //   },
              })
            }
        },
    //点击按钮增加上传证书
    certificateAdd: function (e) {
        this.setData({
            practisingcardShowUpload: true
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
        } else if (this.data.workCertificateImages.length == 0) {
            Toast.fail('请上传工作证照片');
            return
        } else if (this.data.practisingcardImages.length == 0) {
            Toast.fail('请上传护士执业证书照片');
            return
        }
        let userId = wx.getStorageSync('userInfo').Id
        let params = {
            IDCardImage: this.data.img1,
            IDCardImage2: this.data.img2,
            OtherImages: this.data.practisingcardImages.join(';'),
            CardImages: this.data.workCertificateImages.join(';'),
            HospitalId: wx.getStorageSync('userInfo').HospitalId,
            Id: userId
        }

        var user_info = wx.getStorageSync("user_info")
        
        // user_info.IDCardImage = this.data.img1
        // user_info.IDCardImage2 = this.data.img2
        // user_info.OtherImages = this.data.practisingcardImages.join(';')
        // user_info.CardImages = this.data.workCertificateImages.join(';')

        // user_info.HospitalId = wx.getStorageSync('userInfo').HospitalId
        // user_info.Id = userId
        var newObj = { ...user_info, ...params };
        request({
            url: 'NurseRegister/Update',
            method: 'POST',
            data: newObj
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