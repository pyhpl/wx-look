import grace from "../../lib/js/grace/grace.js"
import api from "../../api.js";

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
    parentTopics: [],
    onParentTopicIndex: 0,
    topics: []
  },
  customData: {
     swiperAndSearchHeaderHeightDiff: 0,
  },
  // ******************************* 生命周期方法 ******************************* //
  onLoad: function () {
    var self = this;
    wx.setNavigationBarTitle({
      title: '主题中心',
    });
    // 计算轮播图与搜索框的高度差
    wx.createSelectorQuery().select('.search-header').boundingClientRect(function (searchHeader) {
      self.$data.searchHeaderHeight = searchHeader.height;
      wx.createSelectorQuery().select('#swiper').boundingClientRect(function (swiper) {        
        self.customData.swiperAndSearchHeaderHeightDiff = swiper.height - searchHeader.height;        
      }).exec();
    }).exec();
    // ******** 页面数据初始化 ******** //
    wx.showNavigationBarLoading();
    // 获取父主题
    self.$http.get(api['parentTopics'])
      .then((success) => {
        self.$data.parentTopics = success.data;        
        // 获取父主题下的子主题
        self.$http.get(api['topics'] + "?parentTopicUuid=" + self.data.parentTopics[self.data.onParentTopicIndex].uuid)
          .then((success) => {
            self.$data.topics[self.data.onParentTopicIndex] = success.data;
            wx.hideNavigationBarLoading();
          })
          .catch((error) => {
            wx.hideNavigationBarLoading();
          })
      })
      .catch(function (error) {
        wx.hideNavigationBarLoading();
      })
    
    self.$http.get(api['parentTopics'])
      .then()
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