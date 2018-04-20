import grace from "../../../../lib/js/grace/grace.js"
import api from "../../../../api.js";
import util from "../../../../utils/util.js";

grace.component({
  properties: {
    topic: {
      type: null,
      value: {}
    }
  },
  data: {},
  ready: function() {
    this.data = this.properties;
  },
  methods: {
    // 打开主题详细信息
    toTopic: function () {
      var self = this;
      wx.navigateTo({
        url: '../activity/subpage/topic-activity/topic-activity?topic=' + JSON.stringify(
          self.data.topic
        ),
      })
    },
    // 关注
    focus: function (e) {
      var self = this;
      if (self.data.topic.focused == false) {
        self.$http.post(api['topicFocus'], {
          topicUuid: e.currentTarget.dataset.topicUuid
        })
          .then((success) => {
            self.data.topic.focused = true;
            self.data.topic.topicFocusUuid = success.headers.uuid;
            self.setData({
              topic: self.data.topic
            })
          })
      } else if (self.data.topic.focused == true) {
        self.$http.delete(api['topicFocus'] + util.queryString({
          uuid: self.data.topic.topicFocusUuid
        }))
          .then((success) => {
            self.data.topic.focused = false;
            self.setData({
              topic: self.data.topic
            })
          })
      }
    },
  }
});