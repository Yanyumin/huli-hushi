// pages/infolist/infolist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        datas: [{
            id: 1,
            proLogo: '../../img/wechat.png',
            proName: "换药",
            price: "119",
            time: "30",
            proDesc: "更换敷料、检查伤口、清洁伤口"
        }],
    infolist:{
        status: "待确认",
        buycount: "1",
        serveperson: '温秀秀',
        phone: '135434343',
        serveaddress: '广东广州海珠',
        servetime: '2019-09-22',
        history: '5',
        yuyueprice: '119',
        pricelist: '221',
        remark: '疑难杂症',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options);
let id = options.id
let infolist =this.data.infolist

if (id=='1') {
    infolist.status = "待确认"
    this.setData({
infolist
    })
} else if (id=='2') {
     infolist.status = "待服务"
        this.setData({
            infolist
        })
} else if (id=='3') {
     infolist.status = "服务中"
     this.setData({
         infolist
     })
} else if (id=='4') {
      infolist.status = "待评价"
      this.setData({
          infolist
      })
      
}else if (id=="5") {
      infolist.status = "完成"
      this.setData({
          infolist
      })
}

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