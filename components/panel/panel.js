// components/panel/panel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    panelData: {
      type: Object,
      value: {
        imgSrc: '',
        name: '原味马卡龙，新品上市。原味马卡龙，新品上市。原味马卡龙，新品上市。原味马卡龙，新品上市',
        count: 2,
        price: 200
      },
      observer: function ( newVal, oldVal ) {
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
