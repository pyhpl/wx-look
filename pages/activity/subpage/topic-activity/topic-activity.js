import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";

grace.page({
  data: {
    // 主题相关数据
    topic: {
      pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
      title: "秋池渐涨，秋叶渐黄",
      description: "拉斯科的激发了快速的减肥啦空拉斯科的激发了快速的减肥啦空间发了看似简单风口浪尖埃里克积分抵扣拉开纠纷积分抵拉斯科的激发了快速的减肥啦空间发了看似简单风口浪尖埃里克积分抵扣拉开纠纷积分抵扣拉开纠纷积分抵扣拉开纠纷扣拉开纠纷积分抵扣拉开纠纷间发了看似简单风口浪尖埃里克积分抵扣拉开纠纷积分抵扣拉开纠纷积分抵扣拉开纠纷",      
      rawDescription: "拉斯科的激发了快速的减肥啦空拉斯科的激发了快速的减肥啦空间发了看似简单风口浪尖埃里克积分抵扣拉开纠纷积分抵拉斯科的激发了快速的减肥啦空间发了看似简单风口浪尖埃里克积分抵扣拉开纠纷积分抵扣拉开纠纷积分抵扣拉开纠纷扣拉开纠纷积分抵扣拉开纠纷间发了看似简单风口浪尖埃里克积分抵扣拉开纠纷积分抵扣拉开纠纷积分抵扣拉开纠纷"
    },
    more: false, // 是否显示更多
    less: false, // 是否显示更少
  },
  // ************************* 生命周期方法 ************************* //
  onLoad() {
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
  showMore: function() {
    this.$data.more = false;
    this.$data.less = true;
    this.$data.topic.description = this.data.topic.rawDescription;
  },
  // 显示更少
  hideMore: function() {
    this.$data.less = false;
    this.handleTopicDescription();
  },
  // 预览图片
  imagePreview: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  }
})