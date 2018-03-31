// components/steps/steps.js
Component({
  options: {
    multipleSlots: true // 启动多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    slotCount: {
      type: 'Number',
      value: 5,
      observer: function (newVal, oldVal ) { 
        var tempArr = [];
        for ( var i = 0; i < newVal; i++ ) {
          tempArr.push( i );
        }
        console.log( tempArr )
        this.setData({ slotCount: newVal, slotArr: tempArr })
      }
    },
    stepTitle: {
      type: String,
      value: '默认标题',
      observer: function ( newVal, oldVal ) { this.setData({ stepTitle: newVal })}
    },
    stepTime: {
      type: String,
      value: '3-13  18:32:00',
      observer: function (newVal, oldVal) { this.setData({ stepTime: newVal }) }
    },
    stepDesc: {
      type: String,
      value: '我是默认描述，我是默认描述，我是默认描述，我是默认描述',
      observer: function (newVal, oldVal) { this.setData({ stepDesc: newVal }) }
    },
    isShowLine: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) { this.setData({ isShowLine: newVal }) }
    },
    active: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) { this.setData({ active: newVal }) }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    slotCount: 5,
    slotArr: [1,2]
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
