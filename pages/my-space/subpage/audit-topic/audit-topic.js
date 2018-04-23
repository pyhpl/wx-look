import grace from "../../../../lib/js/grace/grace.js"
import api from "../../../../api.js"
import util from "../../../../utils/util.js";

var app = getApp();

grace.page({
  data: {
    topics: [],
    audited: [],
  },
  // ********************** 页面生命周期方法 ******************************** //
  onLoad: function () {
    wx.showNavigationBarLoading();
    var self = this;    
    self.$http.get(api['topicWithAuditUserAudited'] + util.queryString({
      state: "waitingAudited",
      pageInfoJsonStr: util.pageInfoJsonStr(1, 10)
    }))
      .then((success) => {
        wx.hideNavigationBarLoading();
        self.$data.topics = success.data;
        for (var i = 0; i < success.data.length; i++) {
          self.data.audited[i] = false;
        }
      })
      .catch((error) => {
        wx.hideNavigationBarLoading();
        wx.showToast({
          title: '网络错误',
          icon: "none"          
        })
      })
  },
  onUnload: function () {
    var self = this;
    self.data.audited.forEach((value, index) => {
      if (value == false) {
        self.$http.put(api['topicAudit'], {
          uuid: self.data.topics[index].auditUuid,
          state: 0,
        }).then();
      }
    })
  },
  // ********************** 自定义方法 ************************************* //  
  toAuditTopicDetail: function (e) {
    if (this.data.audited[e.currentTarget.dataset.index] == false) {
      wx.navigateTo({
        url: './subpage/audit-topic-detail/audit-topic-detail' + util.queryString({
          topic: JSON.stringify(e.currentTarget.dataset.topic)
        }),
      })
    } else {
      wx.showToast({
        title: '已审核',
        icon: 'none',
        mask: true
      })
    }
  },
  // ****************************** grace方法 ********************************* //
  $onBackData: function (data) {
    var self = this;
    if (data.topicUuid != undefined && data.topicUuid != null) {
      self.data.topics.forEach((topic, index) => {
        if (topic.topicUuid == data.topicUuid) {
          self.data.audited[index] = true;
          self.$data.audited = self.data.audited;
        }
      })
    }
  }
})