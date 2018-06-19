// components/notification/notification.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "",
      observer: function( newVal, oldVal ) {
        this.setData({
          title: newVal
        });
      }
    },
    subTitle: {
      type: String,
      value: "",
      observer: function ( newVal, oldVal ) {
        let subTitleArr = newVal.split("\n");
        console.log(subTitleArr );
        this.setData({
          subTitleArr: subTitleArr
        });
      }
    },
    btnTitle: {
      type: String,
      value: "默认点击标题",
      observer: function ( newVal, oldVal ) {
        this.setData({
          btnTitle: newVal
        });
      }
    },
    iconType: {
      type: String,
      value: "success",
      observer: function( newVal, oldVal){
        console.log(newVal );
        let iconType = `icon-${newVal}`;
        this.setData({
          icon_type: iconType
        });
        if ( !this.data.cur_color ) {
          console.log("dsad");
          this.setData({
            cur_color: newVal == 'success' ? '#04aaed' : (newVal == 'fail' ? "#F10706" : "#FFD285")
          });
        }
      }
    },
    color: {
      type: String,
      value: "#04aaed",
      observer: function( newVal, oldVal ) {
        console.log(newVal );
        this.setData({
          cur_color: newVal
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    subTitleArr: [],
    title: null,
    btnTitle: null,
    icon_type: "icon-success",
    cur_color: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    __click( e ) {
      console.log( e );
       this.triggerEvent( "click", {}, {} );
    }
  }
})
