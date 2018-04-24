import grace from "../../lib/js/grace/grace.js"
import api from "../../api.js"
import look from "../../lib/js/look/look.js"

var app = getApp();

grace.page({
  data: {
    isLogin: false,
    userInfo: {
      avatarUrl: "",
      nickName: "轻触登录"
    }  
  },
  // ********************** 页面生命周期方法 ******************************** //
  onShow: function() {
    look.setTabBarBadge();
  },
  onLoad: function () {
    var self = this;    
    if (app.globalData.userInfo != null && app.globalData.userInfo != "") {
      self.$data.isLogin = true;
      self.$data.userInfo = app.globalData.userInfo;
    }
  },
  // ********************** 自定义方法 ******************************** //
  login: function() {
    var self = this;
    look.login(false)
      .then((data) => {
        self.$data.isLogin = true;
        self.$data.userInfo = data.userInfo;
      })
  },
  // navigate to 参与的活动
  toActivities: function(e) {
    var self = this;
    look.loginCheck("请先登录", (data) => {
      if (data != undefined) {
        self.$data.isLogin = true;
        self.$data.userInfo = data.userInfo;
      }
      wx.navigateTo({
        url: './subpage/my-activity/my-activity?feature=' + e.currentTarget.dataset.type,
      })
    })
  },
  // navigate to 关注的主题
  toTopics: function(e) {
    var self = this;
    look.loginCheck("请先登录", (data) => {
      if (data != undefined) {
        self.$data.isLogin = true;
        self.$data.userInfo = data.userInfo;
      }      
      wx.navigateTo({
        url: './subpage/my-topic/my-topic?feature=' + e.currentTarget.dataset.type,
      })
    })    
  },
  // navigate to 审核主题
  toAuditTopics: function() {
    wx.navigateTo({
      url: './subpage/audit-topic/audit-topic',
    })
  },
  // navigate to 审核活动
  toAuditActivities: function() {
    wx.navigateTo({
      url: './subpage/audit-activity/audit-activity',
    })
  }
})