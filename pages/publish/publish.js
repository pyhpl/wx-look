Page({
  customData: {
    activity: '',
    topic: ''
  },
  // ********************************************* 自定义方法 ********************************************* //
  // 获取活动输入值
  onActivityInput: function (e) {
    this.customData.activity = e.detail.value;
  },
  // 获取主题输入值
  onTopicInput: function (e) {
    this.customData.topic = e.detail.value;
  },
  // 搜索活动
  toActivitySearch: function() {
    var args = {
      type: 0,
      content: this.customData.activity
    }
    wx.navigateTo({
      url: '../search/search?args=' + JSON.stringify(args),
    })
  },
  // 搜索主题
  toTopicSearch: function() {
    var args = {
      type: 1,
      content: this.customData.activity
    }
    debugger;
    wx.navigateTo({
      url: '../search/search?args=' + JSON.stringify(args),
    })
  }
})