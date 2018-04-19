import grace from "../../../../lib/js/grace/grace.js"
import api from "../../../../api.js"
import util from "../../../../utils/util.js";

var app = getApp();

grace.page({
  data: {    
    topics: []
  },
  customData: {
    feature: "",
  },
  // ******************************* 生命周期方法 ******************************* //
  onShow: function() {
    var self = this;
    var e = {
      feature: self.customData.feature
    };
    this.onLoad(e);
  },
  onLoad: function(e) {    
    var self = this;
    self.customData.feature = e[0].feature;
    var title = "";
    if (e[0].feature == "focus") {
      title = '我关注的主题';
      
    } else if (e[0].feature == "publish") {
      title = "我发布的主题";
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    wx.showNavigationBarLoading();    
    // 获取主题
    self.$http.get(api['userFullTopics'] + util.queryString({
      feature: e[0].feature,
      pageInfoJsonStr: util.pageInfoJsonStr(1, 10),
    }))
      .then((topics) => {
        self.$data.topics = topics.data;
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
  // ******************************* 自定义方法 ******************************* //
  // 关注
  focus: function (e) {
    var self = this;
    if (self.data.topics[e.currentTarget.dataset.index].focused == false) {
      self.$http.post(api['topicFocus'], {
        topicUuid: e.currentTarget.dataset.topicUuid
      })
        .then((success) => {
          self.data.topics[e.currentTarget.dataset.index].focused = true;
          self.data.topics[e.currentTarget.dataset.index].topicFocusUuid = success.headers.uuid;
          self.setData({
            topics: self.data.topics
          })
        })
    } else if (self.data.topics[e.currentTarget.dataset.index].focused == true) {
      debugger;
      self.$http.delete(api['topicFocus'] + util.queryString({
        uuid: self.data.topics[e.currentTarget.dataset.index].topicFocusUuid
      }))
        .then((success) => {
          self.data.topics[e.currentTarget.dataset.index].focused = false;
          self.setData({
            topics: self.data.topics
          })
        })
    }
  },
  // navigate to topic
  toTopic: function(e) {
    wx.navigateTo({
      url: '../../../activity/subpage/topic-activity/topic-activity?topic=' + JSON.stringify(
        e.currentTarget.dataset.topic
      ),
    })    
  }
})