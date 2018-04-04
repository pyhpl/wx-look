import grace from "../../../../lib/js/grace/grace.js";
import util from "../../../../utils/util.js";

grace.page({
  data: {
    // 父主题相关数据
    parentTopics: [
      "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏",
      "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏", "游戏"
    ],
    onParentTopicIndex: 0,
    // 子主题相关数据
    topics: [
      [
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
        {
          pictureUrl: 'https://images-1252933270.cos.ap-guangzhou.myqcloud.com/zuozhu.jpg',
          title: '游戏ff人生',
          description: '这是一个个过过过过过过过过过过过过过过过过过过过过灌灌灌灌灌过斤斤计较军军'
        },
      ]
    ]
  },
  // **************************** 生命周期方法 **************************** //
  onLoad() {

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