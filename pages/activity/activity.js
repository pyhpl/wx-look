
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
    currentId: 1
  },
  navbarTagTaped: function (e) {
    this.setData({
      currentId: e.target.dataset.id
    });
  }
})