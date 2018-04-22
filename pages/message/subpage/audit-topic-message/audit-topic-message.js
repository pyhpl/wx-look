import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";
import api from "../../../../api.js";

grace.page({
  data: {
    auditMore: false,
    /***** 主题相关数据 ****/
    topic: {},
    more: false, // 是否显示更多
    less: false, // 是否显示更少
  },
  customData: {
    rawDescription: ""
  },
  // ********************* 生命周期方法 ********************* //
  onLoad: function (e) {
    var self = this;
    if (e[0].uuid != undefined && e[0].uuid != "") {
      wx.showNavigationBarLoading();
      self.$http.get(api['topicWithAudit'] + util.queryString({
        uuid: e[0].uuid
      }))
        .then((success) => {
          wx.hideNavigationBarLoading();
          self.$data.topic = success.data;          
          wx.setNavigationBarTitle({
            title: this.data.topic.name,
          })
          this.customData.rawDescription = this.data.topic.description;
          this.handleTopicDescription();          
        })
        .catch((error) => {
          wx.showToast({
            title: '网络错误',
            icon: "none",
            mask: true,
          })
          wx.hideNavigationBarLoading();
        })
    } 
  },
  // ************************* 自定义方法 ************************* //
  // 主题描述信息是否太长
  handleTopicDescription() {
    if (this.data.topic.description.length > 51) {
      this.$data.more = true;
      this.$data.topic.description = util.truncate(this.data.topic.description, 51);
    }
  },
  // 显示更多
  showMore: function () {
    this.$data.more = false;
    this.$data.less = true;
    this.$data.topic.description = this.customData.rawDescription;
  },
  // 显示更少
  hideMore: function () {
    this.$data.less = false;
    this.handleTopicDescription();
  },
  // 预览图片
  imagePreview: function (e) {
    var src = e.currentTarget.dataset.src; //获取data-src
    var imgList = [src]; //获取data-list
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  // 切换more or less
  switchMoreOrLess: function() {
    this.$data.auditMore = !this.data.auditMore;
  }
})