import grace from "../../../../lib/js/grace/grace.js";
import look from "../../../../lib/js/look/look.js";

grace.page({
  data: {
    letterCountTip: "",
    submited: false,
    // 时间相关数据
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
    // 联系方式相关数据
    contactWayIndex: 0,
    contactWays: ["微信", "QQ"]
  },
  // 自定义数据
  customData: {
    detailLength: 0
  },
  // ****************************** 生命周期方法 ********************************* //
  onLoad() {    
    var obj = look.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();
    // 初始化时间数据
    this.$data.dateTime = obj.dateTime;
    this.$data.dateTimeArray = obj.dateTimeArray;
  },
  // ****************************** 自定义方法 ********************************* //
  // 输入活动详情的事件方法
  onActivityDetailInput: function(e) {
    this.customData.detailLength = e.detail.value.length;
    if (this.customData.detailLength == 0) {
      this.$data.letterCountTip = ""
    } else {
      this.$data.letterCountTip = "(" + this.customData.detailLength + "/400)";
    }   
  },
  // 日期改变事件方法
  changeDateTime: function(e) {
    this.$dateTime = e.detail.value;
  },
  // 时间改变事件方法
  changeDateTimeColumn: function(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = look.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.$data.dateTimeArray = dateArr;
    this.$data.dateTime = arr;
  },
  // 联系群改变事件方法
  bindContactWayChange: function(e) {
    this.$data.contactWayIndex = e.detail.value;
  }
})