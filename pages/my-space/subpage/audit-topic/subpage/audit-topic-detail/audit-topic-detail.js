import grace from "../../../../../../lib/js/grace/grace.js"
import api from "../../../../../../api.js"
import util from "../../../../../../utils/util.js";

var app = getApp();

grace.page({
  data: {
    parentTopics: [],
    onParentTopicIndex: 0,
    topic: {},
    showPopup: false,
    showLeftPopup: false,
    letterCountTip: "",
    isFail: false,
    isPass: false,
    failText: "不通过",
    choosedParentTopic: ""
  },
  // *************** 生命周期方法 **************** //
  onLoad: function(e) {
    var self = this;
    if (e[0].topic != undefined) {
      self.$data.topic = JSON.parse(e[0].topic);
      wx.setNavigationBarTitle({
        title: "审核主题：" + self.data.topic.name,
      })
      self.$http.get(api['parentTopics'])
        .then((success) => {
          self.$data.parentTopics = success.data;
        })
    } else {
      wx.showToast({
        title: '网络错误',
        icon: "none"
      })
    }
  },
  // ****************** 页面事件 **************** //
  // 预览图片
  imagePreview: function (e) {
    var imgList = e.currentTarget.dataset.list == undefined ? [e.currentTarget.dataset.src] : e.currentTarget.dataset.list; //获取data-list
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  pass: function() {
    var self = this;
    if (self.data.isPass == false) {
      this.toggleLeftPopup();
    } else {
      wx.showLoading({
        title: '上传中。。。',
        mask: true
      })
      self.$http.put(api['topicWithAuditAndUser'], {
        name: self.data.topic.name,
        topicUuid: self.data.topic.topicUuid,
        parentTopicUuid: self.data.parentTopics[self.data.onParentTopicIndex].uuid,
        auditUuid: self.data.topic.auditUuid,
        state: 1
      })
        .then((success) => {
          wx.hideLoading();
          wx.showToast({
            title: '审核成功',
            icon: 'none',
            mask: true
          });
          self.$goBack({ topicUuid: self.data.topic.topicUuid });
        })
        .catch((error) => {
          wx.hideLoading();
          wx.showToast({
            title: '网络错误',
            icon: 'none',
            mask: true
          })
        })
    }
  },
  fail: function() {
    this.togglePopup();
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
  toggleLeftPopup() {
    this.$data.showLeftPopup = !this.data.showLeftPopup;
    this.$data.isPass = !this.data.isPass;
  },
  onSuggestionInput: function(e) {
    if (e.detail.value.length > 0) {
      this.$data.letterCountTip = "(" + e.detail.value.length + "/300)";
    } else {
      this.$data.letterCountTip = "";
    }
  },
  // 选择父主题
  chooseParentTopic: function(e) {
    this.$data.onParentTopicIndex = e.currentTarget.dataset.index;
  }
})