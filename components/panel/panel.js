// components/panel/panel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    panelData: {
      type: Object,
      value: {
        sale_img: '',
        sale_name: '原味马卡龙，新品上市。原味马卡龙，新品上市。原味马卡龙，新品上市。原味马卡龙，新品上市',
        amount: 2,
        totalPrice: 200
      },
      observer: function ( newVal, oldVal ) {
        newVal['totalPrice'] = newVal['totalPrice'].toFixed(2)
        this.setData({
          panelData: newVal
        })
      }
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

  }
})
