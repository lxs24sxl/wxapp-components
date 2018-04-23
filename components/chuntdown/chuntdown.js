// components/chuntdown/chuntdown.js
/**
 * name: chuntdown(倒计时) 
 * auther: lxs24sxl
 * version: 1.0.0
 * email: 1001931638@139.com
 * address: Guangzhou
 */
let timer = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    canvasInfo: {
      height: 0,
      width: 0
    },
    chuntdown_time: 10,
    speedMultiple: 1
  },
  attached() {
    const that = this;
    const data = that.data;
    // that.startChuntDown('chuntdown');
  },
  ready() {
    const that = this;
    const data = that.data;
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
      this.getBoundingClientRect('chuntdown-inner', 'id').then(res => {
        console.log(data.canvasInfo);
        // 获得x,y坐标
        let x = data.canvasInfo.height / 2;
        let y = data.canvasInfo.width / 2;
        let radius = x - 2;
        // 获得绘图上下文context
        let context = wx.createCanvasContext(id, that );
        // 当前时间时间戳
        let curTime = data.chuntdown_time * 1000;
        // 倒计时时间戳
        let limitTime = curTime;
        // 
        // 倒计时时间
        let speed = limitTime / (100 * data.speedMultiple);
        console.log( "每次执行需要多少毫秒: ",speed );
        console.log(curTime)
        timer = setInterval(function () {
          curTime = curTime - 100;
          // 当时间为0以下时，停止定时器
          if (curTime <= 0) {
            clearInterval(timer);
            wx.showToast({ title: '网络异常,请检查你的网络情况', icon: "none", duration: 1500 });
          }
          if (curTime % 1000 == 0) {
            that.setData({
              chuntdown_time: parseInt(curTime / 1000)
            });
          }
          that.drawCircle(x, y, radius, context, (limitTime - curTime) / 100);
        }, speed);
      });
    },
    /**
     * 
     */
    drawCircle(x, y, radius, context, time) {
      // console.log(`${x},${y},${radius},${context},${time}`);
      context.setLineWidth(4);
      context.setStrokeStyle("#FF675C")
      context.beginPath();
      context.translate(x, y);
      context.rotate(-90 * Math.PI / 180)
      context.arc(0, 0, radius, 0, time * (2 * Math.PI) / 100, false);
      context.stroke();
      context.closePath();
      context.draw()
    },
    /**
     * 获得canvas容器高度和宽度
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
        // console.log(query.select(queryType + ele).boundingClientRect().exec())
        console.log( queryType + ele )
        query.select(queryType + ele).boundingClientRect();
        query.exec(function (res) {
          console.log("节点数据", res )
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
