// components/cellList/cellList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 排名数据
     */
    rankData: {
      type: Array,
      value: [{
        rank: 1,
        people_img: "http://07.imgmini.eastday.com/mobile/20170812/5bebf6a4d8bda85a119fe9e59555acc7.jpeg",
        people_name: '林先森',
        win_count: 0,
        mix_correct_count: 9,
        total_count: 6
      }],
      observer: function (newVal, oldVal) {
        this.setData({
          rankData: newVal
        });
      }
    },
    /**
     * 排名类型
     */
    rankType: {
      type: String,
      value: 'all',                // brain, preseverance
      observer: function (newVal, oldVal) {
        this.setData({
          rankType: newVal
        });
      }
    },
    /**
     * 是否有前三榜单
     */
    hasTop: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) {
        this.setData({
          hasTop: newVal
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    topData: [],
    extraData: []
  },
  attached: function () {
    const that = this;
    const data = that.data;
    const hasTop = data.hasTop;
    console.log(hasTop )
    let rankData = data.rankData;
    if (rankData.length >= 3 && data.hasTop) {
      let [topData1, topData2, topData3, ...extraData] = rankData;
      let topData = [topData2, topData1, topData3];
      that.setData({
        extraData: extraData,
        topData: topData
      });

    } else {
      console.log('我不需要变成有前三的榜单');
    }
  },
  moved: function () { },
  detached: function () { },
  /**
   * 组件的方法列表
   */
  methods: {
   
  },
  
})
