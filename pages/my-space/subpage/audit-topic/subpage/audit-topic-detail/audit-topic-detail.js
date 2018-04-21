import grace from "../../../../../../lib/js/grace/grace.js"
import api from "../../../../../../api.js"
import util from "../../../../../../utils/util.js";

var app = getApp();

grace.page({
  data: {
    topic: {
      image: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/wx1e3bc888e28279a6.o6zAJs6kltMA9xqsVnJtVBLJfkZA.WmbS4IfBBEsbed780f1243e2cf8de4400e76c27da167.jpg",
      name: "看花回",
      description: "最美人间四月天，轻暖微寒。杏桃初放芳菲竟，柳絮飘，百里飞烟。水清衔燕影，尾点漪涟。总爱乡街播种年，雨过犁翻。汗牛黄犬粗茶饭，任春红，偶落陌间。", 
    },
    showPopup: false,
    showLeftPopup: false,
    letterCountTip: "",
    isFail: false,
    isPass: false,
    failText: "不通过",
    choosedParentTopic: ""
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
    this.toggleLeftPopup();
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
  }
})