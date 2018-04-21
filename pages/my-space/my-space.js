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
    this.onLoad();
  },
  onLoad: function () {
    var self = this;    
    if (app.globalData.userInfo != null && app.globalData.userInfo != "") {
      self.$data.isLogin = true;
      self.$data.userInfo = app.globalData.userInfo;
    }
  },
  // ********************** 自定义方法 ******************************** //
  // 登录
  login: function() {
    var self = this;
    if (self.data.isLogin == false) {
      self._login();
    }    
  },
  _login: function (resolve, reject) {
    var self = this;
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    look.login()
      .then((success) => {
        self.$data.isLogin = true;
        self.$http.get(api['administrator'])
          .then((success) => {
            if (success.data != null) {
              app.globalData.userInfo.isAdministrator = true;
            }
            self.$data.userInfo = app.globalData.userInfo;
            if (resolve != undefined) {
              resolve(app.globalData.userInfo);
            }
            wx.hideLoading();
          })    
      })
      .catch((error) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误',
          icon: "none"
        })              
      })
  },
  // login check
  loginCheck: function (content, resolve) {
    var self = this;
    if (!self.data.isLogin) {
      wx.showModal({
        content: content,
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            self._login(resolve);
          }          
        }
      })
    } else {
      resolve(app.globalData.userInfo);
    }
  },
  // navigate to 参与的活动
  toActivities: function(e) {
    var self = this;
    self.loginCheck("请先登录", function(res) {
      wx.navigateTo({
        url: './subpage/my-activity/my-activity?feature=' + e.currentTarget.dataset.type,
      })
    })
  },
  // navigate to 关注的主题
  toTopics: function(e) {
    var self = this;
    self.loginCheck("请先登录", function (res) {
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