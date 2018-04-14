import grace from "../../lib/js/grace/grace.js"
import api from "../../api.js"

var app = getApp();

grace.page({
  data: {

  },
  // ************** 生命周期方法 ************ //
  onLoad: function() {
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