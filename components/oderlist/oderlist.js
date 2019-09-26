// components/oderlist/oderlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   item: {
   type: Object
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
 onExpense(e){
      this.triggerEvent('onExpense', {
          value: e.currentTarget.dataset['index']
      });
 },
 signin(e){
       wx.navigateTo({
           url: '../../pages/punch_sign/punch_sign',
       });
 }
  }
})
