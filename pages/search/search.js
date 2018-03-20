import grace from "../../lib/js/grace/grace.js"

grace.page({
  data: {
    tabs: ["活动", "主题", "学校"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;
    var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
    wx.getSystemInfo({
      success: function (res) {
        that.$data.sliderLeft = (res.windowWidth / that.data.tabs.length - sliderWidth) / 2;
        that.$data.sliderOffset = res.windowWidth / that.data.tabs.length * that.data.activeIndex;
        // that.setData({
        //   sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        //   sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        // });
      }
    });
  },
  tabClick: function (e) {
    this.$data.sliderOffset = e.currentTarget.offsetLeft;
    this.$data.activeIndex = e.currentTarget.id;
    // this.setData({
    //   sliderOffset: e.currentTarget.offsetLeft,
    //   activeIndex: e.currentTarget.id
    // });
  },
  // 触底加载
  hello: function () {
    console.log("hello");
  }
});