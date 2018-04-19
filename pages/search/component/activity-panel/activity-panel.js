import grace from "../../../../lib/js/grace/grace.js"

grace.component({
  properties: {
    activity: {
      type: null,
      value: {}
    }
  },
  methods: {
    // 预览图片    
    imagePreview: function (e) {
      var src = e.currentTarget.dataset.src; //获取data-src
      var imgList = e.currentTarget.dataset.list; //获取data-list
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    },
  }
});