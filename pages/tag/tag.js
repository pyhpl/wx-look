import grace from "../../lib/js/grace/grace.js";
import look from "../../lib/js/look/look.js";
import api from "../../api.js"
var Zan = require('../../lib/ui/zanui/index');

var app = getApp();

grace.page(Object.assign({}, Zan.TopTips, {
  data: {
    zanTopTips: {
      show: false,
      content: "",
      options: {
        duration: 500
      },
      timer: 0
    },
    tags: []
  },
  // 自定义数据
  customData: {
    tag: '',
  },
  // ********************** 页面生命周期方法 ******************************** //
  onLoad: function (query) {
    wx.setNavigationBarTitle({
      title: '标签管理',
    })
    this.$data.tags = JSON.parse(query[0].tags);
  },
  onReady: function () {
    if (app.globalData.userInfo == null) {
      look.loginModal("登录后对标签做的更改才会永久保存，是否登录？");
    }
  },
  // ********************** 页面事件 *************************************** //
  onTagInput: function (e) {
    this.customData.tag = e.detail.value;
  },
  addTag: function () {
    var self = this;
    if (this.data.tags.filter((tag) => { tag['name'] == this.customData.tag }).length == 0) {
      wx.showLoading({
        title: '添加中',
        mask: true,
        success: function() {
          self.$http.post(api['tag'], { name: self.customData.tag })
            .then(function(success) {
              wx.hideLoading();              
              self.$data.tags.push({
                uuid: success.headers['uuid'],
                name: self.customData.tag
              });              
              self.$bus.$emit("tagChange", self.data.tags);
            })
            .catch(function(error) {
              wx.hideLoading();
              wx.showToast({
                title: '添加失败',
                duration: 500,
                icon: "none"
              })
            });
        }
      })      
    } else {
      this.showZanTopTips('标签已存在', 700);
    }
  },
  tagDeleteConfirm: function (e) {
    var self = this;
    wx.showModal({
      content: '删除标签"' + e.currentTarget.dataset.tag['name'] + '"？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: "删除中",
            mask: true,
            success: function() {
              self.$http.delete(api['tag'] + "?uuid=" + e.currentTarget.dataset.tag['uuid'])
                .then(function(success) {
                  wx.hideLoading();
                  self.$data.tags.splice(e.currentTarget.dataset.index, 1);
                  self.$bus.$emit("tagChange", self.data.tags);
                })
                .catch(function(error) {
                  wx.hideLoading();
                  wx.showToast({
                    title: '删除失败',
                    duration: 500,
                    icon: "none"
                  })
                });              
            }
          })          
        }
      }
    });
  }
}))