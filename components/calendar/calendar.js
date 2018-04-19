// components/calendar/calendar.js
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
    dateWrap: new Array(35),          // 日历容器
    calendar: {                           // 日历数组
      weeksTitle: ['日', '一', '二', '三', '四', '五', '六'],
      curMonth: new Date().getMonth(),
      curYear: new Date().getFullYear(),
      curDay: new Date().getDate()
    },
    perMonthDays: 0,                // 当前月的天数
    firstDayOfWeek: 0,               // 当前月的第一天是星期几
    isCheckArr: [1, 2, 3, 4, 5, 8, 9, 14, 16, 18],               // 已经签到的日期数组
    isCheck: false
  },
  /**
   * 进入节点树时执行
   */
  ready() {
    // 获得当前日期
    const date = new Date()

    // 初始化日历
    this.initCalendar()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 利用月数获得每月的天数
   */
    mGetdays: function (year, month) {
      return new Date(year, month + 1, 0).getDate()
    },
    /**
     * 获得当前月的第一天处于星期几
     */
    getFirstDayOfWeek: function (year, month) {
      const day = new Date(year, month, 1).getDay();
      return day;
    },
    /**
     * 初始化日历
     */
    initCalendar: function () {
      // 获得当前日期
      const date = new Date();
      const data = this.data,                   // 数据
        calendar = data.calendar,           // 日历对象
        curYear = calendar.curYear,         // 当前的年份
        curMonth = calendar.curMonth,       // 当前的月份
        curDay = calendar.curDay,           // 当前的天数
        isCheckArr = data.isCheckArr,       // 已经签到了的天数数组
        perMonthDays = this.mGetdays(curYear, curMonth),                // 每个月的第一天
        firstDayOfWeek = this.getFirstDayOfWeek(curYear, curMonth);     // 每个星期的第一天
      // 空的日历盒子
      let dateWrap = data.dateWrap;
      // 自定义日历盒子数据
      let temp = new Object();

      // 向日历盒子添加 ind和isCheck 属性，已签到的就显示打勾
      for (var i = 1, j = firstDayOfWeek, len = perMonthDays; i <= len; i++) {
        temp = new Object();
        temp['ind'] = i;
        temp['isCheck'] = (isCheckArr.indexOf(i) != -1) ? true : false;
        dateWrap[j] = temp;
        j++;
      }
      this.setData({
        dateWrap: dateWrap,
        perMonthDays: perMonthDays,
        firstDayOfWeek: firstDayOfWeek,
        isCheck: isCheckArr.indexOf(curDay) != -1 ? !data.isCheck : data.isCheck
      });
    },
    /**
     * 签到
     */
    checkIn: function () {
      const data = this.data;
      // 已签到的数组
      let isCheckArr = data.isCheckArr;
      const curDay = data.calendar.curDay;
      // 如果当前已经签到，则弹出提示框，否则签到
      if (isCheckArr.indexOf(curDay) == -1) {
        isCheckArr.push(curDay);
        this.setData({ isCheckArr: isCheckArr });
        wx.showToast({ title: '签到成功' });
        this.initCalendar();
      } else {
        wx.showToast({ title: '您已经签到过了', icon: 'none', duration: 1800 });
      }
    }
  }
})
