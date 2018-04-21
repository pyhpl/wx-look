import look from "../../lib/js/look/look.js";

var app = getApp();

Page({
  customData: {
    activity: '',
    topic: ''
  },
  // *********** 自定义方法 ************ //
  // 获取活动输入值
  onActivityInput: function (e) {
    this.customData.activity = e.detail.value;
  },
  // 获取主题输入值
  onTopicInput: function (e) {
    this.customData.topic = e.detail.value;
  },
  // 搜索活动
  toActivitySearch: function() {
    var args = {
      type: 0,
      content: this.customData.activity
    }
    wx.navigateTo({
      url: '../search/search?args=' + JSON.stringify(args),
    })
  },
  // 搜索主题
  toTopicSearch: function() {
    var args = {
      type: 1,
      content: this.customData.activity
    }
    wx.navigateTo({
      url: '../search/search?args=' + JSON.stringify(args),
    })
  },
  // 发布活动
  toPublishActivity: function() {
    if (app.globalData.userInfo == null) {
      look.loginModal("登录后即可发布")
        .then((success) => {
          wx.navigateTo({
            url: './subpage/activity-publish/activity-publish',
          })
        })
    } else {
      wx.navigateTo({
        url: './subpage/activity-publish/activity-publish',
      })
    }    
  },
  // 发布主题
  toPublishTopic: function() {
    if (app.globalData.userInfo == null) {
      look.loginModal("登录后即可发布")
        .then((success) => {
          wx.navigateTo({
            url: './subpage/topic-publish/topic-publish',
          })
        })
    } else {
      wx.navigateTo({
        url: './subpage/topic-publish/topic-publish',
      })
    }    
  }
})