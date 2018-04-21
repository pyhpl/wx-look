import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";

grace.page({
  data: {
    auditMore: false,
    /***** 主题相关数据 ****/
    topic: {
      name: "看花回",
      description: "最美人间四月天，轻暖微寒。杏桃初放芳菲竟，柳絮飘，百里飞烟。水清衔燕影，尾点漪涟。总爱乡街播种年，雨过犁翻。汗牛黄犬粗茶饭，任春红，偶落陌间。",
      image: "https://images-1252933270.cos.ap-guangzhou.myqcloud.com/wx1e3bc888e28279a6.o6zAJs6kltMA9xqsVnJtVBLJfkZA.WmbS4IfBBEsbed780f1243e2cf8de4400e76c27da167.jpg",
    },
    more: false, // 是否显示更多
    less: false, // 是否显示更少
  },
  customData: {
    rawDescription: ""
  },
  // ********************* 生命周期方法 ********************* //
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: this.data.topic.name,
    })
    this.customData.rawDescription = this.data.topic.description;
    this.handleTopicDescription();
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
    var imgList = e.currentTarget.dataset.list; //获取data-list
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