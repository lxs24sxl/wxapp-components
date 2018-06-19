// components/turntable/turntable.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 0,
      observer: function( newVal, oldVal ) {
        console.log( "newVal",newVal );
        let that = this;
        let data = that.data;
        // 当页面为初始化的时候，不能执行动画
        if (data.init) {
          data.init = false;
          that.setData({
            lot_number: newVal
          });
          console.log("转盘正在初始化...");
        } else {
          // 当抽奖次数大于0的时候，执行动画，并通知父组件
          if (newVal >= 0) {
            console.log("抽奖");
            that.setData({
              lot_number: newVal,
              active: true
            });
            that.startAnimation().then(res => {
              that.lotteryEnd();
            });
          } 
        }
      }
    },
    time: {
      type: Number,
      value: 4000,
      observer: function (newVal, oldVal ) {
        this.setData({
          time: newVal
        });
      }
    },
    active: {
      type: Boolean,
      value: false,
      observer: function ( newVal, oldVal ) {
        console.log("当前状态：", newVal );
        console.log(this.data.lot_number);
        this.setData({
          active: newVal
        }); 
      }
    },
    awardIndex: {
      type: Number,
      value: 0,
      observer: function( newVal, oldVal ) {
        console.log("awardIndex:", newVal );
        this.setData({
          awardIndex: newVal
        });
      }
    }
  },
  // attached() {
  //   console.log("执行attached");
  //   if ( this.data.count <= 0 ) {
  //     this.triggerEvent("final", {}, {});
  //   }
  // },
  /**
   * 组件的初始数据
   */
  data: {
    init: true,
    lot_number: 0,
    turnAnimation: {},
    awardIndex: 0,
    time: 4000,
    active: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 开始抽奖
     */
    startLottery() {
      let that = this;
      let data = that.data;
      let lot_number = data.lot_number;
      let time = data.time;
      that.triggerEvent("animaStart", {}, {});
    },
    /**
     * 抽奖结束
     */
    lotteryEnd () {
      console.log('动画结束');
      this.triggerEvent("animaEnd", {}, {});
    },
    startAnimation() {
      let that = this;
      let awardIndex = that.data.awardIndex;
      let time = that.data.time;
      return new Promise((resolve, reject) => {
        // 初始化动画
        let animationInit = wx.createAnimation({
          duration: 1
        });
        that.animationInit = animationInit;
        animationInit.rotate(0).step();
        that.setData({
          turnAnimation: animationInit.export()
        });
        // 开始动画
        setTimeout(function () {
          
          let animation = wx.createAnimation({
            duration: time,
            timingFunction: 'ease',
          });
          that.animation = animation;
          animation.rotate(360 * 5 - awardIndex * 45).step();
          
          that.setData({
            turnAnimation: animation.export()
          });
          // 开启监听时间
          setTimeout(function () {
            resolve();
          }, time);
        },100);
      });
    },
  }
})
