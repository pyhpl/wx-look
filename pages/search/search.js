import grace from "../../lib/js/grace/grace.js"
import api from "../../api.js";
import util from "../../utils/util.js";

grace.page({
  data: {
    tabs: ["主题", "活动"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    fullTopics: [],
    fullActivities: []
  },
  customData: {
    key: "",
  },
  // ******************* 页面生命周期方法 ********************* //
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
  // ************************** 自定义方法 ****************** //
  // tab点击响应方法
  tabClick: function (e) {
    this.$data.sliderOffset = e.currentTarget.offsetLeft;
    this.$data.activeIndex = e.currentTarget.id;
    if (this.customData.key != "") {
      this.toSearch();
    }
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
  // 搜索框输入
  onKeyInput: function(e) {
    this.customData.key = e.detail.value;
  },
  // 搜索
  toSearch: function() {
    var self = this;
    if (self.data.activeIndex == 0) { // to search topic
      self._topicSearch();
    } else if (self.data.activeIndex == 1) { // to search activity
      self._activitySearch();
    }
  },
  _topicSearch: function() {
    var self = this;
    self.$http.get(api['fullTopics'] + util.queryString({
      key: self.customData.key,
      pageInfoJsonStr: util.pageInfoJsonStr(1, 10),
    }))
      .then((success) => {      
        // self.$data.fullTopics = self.data.fullTopics.concat(success.data);
        self.$data.fullTopics = success.data;
      })
  },
  _activitySearch: function() {
    var self = this;
    self.$http.get(api['fullActivities'] + util.queryString({
      key: self.customData.key,
      pageInfoJsonStr: util.pageInfoJsonStr(1, 10),
    }))
      .then((success) => {
        // self.$data.fullActivities = self.data.fullActivities.concat(success.data);
        self.$data.fullActivities = success.data;
      })
  },
  // 触底加载
  hello: function () {
    console.log("hello");
  }
}); 