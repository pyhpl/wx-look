import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";
import api from "../../../../api.js";

var app = getApp();

grace.page({
  data: {
    focusOnIcon: "icon-focus-on",
    likeIcon: "icon-like-new",
    commentIcon: "icon-comment",
    activity: {},
    likeCount: 0,
    discussCount: 0,
    // editor的bottom属性值
    isCommenting: false,
    commentLetterCountTip: "",
    comment: "评论",
    commentInfo: "",
    publishText: "",
    discussions: [],
    replyTip: "添加评论"
  },
  customData: {
    publishText: "参与活动",
    join: {},
    activityFocus: {},
    activityLike: {},
    discussionIndex: -1,
    belongToDiscussion: "",
    toUser: "",
    toUserName: "",
  },
  // ******************************* 生命周期方法 ******************************* //
  onLoad: function (query) {
    var self = this;
    self.$data.activity = JSON.parse(query[0].activity);    
    self.$data.likeCount = self.data.activity.likeCount;
    self.$data.discussCount = self.data.activity.discussionCount;
    wx.setNavigationBarTitle({
      title: self.data.activity.title,
    })      
    wx.showNavigationBarLoading();
    // 获取评论
    self.$http.get(api['fullDiscussions'] + "?belongToActivity=" + self.data.activity.uuid)
      .then((success) => {
        wx.hideNavigationBarLoading();
        self.$data.discussions = success.data;
      })
      .catch((error) => {
        wx.hideNavigationBarLoading();
        wx.showToast({
          title: '网络错误，请重试',
          mask: true,
          icon: "none"
        })
      })
    // 用户个性化配置
    if (app.globalData.userInfo != null) {
      // 是否已赞
      self.$http.get(api['like'] + "?activityUuid=" + self.data.activity.uuid)
        .then((success) => {
          if (success.data != "") {            
            self.customData.activityLike = success.data;
            self.$data.likeIcon = "icon-like-fill-new like-fill";            
          }
        })
      // 是否已关注
      self.$http.get(api['activityFocus'] + "?activityUuid=" + self.data.activity.uuid)
        .then((success) => {
          if (success.data != "") {
            self.customData.activityFocus = success.data;
            self.$data.focusOnIcon = "icon-focus-on-fill focus-on-fill";
          }
        })
      // 是否已参与活动
      self.$http.get(api['join'] + "?activityUuid=" + self.data.activity.uuid)
        .then((success) => {
          if (success.data != "") {
            self.customData.join = success.data;
            self.customData.publishText = "已参与";
          }
          this.$data.publishText = self.customData.publishText;
        })
    }
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
  // focus on
  focusOn: function(e) {
    var self = this;
    if (this.data.focusOnIcon == "icon-focus-on") {
      self.$http.post(api['activityFocus'], {
        activityUuid: self.data.activity.uuid
      })
      .then((success) => {
        self.customData.activityFocus = {
          uuid: success.headers.uuid
        }
        self.$data.focusOnIcon = "icon-focus-on-fill focus-on-fill";
      })
    } else {
      self.$http.delete(api['activityFocus'] + "?uuid=" + self.customData.activityFocus.uuid)
        .then((success) => {
          this.$data.focusOnIcon = "icon-focus-on";
        })
    }
  },
  // comment
  comment: function() {
    this.$data.replyTip = this.data.replyTip;
    if (this.data.isCommenting == false) {
      this.$data.isCommenting = true;
      this.$data.comment = "发表";
      this.$data.commentIcon = "icon-publish";
      this.$data.publishText = "发表评论";
    } else {
      this.$data.isCommenting = false;
      this.$data.comment = "评论";
      this.$data.publishText = this.customData.publishText;
      this.$data.commentIcon = "icon-comment";
      this.$data.replyTip = "添加评论";
    }
  },
  // close comment
  closeComment: function() {
    this.$data.isCommenting = false;
    this.$data.comment = "评论";
    this.$data.commentIcon = "icon-comment";
    this.$data.publishText = this.customData.publishText;
    this.$data.replyTip = "添加评论";
  },
  // like
  like: function() {
    var self = this;
    if (self.data.likeIcon == "icon-like-new") {
      // 点赞
      self.$http.post(api['like'], {
        activityUuid: self.data.activity.uuid
      })
      .then((success) => {
        self.customData.activityLike = {
          uuid: success.headers.uuid
        }        
        self.$data.likeIcon = "icon-like-fill-new like-fill";
        self.$data.likeCount = self.data.likeCount + 1;
      })
    } else {
      // 取消赞
      self.$http.delete(api['like'] + '?uuid=' + self.customData.activityLike.uuid)
        .then((success) => {
          self.$data.likeIcon = "icon-like-new";
          self.$data.likeCount = self.data.likeCount - 1;
        })
    }
  },
  // input comment
  inputComment: function(e) {
    if (e.detail.value.length == 0) {
      this.$data.commentLetterCountTip = "";
      this.$data.commentInfo = ""
    } else {
      this.$data.commentLetterCountTip = "(" + e.detail.value.length + "/100)"
      this.$data.commentInfo = e.detail.value;
    }
  },
  // publish comment
  publishComment: function(e) {
    this.$data.isCommenting = false;
    this.$data.comment = "评论";
    this.$data.commentInfo = "";
    this.$data.publishText = this.customData.publishText;
  },
  // 参与活动或发表评论
  joinOrComment: function() {    
    var self = this;
    if (self.data.publishText == "参与活动") {
      wx.showLoading({
        title: '加入中',
        mask: true
      })
      self.$http.post(api['join'], {
        activityUuid: self.data.activity.uuid
      })
      .then((success) => {
        wx.hideLoading();
        wx.showToast({
          title: '加入成功',
          mask: true,
          icon: "none"
        })
        self.customData.join = {
          uuid: success.headers.uuid
        }
        self.customData.publishText = "已参与";
        self.$data.publishText = self.customData.publishText;
      })
    } else if (self.data.publishText == "已参与") {
      self.$http.delete(api['join'] + '?uuid=' + self.customData.join.uuid)
        .then((success) => {          
          self.customData.publishText = "参与活动";
          self.$data.publishText = self.customData.publishText;
        })
    } else if (self.data.publishText == "发表评论") {
      var discussion = {
        belongToActivity: self.data.activity.uuid,
        contents: self.data.commentInfo
      };
      if (self.data.replyTip != "添加评论") {
        discussion.toUser = self.customData.toUser;
        discussion.belongToDiscussion = self.customData.belongToDiscussion;
      }
      wx.showLoading({
        title: '评论中',
        mask: true
      })
      self.$http.post(api['discussion'], discussion)
        .then((success) => {
          wx.hideLoading();
          wx.showToast({
            title: '评论成功',
            mask: true,
            icon: "none"
          })
          self.$data.discussCount = self.data.discussCount + 1;
          if (self.data.replyTip != "添加评论") {
            self.$data.discussions[self.customData.discussionIndex].fullSubDiscussions.unshift({
              fromUser: "",
              fromUserName: app.globalData.userInfo.nickName,
              toUserName: self.customData.toUserName,
              contents: self.data.commentInfo,
            })
            self.$data.$set(self.data.discussions, self.customData.discussionIndex, self.data.discussions[self.customData.discussionIndex])
            self.data.replyTip = "添加评论";
          } else {
            self.$data.discussions.unshift({
              contents: discussion.contents,
              discussDate: util.getNowDate(),
              dislikeCount: 0,
              likeCount: 0,
              fromUserName: app.globalData.userInfo.nickName,
              fromUserAvatar: app.globalData.userInfo.avatarUrl,
              fullSubDiscussions: [],
              uuid: success.headers.uuid
            });
          }
        })
        .catch((error) => {
          wx.hideLoading();
          wx.showToast({
            title: '网络错误，请重试',
            mask: true,
            icon: "none"
          })          
          self.data.replyTip = "添加评论";
        })      
    }
  },  
  // 回复评论
  discussToUser: function(e) {
    var self = this;            
    self.data.replyTip = "回复@" + e.currentTarget.dataset.toUserName;
    self.comment();
    self.customData.toUserName = e.currentTarget.dataset.toUserName;
    self.customData.toUser = e.currentTarget.dataset.toUser;
    self.customData.belongToDiscussion = e.currentTarget.dataset.belongToDiscussion;
    self.customData.discussionIndex = e.currentTarget.dataset.index;
  }
})