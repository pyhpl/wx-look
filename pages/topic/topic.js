import grace from "../../lib/js/grace/grace.js";
import api from "../../api.js";
import util from "../../utils/util.js"

grace.page({
  data: {
    searchHeaderHeight: 0,
    searchHeaderCloseToSwiperZIndex: "",
    hotTopics: [],
    parentTopics: [],
    onParentTopicIndex: 0,
    topics: [],
    // topicFocus: [],
  },
  customData: {
    swiperAndSearchHeaderHeightDiff: 0,
  },
  // ******************************* 生命周期方法 ******************************* //
  onShow: function() {
    this.data.topics = [];
    this.onLoad();
  },
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
    // 获取最热主题
    self.$http.get(api['hotTopics'] + util.queryString({
      pageInfoJsonStr: util.pageInfoJsonStr(1, 4),
    }))
      .then((success) => {
        self.$data.hotTopics = success.data;
      })
    // 获取父主题
    self.$http.get(api['parentTopics'])
      .then((success) => {
        self.$data.parentTopics = success.data;
        // 获取父主题下的子主题
        self.$http.get(api['fullTopics'] + util.queryString({
          parentTopicUuid: self.data.parentTopics[self.data.onParentTopicIndex].uuid,
          pageInfoJsonStr: util.pageInfoJsonStr(1, 10),
        }))
          .then((success) => {
            if (self.data.topics[self.data.onParentTopicIndex] == undefined) {
              self.data.topics[self.data.onParentTopicIndex] = [];
            }
            self.data.topics[self.data.onParentTopicIndex] = 
              self.data.topics[self.data.onParentTopicIndex].concat(success.data);
            self.setData({
              topics: self.data.topics
            })
            wx.hideNavigationBarLoading();
          })
          .catch((error) => {
            wx.hideNavigationBarLoading();
          })
      })
      .catch(function (error) {
        wx.hideNavigationBarLoading();
      })
  },
  // ******************************* 自定义方法 ******************************* //
  // 打开主题详细信息
  toTopic: function(e) {
    wx.navigateTo({
      url: '../activity/subpage/topic-activity/topic-activity?topic=' + JSON.stringify(
        e.currentTarget.dataset.topic
      ),
    })
  },
  // 关注
  focus: function(e) {
    var self = this;        
    if (self.data.topics[self.data.onParentTopicIndex][e.currentTarget.dataset.index].focused == false) {
      self.$http.post(api['topicFocus'], {
        topicUuid: e.currentTarget.dataset.topicUuid
      })
      .then((success) => {
        self.data.topics[self.data.onParentTopicIndex][e.currentTarget.dataset.index].focused = true;
        self.data.topics[self.data.onParentTopicIndex][e.currentTarget.dataset.index].topicFocusUuid = success.headers.uuid;
        self.setData({
          topics: self.data.topics
        })
      })    
    } else if (self.data.topics[self.data.onParentTopicIndex][e.currentTarget.dataset.index].focused == true) {
      self.$http.delete(api['topicFocus'] + util.queryString({
        uuid: self.data.topics[self.data.onParentTopicIndex][e.currentTarget.dataset.index].topicFocusUuid
      }))
        .then((success) => {
          self.data.topics[self.data.onParentTopicIndex][e.currentTarget.dataset.index].focused = false;
          self.setData({
            topics: self.data.topics
          })
        })
    }
  },
  parentTopicTaped: function (e) {
    this.$data.onParentTopicIndex = e.currentTarget.dataset.index;
  },
  onPageScroll: function (res) {
    // console.log(res.scrollTop)
    if (this.data.searchHeaderCloseToSwiperZIndex != "z-index: 10;" &&
      res.scrollTop >= this.customData.swiperAndSearchHeaderHeightDiff) {
      this.$data.searchHeaderCloseToSwiperZIndex = "z-index: 10;";
    } else if (this.data.searchHeaderCloseToSwiperZIndex != "" &&
      res.scrollTop < this.customData.swiperAndSearchHeaderHeightDiff) {
      this.$data.searchHeaderCloseToSwiperZIndex = "";
    } 
  },
})  