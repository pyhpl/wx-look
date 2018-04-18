import grace from "../../../../lib/js/grace/grace.js"
import api from "../../../../api.js"
import util from "../../../../utils/util.js";

var app = getApp();

grace.page({
  data: {
    activitys: []
  },
  // ********************** 页面生命周期方法 ******************************** //
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我参与的活动',
    })
    wx.showNavigationBarLoading();
    var self = this;
    // 获取活动
    self.$http.get(api['userFullActivities'] + util.queryString({
      feature: "focus",
      pageInfoJsonStr: util.pageInfoJsonStr(1, 10),
    }))
      .then((activitys) => {
        self.$data.activitys = activitys.data;
        wx.hideNavigationBarLoading();
      })
      .catch(function (error) {
        wx.showToast({
          title: '网络错误！',
          mask: true,
          icon: "none",
        })
        wx.hideNavigationBarLoading();
      });      
  },  
  // ********************** 页面事件 *************************************** //
  // 触底加载
  onReachBottom: function () {
    this.$data.activitys = this.$data.activitys.concat([
      {
        avatarUrl: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
        initiator: "随风",
        school: "云南大学",
        title: "世人谓我恋长安，其实只恋长安某",
        descPictureUrls: [
          "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg"
        ],
        tag: "火影忍者",
        joinPeople: 1234,
        likeCount: 1234,
        publishDate: "2018-03-18"
      }
    ]);
  },
  // ********************** 自定义方法 ************************************* //
  // 预览图片
  imagePreview: function (e) {
    var src = e.currentTarget.dataset.src; //获取data-src
    var imgList = e.currentTarget.dataset.list; //获取data-list
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  // 查看活动详情
  toActivityDetail: function (e) {
    wx.navigateTo({
      url: '../../../activity/subpage/activity-detail/activity-detail?activity=' + JSON.stringify(e.currentTarget.dataset.activity),
    })
  }
})