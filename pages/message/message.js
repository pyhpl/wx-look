import grace from "../../lib/js/grace/grace.js";
import api from "../../api.js";
import look from "../../lib/js/look/look.js";
import util from "../../utils/util.js"

var app = getApp();

grace.page({
  data: {
    /**
     * message: {
     *  read: true/false,
     *  content: detail uuid
     *  type: 1(audit message)
     *  title: title, 2(join message)
     *  isPass: true/false,
     *  avatar: avatar,
     *  username: username,
     *  activityName: activityName,
     * }
     */
    messages: [],
  },
  // ************** 生命周期方法 ************ //
  onShow: function () {
    look.setTabBarBadge();
  },
  onReady: function () {
    var self = this;
    this.$bus.$on("read", (index) => {
      self.data.messages[index].read = true;
      self.$data.messages = self.data.messages;
    })
  },
  onLoad: function () {
    var self = this;
    look.loginCheck("登录后查看消息", (data) => {
      data.wsClient.subscribe("/user/message", function (frame) {
        var messages = JSON.parse(frame.body);
        if (messages instanceof Array) {
          self.data.messages = [...messages, ...self.data.messages];
        } else {
          self.data.messages = [messages, ...self.data.messages];
        }
        self.data.messages.map((message, index) => {
          if (message.type == 1) {
            if (message.title.indexOf("未通过：") != -1) {
              message.title = message.title.replace("未通过：", "");
            } else if (message.title.indexOf("通过：") != -1) {
              message.title = message.title.replace("通过：", "");
            }
          } else if (message.type == 2) {
            var args = message.title.split("加入");
            var user = args[0].split("////");
            message.avatar = user[0]; 
            message.username = user[1];
            message.activityName = args[1];
          }          
        })
        self.$data.messages = self.data.messages;
      })
    })
  },
  // ************** 自定义方法 ************ //
  toMessageDetail: function (e) {
    var self = this;
    var message = e.currentTarget.dataset.message;
    if (message.type == 1) {
      if (message.title.indexOf("活动")) {
        self.$http.put(api['message'], {
          uuid: message.uuid,
          read: true,
        })
        wx.navigateTo({
          url: './subpage/audit-activity-message/audit-activity-message' + util.queryString({
            uuid: message.content,
            index: e.currentTarget.dataset.index
          }),
        })
      } else if (message.title.indexOf("主题")) {
        wx.navigateTo({
          url: './subpage/audit-topic-message/audit-topic-message' + util.queryString({
            uuid: message.content,
            index: e.currentTarget.dataset.index
          }),
        })
      }
    }
  },
  delete: function () {
    wx.showModal({
      content: "删除",
      success: function () {
        console.log("deleted");
      }
    })
  },
})