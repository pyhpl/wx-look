import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";
import api from "../../../../api.js";

grace.page({
  data: {
    // 父主题相关数据
    parentTopics: [],
    onParentTopicIndex: 1,
    // 子主题相关数据
    topics: [],
    searchShow: false,
  },
  customData: {
    searchText: ""
  },
  // **************************** 生命周期方法 **************************** //
  onLoad() {
    wx.setNavigationBarTitle({
      title: '选择主题',
    })
    var self = this;    
    self.$http.get(api['parentTopics'])
      .then(function(success) {
        success.data.unshift({
          uuid: "",
          name: "搜索"
        });
        self.$data.parentTopics = success.data;
        self._setChildTopics(self.data.onParentTopicIndex);
      });
  },
  // **************************** 自定义方法 **************************** //
  // 获取子主题
  _setChildTopics: function (parentTopicIndex) {
    var self = this;
    self.$http.get(api['topics'] + util.queryString({
      parentTopicUuid: self.data.parentTopics[parentTopicIndex]['uuid']
    }))
      .then(function (success) {
        self.data.topics[parentTopicIndex] = success.data;
        self.$data.topics = self.data.topics;
      });
  },
  // 父标签点击事件
  onTaped: function(e) {    
    this.$data.onParentTopicIndex = e.currentTarget.dataset.index;
    if (e.currentTarget.dataset.index != 0) {
      this._setChildTopics(e.currentTarget.dataset.index);
    }
  },
  // 标签选择事件
  onTopicChoosed: function(e) {
    this.$goBack({ topic: e.currentTarget.dataset.topic });
  },
  // 取消选择标签
  cancelChoose: function() {
    this.$goBack({});
  },
  // 查看主题
  toTopic: function(e) {
    wx.navigateTo({
      url: '../../../activity/subpage/topic-activity/topic-activity' + util.queryString({
        topic: JSON.stringify(e.currentTarget.dataset.topic)
      }),
    })
  },
  onSearchInput: function(e) {
    this.customData.searchText = e.detail.value;
  },
  // 搜索
  toSearch: function(e) {    
    var self = this;
    wx.showLoading({
      title: '搜索中。。。',
      mask: true
    })
    self.$http.get(api['topics'] + util.queryString({
      key: self.customData.searchText
    }))
      .then((success) => {
        wx.hideLoading();        
        self.$data.searchShow = true;
        self.$data.onParentTopicIndex = 0;
        self.data.topics[self.data.onParentTopicIndex] = success.data;
        self.$data.topics = self.data.topics;
      })
      .catch((error) => {
        wx.showToast({
          title: '网络错误',
          mask: true,
          icon: "none"
        })
      })
  }
})