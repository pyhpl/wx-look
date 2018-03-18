
Page({
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
    images: [
      "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg"
    ]
  },
  // 导航标签点击
  navbarTagTaped: function (e) {
    this.setData({
      currentId: e.target.dataset.id
    });
  },
  // 预览图片
  imagePreview: function (e) {
    var src = e.currentTarget.dataset.src; //获取data-src
    var imgList = e.currentTarget.dataset.list; //获取data-list
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  }
})