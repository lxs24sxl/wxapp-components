// components/popup/popup.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 提示文本
     */
    content: {
      type: String,
      value: '默认提示文本',
      observer: function (newVal, oldVal) {
        this.setData({
          content: newVal
        })
      }
    },
    /**
     * 是否显示
     */
    isShow: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.setData({
          isShow: newVal
        })
        // 当isShow为true时，展示动画，否则隐藏着
        if (this.data.isShow) {
          var animation = wx.createAnimation({
            duration: 1200,
            timingFunction: 'ease',
          })

          this.animation = animation

          animation.translateY(39).step()

          this.setData({
            animationData: animation.export()
          })

          setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
              animationData: animation.export(),
              isShow: false
            })
          }.bind(this), 1500)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {}
  },
  /**
   * 
   */
  ready() {

  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
