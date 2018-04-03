import grace from "../../../../lib/js/grace/grace.js";
import look from "../../../../lib/js/look/look.js";

grace.page({
  data: {
    topicDescTip: "",
    topicImage: "./resource/image/camera.png"
  },
  customData: {
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
  onTopicDescInput: function(e) {
    this.customData.descriptionLength = e.detail.value.length;
    if (this.customData.descriptionLength == 0) {
      this.$data.topicDescTip = ""
    } else {
      this.$data.topicDescTip = "  (" + this.customData.descriptionLength + "/200)";
    }
  }
})