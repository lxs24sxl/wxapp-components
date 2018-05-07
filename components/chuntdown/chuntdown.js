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
      value: 0,
      observer: function (newVal, oldVal) {
        this.setData({
          level: newVal
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
      observer: function (newVal, oldVal) {
        console.log("当前关闭定时器数据: " + newVal );
        const that = this;
        let data = that.data;
        that.setData({
          isClear: newVal
        });
        if (data.isClear) {
          console.log('清除定时器');
          clearInterval(timer);
        }
      }
    },
    /**
     * 复活
     */
    isReplay: {
      type: Boolean,
      value: false,
      observer: function ( newVal, oldVal ) {
        // console.log('是否复活：', newVal);
        let that = this;
        
        if (newVal) {
          if (!that.data.replayCount) {
            console.log('复活');
            that.setData({
              replayCount: that.data.replayCount + 1,
              curCountdownTime: 10
            });
            that.__initCurGame();
          }
          
          // console.log("isReplay=>", that.data.replayCount)
        } else {
          clearTimeout( timer );
        }
        
      }
    },
    totalTime:{
      type:Number,
      value: 10,
      observer: function ( newVal, oldVal ) {
        this.setData({
          curChuntdownTime: newVal,
          chuntdownTime: newVal
        });
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
    size: 'default',
    level: null,
    isClear: false,
    replayCount: 0,
    curChuntdownTime: 10
  },
  attached() {
    // console.log("chuntdown-attached");

    const that = this;
    const data = that.data;
    that.setData({
      speedMultiple: Math.ceil(data.level / 3)
    });
  },
  ready() {
    const that = this;
    const data = that.data;
    // 渲染开始的时候，先清楚之前的定时器
    clearInterval(timer);
    // console.log("是否初始化答题： ", data.isClear );
    if (data.isClear) {
      that.setData({
        isClear: false
      });
      // console.log('初始化定时器');
      that.initChuntDown();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initChuntDown() {
      const that = this;
      // 先检查传入的数据是否正常
      that.checkChuntdownDetail().then(res => {
        // 在ready生命周期里面调用，以便获取节点数据
        that.startChuntDown('chuntdown');
      });
    },
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
      // console.log( chuntdownTime );
      // console.log(data.curChuntdownTime );
      // 调用获取宽度大小的值
      this.getBoundingClientRect('chuntdown-inner', 'id').then(res => {
        const canvasInfo = data.canvasInfo;                         // canvas容器的节点信息
        let x = canvasInfo.height / 2;                              // 圆点x坐标
        let y = canvasInfo.width / 2;                               // 圆点y坐标
        let radius = x - 2;                                         // 圆的半径
        let context = wx.createCanvasContext(id, that);             // 获得绘图上下文context
        let curTime = chuntdownTime * 1000;                         // 当前时间时间戳
        let limitTime = curTime;                                    // 倒计时时间戳
        let speed = limitTime / (100 * speedMultiple);               // 倒计时时间
        // console.log("每次执行需要多少毫秒: ", speed);
        let time = new Date().getTime();
        let denominator = 10 * chuntdownTime;                       // 分母(块数)
        let normalTime = chuntdownTime / speedMultiple;             // 平常的预计时间
        // 触发定时器开始事件
        // 需要传递过去的数据
        const startDetail = {
          from: 'chuntdown',
          level: data.level,
          expected_time: normalTime
        };
        that.triggerEvent('start', startDetail, {});
        // 优先清除定时器
        clearTimeout( timer );
        // 开启定时器
        timer = setInterval(function () {
         
          // 当时间为0以下时，停止定时器
          if (curTime <= 0) {
            // 清除定时器
            clearInterval(timer);
            // 结束的时候把页面数字改为0
            that.setData({
              curChuntdownTime: 0
            });
            time = new Date().getTime() - time;
            console.log("一共用的时间: ", time / 1000);
            console.log("正常需要用的时间: " + normalTime);
            const endDetail = {
              total: time / 1000,
              form: 'chuntdown'
            };
            that.triggerEvent('end', endDetail, {});
            // console.log("定时器循环的次数: " + titleCount + ", 绘画执行的次数: " + drawCount);
            return;
          }
          titleCount++;
          // 当数值为整数时，改变页面
          if (curTime % 1000 == 0) {
            // console.log(parseInt(curTime / 1000));
            that.setData({
              curChuntdownTime: parseInt(curTime / 1000)
            });
          }
          // 结尾才减100，多循环一次
          curTime = curTime - 100;
          // 绘画canvas（圆点x坐标，y坐标，半径，canvas上下文, 百分数，块数）
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
    /**
     * 检查传入的参数是否正常
     */
    checkChuntdownDetail() {
      const that = this;
      const data = that.data;
      return new Promise((resolve, reject) => {
        const level = data.level;
        if ( typeof level != 'number' ) {
          wx.showToast({ title: '传入的倒计时等级参数不是数字', icon: "none" });
          reject();
        }
        if (level && level > 0 && level <= 10) {
          resolve()
        } else {
          wx.showToast({ title: '传入的倒计时等级参数不符合规则', icon: "none" });
          reject();
        }
      });
    },
    /**
     * 重新开始当前答题
     */
    __initCurGame() {
      this.initChuntDown();
    }
  }
})
