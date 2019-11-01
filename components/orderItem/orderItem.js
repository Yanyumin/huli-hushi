// components/orderItem/orderItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datas: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickOrder (e) {
      let status = e.currentTarget.dataset['status']
      if (status) {
        wx.showToast({
            title: '已过期订单',
            icon: 'none',
            duration: 2000
        })
        return
      }
      this.triggerEvent('change', { value: e.currentTarget.dataset['id'] });
    },
    startService (e) {
      this.triggerEvent('startService', { value: e.currentTarget.dataset['id'] });
    },
    acceptService (e) {
      this.triggerEvent('acceptService', { value: e.currentTarget.dataset['id'] });
    },
    cancelService (e) {
      this.triggerEvent('cancelService', { value: e.currentTarget.dataset['id'] });
    },
    toAppraise (e) {
      this.triggerEvent('toAppraise', { value: e.currentTarget.dataset['id'] });
    },
    toquxiao (e) {
      this.triggerEvent('toquxiao', { value: e.currentTarget.dataset['id'] });
    }
  }
})
