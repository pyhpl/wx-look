import grace from "../../lib/js/grace/grace.js"

grace.page({
  data: {    
    tags: [
      { id: 1, name: "推荐" },
      { id: 2, name: "电影" },
      { id: 3, name: "电影" },
      { id: 4, name: "电影" },
      { id: 5, name: "电影" },
      { id: 6, name: "电影" },
      { id: 7, name: "电影" }
    ],
    currentId: 1,
    activitys: [
      {
        avatarUrl: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
        initiator: "随风",
        school: "云南大学",
        title: "世人谓我恋长安，其实只恋长安某",
        descPictureUrls: [
          "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
          "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
          "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
        ],
        tag: "火影忍者",
        joinPeople: 1234,
        likeCount: 1234,
        publishDate: "2018-03-18"
      },
      {
        avatarUrl: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
        initiator: "随风",
        school: "云南大学",
        title: "世人谓我恋长安，其实只恋长安某",
        descPictureUrls: [
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
      {
        avatarUrl: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg",
        initiator: "随风",
        school: "云南大学",
        title: "世人谓我恋长安，其实只恋长安某",
        descPictureUrls: [
          "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg",
          "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/hahaha.jpg"
        ],
        tag: "火影忍者",
        joinPeople: 1234,
        likeCount: 1234,
        publishDate: "2018-03-18"
      }
    ]
  },
  // 点击搜索
  toSearch: function() {
    var url = "../search/search";
    wx.navigateTo({
      url: url
    })
  },
  // 导航标签点击
  navbarTagTaped: function (e) {
    this.$data.currentId = e.target.dataset.id;
  },
  // 预览图片
  imagePreview: function (e) {
    var src = e.currentTarget.dataset.src; //获取data-src
    var imgList = e.currentTarget.dataset.list; //获取data-list
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
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
  }
})