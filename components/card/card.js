// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    insertValue: {
      type: Object,
      value: {
        ad_thumb_img: "http://qncate.yolewa.com/1528884069941.jpg",
        ad_title: "幸运大礼包",
        ad_id: "",
        appid: "",
        ad_path: "",
        ad_extra: "",
        status: "1"
      },
      observer: function ( newVal, oldVal ) {
        this.setData({
          insertValue: newVal
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    insertValue: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickNavigator() {
      let detail = this.data.insertValue;
      this.triggerEvent("click", detail, {});
    }
  }
})
