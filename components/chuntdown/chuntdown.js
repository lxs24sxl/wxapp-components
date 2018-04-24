// components/chuntdown/chuntdown.js
let timer = null;
let titleCount = 0;
let drawCount = 0;
let Promise = require('../../utils/promise.min.js'); 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 等级
     */
    level: {
      type: Number,
      value: 1,
      observer: function (newVal, oldVal) {
        let chuntdownData = {
          chuntdownTime: null,
          speedMultiple: null
        };
        console.log('传入的参数: ' + newVal );
        switch (Number(newVal)) {
          case 1:
            chuntdownData = { chuntdownTime: 10, speedMultiple: 2 };
            break;
          case 2:
            chuntdownData = { chuntdownTime: 10, speedMultiple: 3 };
            break;
          case 3:
            chuntdownData = { chuntdownTime: 10, speedMultiple: 4 };
            break;
          case 4:
            chuntdownData = { chuntdownTime: 10, speedMultiple: 5 };
            break;
          case 5:
            chuntdownData = { chuntdownTime: 10, speedMultiple: 6 };
            break;
          case 6:
            chuntdownData = { chuntdownTime: 10, speedMultiple: 7 };
            break;
          case 7:
            chuntdownData = { chuntdownTime: 10, speedMultiple: 8 };
            break;
          case 8:
            chuntdownData = { chuntdownTime: 9, speedMultiple: 9 };
            break;
          case 9:
            chuntdownData = { chuntdownTime: 9, speedMultiple: 10 };
            break;
          case 10:
            chuntdownData = { chuntdownTime: 8, speedMultiple: 9 };
            break;
        }
        this.setData({
          chuntdownTime: chuntdownData.chuntdownTime,
          speedMultiple: chuntdownData.speedMultiple
        });
      }
    },
    /**
     * 类型(大小)
     */
    size: {
      type: String,
      value: 'default',
      observer: function (newVal, oldVal) {
        this.setData({
          size: newVal
        });
      }
    },
    /**
     * 关闭定时器
     */
    isClear: {
      type: Boolean,
      value: false,
      observer: function ( newVal, oldVal ) {
        if ( newVal ) {
          clearInterval(timer)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canvasInfo: {
      height: 0,
      width: 0
    },
    chuntdownTime: 10,
    speedMultiple: 1,
    size: 'default'
  },
  attached() {
    const that = this;
    const data = that.data;
    console.log('我又在渲染啦~')
  },
  ready() {
    const that = this;
    const data = that.data;
    clearInterval(timer);
    // 在ready生命周期里面调用，以便获取节点数据
    that.startChuntDown('chuntdown');
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
       * 倒计时canvas动画
       */
    startChuntDown(id) {
      const that = this;
      const data = that.data;
      // 速度
      const speedMultiple = data.speedMultiple;
      // 时间
      const chuntdownTime = data.chuntdownTime;
      // 调用获取宽度大小的值
      this.getBoundingClientRect('chuntdown-inner', 'id').then(res => {
        // console.log(data.canvasInfo);
        const canvasInfo = data.canvasInfo;
        // 获得x,y坐标
        let x = canvasInfo.height / 2;
        let y = canvasInfo.width / 2;
        let radius = x - 2;
        // 获得绘图上下文context
        let context = wx.createCanvasContext(id, that);
        // 当前时间时间戳
        let curTime = chuntdownTime * 1000;
        // 倒计时时间戳
        let limitTime = curTime;
        // 倒计时时间
        let speed = limitTime / (100 * speedMultiple);
        console.log("每次执行需要多少毫秒: ", speed);
        // console.log(curTime)
        let time = new Date().getTime();
        let denominator = 10 * chuntdownTime;
        /******************************* */
        let normalTime = chuntdownTime / speedMultiple;
        /***************************** */
        timer = setInterval(function () {
          curTime = curTime - 100;
          // 当时间为0以下时，停止定时器
          if (curTime <= 0) {
            
            wx.showToast({ title: '网络异常,请检查你的网络情况', icon: "none", duration: 1500 });
            // console.log(new Date().getTime())
            time = new Date().getTime() - time;
            console.log("一共用的时间: ", time / 1000);
            console.log("正常需要用的时间: " + normalTime)
            console.log("定时器循环的次数: " + titleCount + ", 绘画执行的次数: " + drawCount);
            clearInterval(timer);
          }
          titleCount++;
          // 当数值为整数时，改变页面
          if (curTime % 1000 == 0) {
            // console.log(parseInt(curTime / 1000));
            that.setData({
              chuntdownTime: parseInt(curTime / 1000)
            });
          }
          that.drawCircle(x, y, radius, context, (limitTime - curTime) / 100, denominator);
        }, 100 / speedMultiple);
      });
    },
    /**
     * 绘画canvas圆圈
     */
    drawCircle(x, y, radius, context, time, denominator) {
      drawCount++;
      context.setLineWidth(4);
      context.setStrokeStyle("#FF675C")
      context.beginPath();
      context.translate(x, y);
      context.rotate(-90 * Math.PI / 180);
      context.arc(0, 0, radius, 0, time * (2 * Math.PI) / denominator, false);
      context.stroke();
      context.closePath();
      context.draw();
    },
    /**
     * 获得canvas容器高度和宽度(适配兼容)
     */
    getBoundingClientRect(ele, type) {
      const that = this;
      const data = that.data;
      let queryType = '#';
      switch (type) {
        case 'id': queryType = '#'; break;
        case 'class': queryType = '.'; break;
      }
      return new Promise((resolve, reject) => {
        // 动态获取容器的高度、宽度
        let query = wx.createSelectorQuery().in(that);
        // 获取节点元素
        query.select(queryType + ele).boundingClientRect();
        // 执行获取方法
        query.exec(function (res) {
          // console.log("节点数据", res )
          let canvasInfo = data.canvasInfo;
          canvasInfo.height = res[0].height;
          canvasInfo.width = res[0].width;
          that.setData({
            canvasInfo: canvasInfo
          });
          resolve();
        })
      })
    },
  }
})
