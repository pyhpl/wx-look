import grace from "../../lib/js/grace/grace.js";
import api from "../../api.js";
import look from "../../lib/js/look/look.js";

var app = getApp();

grace.page({
  data: {

  },
  // ************** 生命周期方法 ************ //
  onShow: function() {
    this.onLoad();
  },
  onLoad: function () {    
    var wsClient = look.getWsClient();
    wsClient.connect({}, function (frame) {
      wsClient.subscribe('/user/message', function (body, headers) {
        debugger;
        console.log('From MQ:', body);
      });
    })
    wx.setTabBarBadge({
      index: 3,
      text: '4',
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