import grace from "../../lib/js/grace/grace.js"

grace.page({
  data: {
    tabs: ["活动", "主题", "学校"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    activity: {
      avatarUrl: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
      initiator: "随风",
      school: "云南大学",
      title: "世人谓我恋长安，其实只恋长安某",
      descPictureUrls: [
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg"
      ],
      tag: "火影忍者",
      joinPeople: 1234,
      likeCount: 1234,
      publishDate: "2018-03-18",
      deadline: "2018-03-18",
      content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"
    }
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