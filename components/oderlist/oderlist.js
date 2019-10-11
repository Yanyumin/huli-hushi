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
    onStartService(e){
        this.triggerEvent('onStartService', {
            value: e.currentTarget.dataset['index']
        });
    },

    acceptService(e){
      this.triggerEvent('acceptService', {
          value: e.currentTarget.dataset['index']
      });
    },

    cancelService(e){
      this.triggerEvent('cancelService', {
          value: e.currentTarget.dataset['index']
      });
    },

    successService(e){
      this.triggerEvent('successService', {
          value: e.currentTarget.dataset['index']
      });
    },
    toCostList () {
      this.triggerEvent('toCostList');
    },
    toHistory () {
      this.triggerEvent('toHistory');
    },
     toAppraise(e) {
         this.triggerEvent('toAppraise', {
             value: e.currentTarget.dataset['id']
         });
     }
  }
})
