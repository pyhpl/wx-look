import grace from "../../lib/js/grace/grace.js";
var Zan = require('../../lib/ui/zanui/index');

grace.page(Object.assign({}, Zan.TopTips, {
  data: {
    zanTopTips: {
      show: false,
      content: "",
      options: {
        duration: 500
      },
      timer: 0
    },
    tags: []
  },
  onLoad: function (query) {
    this.$data.tags = JSON.parse(query[0].tags);
  },
  customData: {
    tag: ''
  },
  onTagInput: function (e) {
    this.customData.tag = e.detail.value;
  },
  addTag: function () {
    if (this.data.tags.indexOf(this.customData.tag) == -1) {
      this.$data.tags.push(this.customData.tag);      
      this.$bus.$emit("tagChange", this.data.tags);
    } else {
      this.showZanTopTips('标签已存在', 700);
    }
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