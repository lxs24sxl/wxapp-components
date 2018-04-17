// components/cell/cell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 组件类型 text/primary
     */
    cellType: {
      type: String,
      value: 'text',
      observer: function ( newVal, oldVal ) {
        this.setData({
          cellType: newVal
        })
      }
    },
    /**
     * 有向右图标时，前面的默认值
     */
    defaultValue: {
      type: String,
      value: '',
      observer: function ( newVal, oldVal ) { 
        this.setData({ selectedValue: newVal })
        if (/-/.test(newVal)) {
          this.setData({
            defaultValueType: 'red'
          })
        }
      }
    },
    /**
     * 列表名称
     */
    cellTitle: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) { this.setData({cellTitle: newVal })}
    },
    /**
     * 列表右边的内容
     */
    cellContent: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) { this.setData({ cellContent: newVal }) }
    },
    /**
     * 数组: 列表标题及列表内容
     */
    cellArray: {
      type: Array,
      value: ['',''],
      observer: function (newVal, oldVal) { 
        this.setData({ 
          cellTitle: newVal[0],
          cellContent: newVal[1] 
        })
      }
    },
    /**
     * 是否有向右箭头
     */
    hasPicker: {
      type: Boolean,
      value: false,
      observer: function ( newVal, oldVal ) {
        this.setData({
          hasPicker: newVal
        })
        if ( this.data.hasPicker ) {
          this.setData({
            cellContent: '',
            isShowNext: true
          })
        }
      }
    },
    /**
     * 是否有底部border
     */
    hasBorder: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        this.setData({
          hasBorder: newVal
        })
      }
    },
    /**
     * 修改最外面的样式
     */
    cellStyle: {
      type: String,
      value: '',
      observer: function ( newVal, oldVal ) { this.setData({ cellStyle: newVal })}
    },
    /**
     * 类型/normal/content
     */
    cellType: {
      type: String,
      value: 'normal',
      observer: function (newVal, oldVal ) { cellType: newVal }
    },
    /**
     *  副内容
     */
    cellSubContent: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) { cellSubContent: newVal }
    },
    /**
     *  内容描述
     */
    cellDesc: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) { cellDesc: newVal }
    }
  },
  ready() {

  },
  /**
   * 组件的初始数据
   */
  data: {
    selectedValue: '',
    cellTitle: '',
    cellContent: '',
    defaultValueType: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
