// components/loading/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loadingType: {
      type: String,
      value: 'spinner',
      observer: function( newVal, oldVal ) {
        this.setData({
          loadingType: newVal
        });
      }
    },
    color: {
      type: String,
      value: "#67CF22",
      observer: function( newVal, oldVal ) {
        this.setData({
          color: newVal
        });
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
