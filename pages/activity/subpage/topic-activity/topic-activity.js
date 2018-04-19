import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";

grace.page({
  data: {
    /***** 主题相关数据 ****/
    topic: {},
    more: false, // 是否显示更多
    less: false, // 是否显示更少
    /***** 活动相关数据 ****/
    isShowNewest: true, // 是否显示最新
    isShowHotest: false, // 是否显示最热
    // 活动数据
    activitys: [
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
  // ************************* 生命周期方法 ************************* //
  onLoad(e) {
    var self = this;
    var topic = JSON.parse(e[0].topic);
    topic.rawDescription = topic.description;
    self.$data.topic = topic;
    wx.setNavigationBarTitle({title: this.data.topic.name});
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
  },
  // 预览图片
  imagePreview: function (e) {
    var imgList = e.currentTarget.dataset.list == undefined ? [e.currentTarget.dataset.src] : e.currentTarget.dataset.list; //获取data-list
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  // 点击导航栏 
  chooseNav: function(e) {
    if (e.currentTarget.dataset.nav == 'new') {
      this.$data.isShowNewest = true;
      this.$data.isShowHotest = false;
    } else if (e.currentTarget.dataset.nav == 'hot') {
      this.$data.isShowHotest = true;
      this.$data.isShowNewest = false;
    }
  },
  // navigate to activity-publish with this topic
  toCreateActivityWithTopic: function() {
    var self = this;
    wx.navigateTo({
      url: '../../../publish/subpage/activity-publish/activity-publish?topic=' + JSON.stringify(self.data.topic),
    })
  }
})