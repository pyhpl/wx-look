import grace from "../../lib/js/grace/grace.js";
import api from "../../api.js";
import look from "../../lib/js/look/look.js";

var app = getApp();

grace.page({
  data: {
    messages: []
  },
  // ************** 生命周期方法 ************ //
  onShow: function() {
    look.setTabBarBadge();
  },
  onLoad: function () {
    var self = this;
    look.loginCheck("登录后查看消息", (data) => {      
      data.wsClient.subscribe("/user/message", function(frame) {
        debugger;
        var messages = JSON.parse(frame.body);
        if (messages instanceof Array) {
          self.data.messages = [...messages, ...self.data.messages];
        } else {
          self.data.messages = [messages, ...self.data.messages];
        }
        self.$data.messages = self.data.messages;
        debugger;
      })
    })
  },
  // ************** 自定义方法 ************ //
  delete: function() {
    wx.showModal({
      content: "删除",
      success: function() {
        console.log("deleted");
      }
    })
  }
})