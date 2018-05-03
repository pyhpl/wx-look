import grace from "../../../../../../lib/js/grace/grace.js"
import api from "../../../../../../api.js"
import util from "../../../../../../utils/util.js";

var app = getApp();

grace.page({
  data: {    
    activity: null,
    showPopup: false,
    letterCountTip: "",
    isFail: false,
    failText: "不通过",
  },
  customData: {
    auditUuid: "",
  },
  // ****************** 生命周期事件 ************ //
  onLoad: function(e) {
    var self = this;
    self.customData.auditUuid = e[0].auditUuid;
    wx.showNavigationBarLoading();
    self.$http.get(api['fullActivity'] + util.queryString({
      uuid: e[0].uuid
    }))
      .then((success) => {
        self.$data.activity = success.data;
        wx.setNavigationBarTitle({
          title: "审核活动：" + self.data.activity.title,
        })
        wx.hideNavigationBarLoading();
      })
      .catch((error) => {
        wx.hideNavigationBarLoading();
        wx.showToast({
          title: '网络错误',
          icon: "none"
        })
      })
  },
  // ****************** 页面事件 **************** //
  // 预览图片
  imagePreview: function (e) {
    var src = e.currentTarget.dataset.src; //获取data-src
    var imgList = e.currentTarget.dataset.list; //获取data-list
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  pass: function () {
    var self = this;
    this._audit({
      fullActivity: {
        uuid: self.data.activity.uuid,
      },
      auditUuid: self.customData.auditUuid,
      state: 1
    });
  },
  fail: function () {
    var self = this;    
    if (self.data.failText == "不通过") {
      this.togglePopup();
      self.$data.failText = "提交审核";
    } else {
      this._audit({
        fullActivity: {
          uuid: self.data.activity.uuid
        },
        suggestion: self.customData.suggestion,
        auditUuid: self.customData.auditUuid,
        state: -1
      });
    }        
  },
  _audit: function(audit) {
    var self = this;
    wx.showLoading({
      title: '上传中。。。',
      mask: true
    })
    self.$http.put(api['activityWithAuditUser'], audit)
      .then((success) => {
        wx.hideLoading();
        wx.showToast({
          title: '审核成功',
          icon: 'none',
          mask: true
        });
        self.$goBack({ activityUuid: self.data.activity.uuid });
      })
      .catch((error) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          mask: true
        })
      })
  },
  togglePopup() {
    this.$data.showPopup = !this.data.showPopup;
    this.$data.isFail = !this.data.isFail;
    if (this.data.isFail == true) {
      this.$data.failText = "提交审核(不通过)"
    } else {
      this.$data.failText = "不通过";
    }
  },
  onSuggestionInput: function (e) {
    this.customData.suggestion = e.detail.value;
    if (e.detail.value.length > 0) {
      this.$data.letterCountTip = "(" + e.detail.value.length + "/300)";
    } else {
      this.$data.letterCountTip = "";
    }
  }
})