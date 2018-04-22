import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";
import api from "../../../../api.js";

grace.page({
  data: {
    more: false,
    activity: {},
  },
  customData: {
  },
  // ******************************* 生命周期方法 ******************************* //
  onLoad: function (e) {
    var self = this;
    // if (e[0].uuid != undefined && e[0].uuid != "") {
      wx.showNavigationBarLoading();
      self.$http.get(api['activityWithAudit'] + util.queryString({
        uuid: "b7387ebf-99ba-49b9-bede-9ee92e9cfd54"
      }))
        .then((success) => {
          wx.hideNavigationBarLoading();
          self.$data.activity = success.data;    
          wx.setNavigationBarTitle({
            title: this.data.activity.fullActivity.title,
          })
        })
        .catch((error) => {
          wx.showToast({
            title: '网络错误',
            icon: "none",
            mask: true,
          })
          wx.hideNavigationBarLoading();
        })
    // }    
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
  // 切换more or less
  switchMoreOrLess: function() {
    this.$data.more = !this.data.more;
  }
})