import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";

grace.page({
  data: {
    focusOnIcon: "icon-focus-on",
    likeIcon: "icon-like-new",
    activity: {
      avatarUrl: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
      initiator: "随风",
      school: "云南大学",
      title: "世人谓我恋长安，其实只恋长安某",
      descPictureUrls: [
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
      ],
      tag: "火影忍者",
      joinPeople: 1234,
      likeCount: 1234,
      publishDate: "2018-03-18"
    },
    // editor的bottom属性值
    editorBottom: 0,
    commentLetterCountTip: "",
    isFocus: false
  },
  customData: {
    footerFunctionBarHeight: 0,
    editorBottom: 0
  },
  // ******************************* 生命周期方法 ******************************* //
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: this.data.activity.title,
    })
    var that = this;
    // 计算轮播图与搜索框的高度差
    wx.createSelectorQuery().select('.footer-function-bar').boundingClientRect(function (footerFunctionBar) {
      that.customData.footerFunctionBarHeight = footerFunctionBar.height;
      wx.createSelectorQuery().select('.editor-container').boundingClientRect(function (editor) {
        that.$data.editorBottom = footerFunctionBar.height - editor.height;
        that.customData.editorBottom = that.data.editorBottom;
      }).exec();
    }).exec();
  },
  // ******************************* 自定义方法 ******************************* //
  // 预览图片
  imagePreview: function (e) {
    var src = e.currentTarget.dataset.src; //获取data-src
    var imgList = e.currentTarget.dataset.list; //获取data-list
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  // focus on
  focusOn: function(e) {
    if (this.data.focusOnIcon == "icon-focus-on") {
      this.$data.focusOnIcon = "icon-focus-on-fill focus-on-fill";
    } else {
      this.$data.focusOnIcon = "icon-focus-on";
    }
  },
  // comment
  comment: function() {
    while (this.data.editorBottom != this.customData.footerFunctionBarHeight) {
      this.$data.editorBottom += 1;
    }
  },
  // like
  like: function() {
    if (this.data.likeIcon == "icon-like-new") {
      this.$data.likeIcon = "icon-like-fill-new like-fill";
    } else {
      this.$data.likeIcon = "icon-like-new";
    }
  },
  // input comment
  inputComment: function(e) {
    if (e.detail.value.length == 0) {
      this.$data.commentLetterCountTip = "";
    } else {
      this.$data.commentLetterCountTip = "(" + e.detail.value.length + "/100)"
    }
  },
  // publish comment
  publishComment: function(e) {    
    while (this.data.editorBottom != this.customData.editorBottom) {
      this.$data.editorBottom -= 1;
    }
    this.$data.isFocus = true;
  }
})