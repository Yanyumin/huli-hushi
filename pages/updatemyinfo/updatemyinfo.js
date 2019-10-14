// pages/perfectmyinfo/perfectmyinfo.js
import Toast from 'vant-weapp/toast/toast';
import {
    checkIDCard
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
        userInfo: '',

        uploaderList: [],
        uploaderNum: 0,
        showUpload: true,
        uploaderList1: [],
        uploaderNum1: 0,
        showUpload1: true,
        certificateList: [],
        certificateNum: 0,
        certificateShowUpload: false,
        certificateImages: [],
        img1: '',
        img2: '',
        img3: '',
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
      let userInfo = this.data.userInfo
      userInfo.DepartmentName = this.data.columns[e.detail.value]
        this.setData({
            userInfo: userInfo,
            index: e.detail.value
        })
    },
    sexBindChange(e) {
        console.log(e);
        let userInfo = this.data.userInfo
        if (e.detail.value == '0') {
            userInfo.Sex = true
            this.setData({
              userInfo: userInfo
            })
        } else if (e.detail.value == '1') {
          userInfo.Sex = false
          this.setData({
            userInfo: userInfo
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
        let userInfo = this.data.userInfo
        userInfo.IDCard = e.detail
        this.setData({
          userInfo
        })
    },
    phoneChange(e) {
      let userInfo = this.data.userInfo
      userInfo.ContactPhone = e.detail
        this.setData({
          userInfo
        })
    },
    addressChange(e) {
      let userInfo = this.data.userInfo
      userInfo.ContactAddress = e.detail
        this.setData({
          userInfo
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
        let userInfo = this.data.userInfo
        userInfo.RankName = this.data.titleClumns[value]
        userInfo.ScheduleNo = this.data.ScheduleNoArr[value]
        this.setData({
          userInfo
        })
    },
    submitThis() {
        let phoneRes = /^1(3|4|5|6|7|8|9)\d{9}$/
        if (this.data.userInfo.IDCard == '') {
            wx.showToast({
                title: '请填写身份证号',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (!checkIDCard(this.data.userInfo.IDCard)) {
            wx.showToast({
                title: '身份证号格式不正确',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (this.data.userInfo.ContactPhone == '') {
            wx.showToast({
                title: '请填写手机号码',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (!phoneRes.test(this.data.userInfo.ContactPhone)) {
            wx.showToast({
                title: '手机号码格式不正确',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (this.data.userInfo.ContactAddress == '') {
            wx.showToast({
                title: '请输入联系地址',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (this.data.userInfo.IDCardImage == '') {
            wx.showToast({
                title: '请上传身份证正面照片',
                icon: 'none',
                duration: 2000
            })
            return
        } else if (this.data.userInfo.IDCardImage2 == '') {
          wx.showToast({
              title: '请上传身份证背面照片',
              icon: 'none',
              duration: 2000
          })
          return
        } else if (this.data.userInfo.OtherImages.length == 0) {
            wx.showToast({
                title: '请上传至少一张证书照片',
                icon: 'none',
                duration: 2000
            })
            return
          }
          let otherImgs = this.data.userInfo.OtherImages.join(',')
          let userInfo = this.data.userInfo
          userInfo.OtherImages = otherImgs
          this.setData({
              userInfo
          })
          wx.showLoading({
            title: '正在提交',
            mask: 'true'
          })
        let params = this.data.userInfo
        request({
            url: 'NurseRegister/Update',
            method: 'POST',
            data: params
        }).then(res => {
            console.log(res);
            if (res.data.ResultCode == 1) {
                wx.setStorageSync('userInfo', res.data.row)
                wx.hideLoading()
                wx.navigateTo({
                    url: '../submitresult/submitresult',
                })
            }

        })
    }, //上传头像
    logoUpload: function (e) {
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
                        let userInfo = that.data.userInfo
                        userInfo.Logo = data.ResultMsg
                        if (res.statusCode == 200) {
                            that.setData({
                                userInfo
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
      let userInfo = this.data.userInfo
      userInfo.IDCardImage = ''
      this.setData({
          uploaderNum: this.data.uploaderNum - 1,
          uploaderList: nowList,
          showUpload: true,
          userInfo
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
              console.log(res)
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
                        let userInfo = that.data.userInfo
                        userInfo.IDCardImage = data.ResultMsg
                          that.setData({
                            userInfo
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
      let userInfo = this.data.userInfo
      userInfo.IDCardImage2 = ''
      this.setData({
          uploaderNum1: this.data.uploaderNum1 - 1,
          uploaderList1: nowList,
          showUpload1: true,
          userInfo
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
              console.log(res)
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
                        let userInfo = that.data.userInfo
                        userInfo.IDCardImage2 = data.ResultMsg
                          that.setData({
                            userInfo
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
      var uploaderList = this.data.userInfo.OtherImages; //原数据
      let index = ''
      for (let i = 0; i < uploaderList.length; i++) {
          if (i == e.currentTarget.dataset.index) {
              index = i
              uploaderList.splice(index, 1)
              continue;
          } else {
              nowList.push(uploaderList[i])
          }
      }
      let userInfo = this.data.userInfo
      userInfo.OtherImages = nowList
      this.setData({
          certificateNum: this.data.certificateNum - 1,
          certificateList: nowList,
          certificateShowUpload: true,
          userInfo
      })
      let isShow = true
      if (uploaderList.length >= 1) {
          isShow = false
      }
      this.setData({
          certificateShowUpload: isShow
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
  //上传证书图片
  certificateUpload: function (e) {
      var that = this;
      wx.chooseImage({
          count: 1 - that.data.certificateNum, // 默认1
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              console.log(res)
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              let tempFilePaths = res.tempFilePaths;
              let uploaderList = that.data.certificateList.concat(tempFilePaths);
              let userInfo = that.data.userInfo
              let otherImgs = ''
              if (userInfo.OtherImages) {

                otherImgs = userInfo.OtherImages
              } else {
                  
                otherImgs = []
              }
              wx.uploadFile({
                  method: "POST",
                  url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                  filePath: tempFilePaths[0],
                  name: 'file',
                  success: function (res) {
                      let data = JSON.parse(res.data)
                      if (res.statusCode == 200) {
                          otherImgs.push(data.ResultMsg)
                          that.setData({
                              certificateImages: otherImgs,
                              userInfo
                          })
                          console.log(that.data.certificateImages)
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
  //点击按钮增加上传证书
  certificateAdd: function (e) {
      this.setData({
          certificateShowUpload: true
      })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.GetNurseSchedule()
        this.setData({
            phone: wx.getStorageSync('userInfo').ContactPhone,
            workUnit: wx.getStorageSync('userInfo').HospitalName,
            userName: wx.getStorageSync('userInfo').UserName
        })
        let userId = wx.getStorageSync('userInfo').Id
        let params = {
            Id: userId
        }
        wx.showLoading({
            title: '加载中',
          })
        request({
            url: 'NurseRegister/Detail',
            data: params,
            method: 'GET'
        }).then(res => {
            if (res.data.ResultCode === 1) {
                wx.hideLoading()
                // wx.setStorageSync('userInfo', res.data.row)
                // console.log(res);
                let userInfo = res.data.row
                let imgs = ''
                if (!res.data.row.OtherImages) {
                    imgs = ''
                } else {
                    imgs = res.data.row.OtherImages.split(",")
                }
                let Birth = ''
                if (!res.data.row.Birthday) {
                    Birth = ''
                } else {
                    Birth = res.data.row.Birthday.slice(0, 10)
                }
                userInfo.OtherImages = imgs
                this.setData({
                    userInfo: userInfo,
                    otherImgs: imgs,
                    birthday: Birth
                })
            }
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