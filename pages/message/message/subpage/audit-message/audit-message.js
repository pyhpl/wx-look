import grace from "../../../../../lib/js/grace/grace.js";
import util from "../../../../../utils/util.js";

grace.page({
  data: {
    more: false,
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
  },
  customData: {
  },
  // ******************************* 生命周期方法 ******************************* //
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: this.data.activity.title,
    })
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