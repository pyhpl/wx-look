import grace from "../../../../../../lib/js/grace/grace.js"
import api from "../../../../../../api.js"
import util from "../../../../../../utils/util.js";

var app = getApp();

grace.page({
  data: {
    activity: {
      publishUserAvatar: "https://wx.qlogo.cn/mmopen/vi_32/IeF17WLTWuTzcGPU58xtucGMIwjTHEiajC18u8sKFHcvtibaG3GB24AHic8CyFA4epESWZL1tU9yZx6B1XoRoicnXw/0",
      publishUserName: "随风",
      publishDate: "2018-04-21",
      school: "云南大学",
      title: "又是一年樱花开",
      detail: "每一天，周而复始着生活的年轮。时常在想，这样的单调安逸是否就是岁月的情长。只是，当年华逐渐老去以后，才明白，这浩大的人间，还是情愿做遥远的自己，隔着烟烟水色，看看月色，看看灯火，在不眠的夜里与星星对话。有时候，孤单并不都是忧愁的，能安安静静的做自己，亦是时光赋予的最美。 其实，所谓的遗憾，很多时候，都是我们自己不珍惜，得到时不在意，想起时斯人早已远去。常常，我们是一边走着一边望着，总觉得最美的缘分在前方。只是当有一天，自己终于明白真正需要的是什么时，蓦然回首，已空无一人，任你幡然悔悟，却已无处找寻。光阴缱绻，珍惜那些真正在意你的人吧，因为生活越往前行，就越难遇见这样的人了。",
      place: "云南大学步行街XXXX店",
      deadline: "2018-04-13",
      activityImageUrls: ["https://images-1252933270.cos.ap-guangzhou.myqcloud.com/wx1e3bc888e28279a6.o6zAJs6kltMA9xqsVnJtVBLJfkZA.UBzUT0K7zRj9ed780f1243e2cf8de4400e76c27da167.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/wx1e3bc888e28279a6.o6zAJs6kltMA9xqsVnJtVBLJfkZA.UBzUT0K7zRj9ed780f1243e2cf8de4400e76c27da167.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/wx1e3bc888e28279a6.o6zAJs6kltMA9xqsVnJtVBLJfkZA.UBzUT0K7zRj9ed780f1243e2cf8de4400e76c27da167.jpg", "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/wx1e3bc888e28279a6.o6zAJs6kltMA9xqsVnJtVBLJfkZA.UBzUT0K7zRj9ed780f1243e2cf8de4400e76c27da167.jpg", "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/wx1e3bc888e28279a6.o6zAJs6kltMA9xqsVnJtVBLJfkZA.UBzUT0K7zRj9ed780f1243e2cf8de4400e76c27da167.jpg",
      ],
      limitUserCount: 12,
      topicName: "看花回",
    },
    showPopup: false,
    letterCountTip: "",
    isFail: false,
    failText: "不通过",
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

  },
  fail: function () {
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
  onSuggestionInput: function (e) {
    if (e.detail.value.length > 0) {
      this.$data.letterCountTip = "(" + e.detail.value.length + "/300)";
    } else {
      this.$data.letterCountTip = "";
    }
  }
})