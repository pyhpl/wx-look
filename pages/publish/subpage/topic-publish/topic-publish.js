import grace from "../../../../lib/js/grace/grace.js";
import look from "../../../../lib/js/look/look.js";
import api from "../../../../api.js";

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
  // ******************************自定义方法********************************* //
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
        that.$data.topicImage = res.tempFilePaths[0];
        look.postImageObject(that.$data.topicImage, (res) => {
          console.log(res.data)
        });
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
      self.$http.post(api['topic'], {
        name: self.customData.topicTitle,
        description: self.customData.topicDescription
      }).then();
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