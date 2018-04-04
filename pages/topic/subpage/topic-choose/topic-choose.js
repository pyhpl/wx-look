import grace from "../../../../lib/js/grace/grace.js";

grace.page({
  data: {
    // 父主题相关数据
    parentTopics: [
      "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏",
      "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏",
      "最后"
    ],
    onParentTopicIndex: 0,
    // 子主题相关数据
    topics: [
      {
        pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
        title: '游戏人生',
        description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
      }
    ]
  },
  // **************************** 自定义方法
  onTaped: function(e) {
    this.$data.onParentTopicIndex = e.currentTarget.dataset.index;
  }
})