import grace from "../../lib/js/grace/grace.js"

grace.page({
  data: {
    searchHeaderHeight: 0,
    searchHeaderCloseToSwiperZIndex: "",
    hotTopicUrls: [
      { url: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg' },
      { url: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg' },
      { url: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg' },
      { url: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg' }
    ],
    parentTopics: [
      "关注", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏",
    ],
    onParentTopicIndex: 0,
    topics: [
      [
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: "火影忍者"
        },

      ]
    ]
  },
  customData: {
     swiperAndSearchHeaderHeightDiff: 0,
  },
  // ******************************* 生命周期方法 ******************************* //
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '主题中心',
    });
    // 计算轮播图与搜索框的高度差
    wx.createSelectorQuery().select('.search-header').boundingClientRect(function (searchHeader) {
      that.$data.searchHeaderHeight = searchHeader.height;
      wx.createSelectorQuery().select('#swiper').boundingClientRect(function (swiper) {        
        that.customData.swiperAndSearchHeaderHeightDiff = swiper.height - searchHeader.height;        
      }).exec();
    }).exec();    
  },
  // ******************************* 自定义方法 ******************************* //
  parentTopicTaped: function (e) {
    this.$data.onParentTopicIndex = e.currentTarget.dataset.index;
  },
  onPageScroll: function (res) {
    console.log(res.scrollTop)
    if (this.data.searchHeaderCloseToSwiperZIndex != "z-index: 10;" &&
      res.scrollTop >= this.customData.swiperAndSearchHeaderHeightDiff) {
      this.$data.searchHeaderCloseToSwiperZIndex = "z-index: 10;";
    } else if (this.data.searchHeaderCloseToSwiperZIndex != "" &&
      res.scrollTop < this.customData.swiperAndSearchHeaderHeightDiff) {
      this.$data.searchHeaderCloseToSwiperZIndex = "";
    } 
  },
})  