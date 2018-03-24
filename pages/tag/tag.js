import grace from "../../lib/js/grace/grace.js";
var Zan = require('../../lib/ui/zanui/index');

grace.page(Object.assign({}, Zan.TopTips, {
  data: {
    topTips: "aaaaa",
    tags: [
      "火影忍者",
      "火影忍者",
      "火影忍者",
      "火影忍者",
      "火影忍者火影忍者",
      "火影忍者",
      "火影忍者",
      "火影忍者火影忍者",
    ]
  },
  customData: {
    tag: ''
  },
  onTagInput: function (e) {
    this.customData.tag = e.detail.value;
  },
  addTag: function () {
    // if (this.data.tags.indexOf(this.customData.tag) == -1) {
      this.$data.tags.push(this.customData.tag);
    // } else {
      // this.showZanTopTips('toptips的内容', 500);
    // }
  },
  tagDeleteConfirm: function (e) {
    var self = this;
    wx.showModal({
      content: '删除标签"' + e.currentTarget.dataset.tag + '"？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          self.$data.tags.splice(e.currentTarget.dataset.index, 1);
        }
      }
    });
  }
}))