// pages/ruler/ruler.js
const {
  request
} = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: []
  },
  getRulerDatas () {
    request({
      url: 'SysFile/GetList',
      data: {
        hospitalId: wx.getStorageSync('userInfo').HospitalId
      }
    }).then(res => {
      if (res.statusCode === 200) {
        this.setData({
          datas: res.data
        })
      } else {
      }
    })
  },
  clickItems (event) {
    let index = event.currentTarget.dataset.index
    wx.showLoading({
      title: '正在打开文件……',
    })
    wx.downloadFile({
      url: 'https://api.gdbkyz.com/PreApi' + this.data.datas[index].FilePath, //仅为示例，并非真实的资源
      success (res) {
        const tempFilePath = res.tempFilePath;
        // 保存文件
        wx.saveFile({
          tempFilePath,
          success: function (res) {
            const savedFilePath = res.savedFilePath;
            // 打开文件
            wx.openDocument({
              filePath: savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
              },
              fail: function (err) {
                console.log('打开失败：', err)
              }
            });
            wx.hideLoading()
          },
          fail: function (err) {
            console.log('保存失败：', err)
          }
        });
      },
      fail: function (err) {
        console.log('下载失败：', err);
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRulerDatas()
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