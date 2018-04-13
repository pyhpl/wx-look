import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";
import api from "../../../../api.js";

grace.page({
  data: {
    // 父主题相关数据
    parentTopics: [],
    onParentTopicIndex: 0,
    // 子主题相关数据
    topics: []
  },
  // **************************** 生命周期方法 **************************** //
  onLoad() {
    var self = this;    
    self.$http.get(api['parentTopics'])
      .then(function(success) {
        self.$data.parentTopics = success.data;
        self.$http.get(api['topics'] + "?parentTopicUuid=" + self.data.parentTopics[self.data.onParentTopicIndex]['uuid'])
          .then(function(success) {
            self.$data.topics.push(success.data);
          });
      });
  },
  // **************************** 自定义方法 **************************** //
  // 父标签点击事件
  onTaped: function(e) {
    this.$data.onParentTopicIndex = e.currentTarget.dataset.index;
  },
  // 标签选择事件
  onTopicChoosed: function(e) {
    this.$goBack({ topic: e.currentTarget.dataset.topic });
  }
})