import grace from "../../../../lib/js/grace/grace.js";
import look from "../../../../lib/js/look/look.js";
import api from "../../../../api.js";
import util from "../../../../utils/util.js";

grace.page({
  data: {
    topicDescTip: "",
    topicImage: "./resource/image/camera.png"
  },
  customData: {
    topicTitle: "",
    topicDescription: "",
    descriptionLength: 0
  },
  // ******************************页面生命周期方法**************************** //
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '创建主题',
    })
  },
  // ******************************自定义方法********************************* //
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
        that.$data.topicImage = res.tempFilePaths[0];        
      }
    })
  },
  // 主题名称输入
  onTopicTitleInput: function (e) {
    this.customData.topicTitle = e.detail.value;
  },
  // 主题描述输入
  onTopicDescInput: function(e) {
    this.customData.topicDescription = e.detail.value;
    this.customData.descriptionLength = e.detail.value.length;
    if (this.customData.descriptionLength == 0) {
      this.$data.topicDescTip = ""
    } else {
      this.$data.topicDescTip = "  (" + this.customData.descriptionLength + "/300)";
    }
  },
  // 创建主题
  createTopic: function() {
    var self = this;
    var title = this._validateForm();
    if (title != "") {
      wx.showToast({
        title: title,
        mask: true,
        icon: "none"
      })
    } else {
      wx.showLoading({
        title: '创建中',
        mask: true
      })
      // 上传图片
      look.postImageObject(self.data.topicImage, (res) => {
        self.$http.post(api['topic'], {
          name: self.customData.topicTitle,
          description: self.customData.topicDescription,
          image: res.data
        })
        .then(function (success) {         
          wx.hideLoading();
          wx.showToast({
            title: '等待审核',
            mask: true,
            icon: "success"
          })
          wx.redirectTo({
            url: '../../../message/subpage/audit-topic-message/audit-topic-message' + util.queryString({
              uuid: success.headers.uuid
            })
          })
        })
        .catch(function (error) {
          wx.hideLoading();
          wx.showToast({
            title: '上传失败，请重试',
            mask: true,
            icon: "none"
          })
        });
      }, (error) => {
        wx.hideLoading();
        wx.showToast({
          title: '上传失败，请重试',
          mask: true,
          icon: "none"
        })
      });
    }
  },
  // 验证
  _validateForm: function() {
    var title = "";
    if (this.customData.topicTitle == "") {
      title = "请输入主题名称";
      return title;
    }
    if (this.data.topicImage == "./resource/image/camera.png") {
      title = "请选择主题图片";
      return title;
    }
    if (this.customData.topicDescription == "") {
      title = "请输入主题描述";
      return title;
    }    
    return title;
  }
})