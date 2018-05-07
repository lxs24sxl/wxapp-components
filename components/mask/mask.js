// components/mask/mask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.setData({
          isShow: newVal
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  attached() {

  },
  ready() {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _preventD: function () {},
    _hideMask: function () {
      this.setData({
        isShow: false
      });
    }
  }
})
