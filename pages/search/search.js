import grace from "../../lib/js/grace/grace.js"

grace.page({
  data: {
    tabs: ["主题", "活动"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    activity: {
      avatarUrl: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
      initiator: "随风",
      school: "云南大学",
      title: "世人谓我恋长安",
      descPictureUrls: [
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg"
      ],
      tag: "火影忍者",
      joinPeople: 1234,
      likeCount: 1234,
      publishDate: "2018-03-18",
      deadline: "2018-03-18",
      content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"
    },
    fullActivity: {
      publishUserAvatar: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
      avatarUrl: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
      publishUserName: "随风",
      school: "云南大学",
      title: "世人谓我恋长安",
      activityImageUrls: [
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg"
      ],
      topicName: "火影忍者",
      joinedPeopleCount: 1234,
      likeCount: 1234,
      publishDate: "2018-03-18",
      deadline: "2018-03-18",
      content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"
    }
  },
  // ******************** 页面生命周期方法 *********************** //
  onLoad: function (query) {
    if (query[0].args != undefined) {
      var initArgs = JSON.parse(query[0].args);
      this.$data.activeIndex = initArgs.type;      
    }
    var that = this;
    var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
    wx.getSystemInfo({
      success: function (res) {
        that.$data.sliderLeft = (res.windowWidth / that.data.tabs.length - sliderWidth) / 2;
        that.$data.sliderOffset = res.windowWidth / that.data.tabs.length * that.data.activeIndex;
      }
    });
  },
  // ************************************************** 自定义方法 ************************************************** //
  // tab点击响应方法
  tabClick: function (e) {
    this.$data.sliderOffset = e.currentTarget.offsetLeft;
    this.$data.activeIndex = e.currentTarget.id;
  },
  toPublish: function() {
    if (this.data.activeIndex == 0) {
      wx.navigateTo({
        url: '../publish/subpage/topic-publish/topic-publish',
      })
    } else if (this.data.activeIndex == 1) {
      wx.navigateTo({
        url: '../publish/subpage/activity-publish/activity-publish',
      })
    }
  },
  // 触底加载
  hello: function () {
    console.log("hello");
  }
});