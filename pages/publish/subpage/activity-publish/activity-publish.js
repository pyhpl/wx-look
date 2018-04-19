import grace from "../../../../lib/js/grace/grace.js";
import look from "../../../../lib/js/look/look.js";
import api from "../../../../api.js";

grace.page({
  data: {
    topic: {
      name: "选择主题"
    },
    topicHoverClass: 'activity-topic-hover',
    letterCountTip: "",
    submited: false,
    // 时间相关数据
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050,
    // 联系方式相关数据
    contactWayIndex: 0,
    contactWays: ["QQ", "微信"],
    // 图片相关数据    
    pictureUrls: [],
    // 微信联系群二维码图片
    QRContactUrl: ""
  },
  // 自定义数据
  customData: {
    title: "",
    detail: "",
    school: "",
    place: "",
    peopleCount: -1,
    contactPresent: "",
    qqContact: "",
    canChooseTopic: true,
    detailLength: 0,
    pictureCount: 0,
  },
  // ****************************** 生命周期方法 ********************************* //
  onLoad(data) {
    var that = this;       
    if (data[0].topic != undefined) {
      this.$data.topic = JSON.parse(data[0].topic);
      this.$data.topicHoverClass = 'none';
      this.customData.canChooseTopic = false;
    }
    // ********* 初始化时间picker相关数据 ********* //
    var obj = look.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj.dateTimeArray.pop();
    var lastTime = obj.dateTime.pop();
    // 初始化时间数据
    this.$data.dateTime = obj.dateTime;
    this.$data.dateTimeArray = obj.dateTimeArray;
    // ********* 初始化图片相关数据 ********* //
    this.$data.pictureCountTip = "(0/9)";
  },
  // ****************************** 自定义方法 ********************************* //
  // 输入活动名称的事件方法
  onActivityTitleInput: function(e) {
    this.customData.title = e.detail.value;
  },
  // 输入活动详情的事件方法
  onActivityDetailInput: function(e) {
    this.customData.detail = e.detail.value;
    this.customData.detailLength = e.detail.value.length;
    if (this.customData.detailLength == 0) {
      this.$data.letterCountTip = ""
    } else {
      this.$data.letterCountTip = "(" + this.customData.detailLength + "/400)";
    }   
  },
  // 输入学校的事件方法
  onSchoolInput: function(e) {
    this.customData.school = e.detail.value;
  },
  // 输入地点的事件方法
  onPlaceInput: function(e) {
    this.customData.place = e.detail.value;
  },
  // 输入人数的事件方法
  onPeopleCountInput: function(e) {
    this.customData.peopleCount = e.detail.value;
  },
  // 输入qq交流群的事件方法
  onContactPresentInput: function(e) {
    this.customData.contactPresent = e.detail.value;
  },
  // 日期改变事件方法
  changeDateTime: function(e) {
    this.$dateTime = e.detail.value;
  },
  // 时间改变事件方法
  changeDateTimeColumn: function(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = look.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.$data.dateTimeArray = dateArr;
    this.$data.dateTime = arr;
  },
  // 联系群改变事件方法
  bindContactWayChange: function(e) {
    this.$data.contactWayIndex = e.detail.value;
  },
  // 预览图片
  imagePreview: function(e) {
    var src = e.currentTarget.dataset.src; //获取data-src
    var imgList = e.currentTarget.dataset.list; //获取data-list
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  // 删除图片
  deleteImage: function(e) {
    var self = this;
    wx.showModal({
      content: '删除图片？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          self.$data.pictureUrls.splice(e.currentTarget.dataset.index, 1);
        }
      }
    });
  },
  // 选择图片
  chooseImage: function (e) {
    if (this.data.pictureUrls.length == 9) {
      return;
    }
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.pictureUrls.length,
      sizeType: ['original'],
      success: function (res) {
        that.$data.pictureUrls = that.$data.pictureUrls.concat(res.tempFilePaths);
      }
    })
  },
  // 选择微信群二维码图片
  chooseQRImage: function() {
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
        self.$data.QRContactUrl = res.tempFilePaths[0];
      }
    })
  },  
  // navigate to topic choose
  toChooseTopic: function() {
    if (this.customData.canChooseTopic) {
      wx.navigateTo({
        url: '../../../topic/subpage/topic-choose/topic-choose',
      });
    }
  },
  // 创建活动
  createActivity: function() {
    var self = this;
    var title = this._validateForm();
    if (title != "") {
      wx.showToast({
        title: title,
        icon: "none",
        mask: true,
      })
    } else {
      wx.showLoading({
        title: '发布中',
        mask: true
      })
      var activityImages = [];
      self.data.pictureUrls.forEach((item, index) => {
        look.postImageObject(item, (res) => {
          activityImages.push({image: res.data});
          if (activityImages.length == self.data.pictureUrls.length) {
            self._createActivity(activityImages);
          }          
        }, (error) => {
          wx.hideLoading();
          wx.showToast({
            title: '上传失败，请重试',
            mask: true,
            icon: "none"
          })
        });
      });      
    }
  },
  _createActivity: function (activityImages) {
    var self = this;
    // 构造activity实体
    var activity = {
      title: self.customData.title,
      topicUuid: self.data.topic['uuid'],
      detail: self.customData.detail,
      school: self.customData.school,
      place: self.customData.place,
      deadline: self._formatDate(),
      limitUserCount: self.customData.peopleCount,
      contactType: self.data.contactWayIndex,
      activityImages: activityImages,
      likeCount: 0,
    };
    if (self.data.contactWayIndex == 1 && self.data.QRContactUrl != "") { // 微信联系群
      look.postImageObject(self.data.QRContactUrl, (res) => { // 上传图片到云服务器
        activity['contactRepresent'] = res.data;
        self.$http.post(api['activity'], activity)
          .then((success) => {
            wx.hideLoading();
            wx.showToast({
              title: '等待审核',
              mask: true,
              icon: "success"
            })
          })
          .catch((error) => {
            wx.hideLoading();
            wx.showToast({
              title: '发布失败，请重试',
              mask: true,
              icon: "none"
            })
          })
      })
    } else {
      activity['contactRepresent'] = self.customData.contactPresent;
      self.$http.post(api['activity'], activity)
        .then((success) => {
          wx.hideLoading();
          wx.showToast({
            title: '等待审核',
            mask: true,
            icon: "success"
          })
        })
        .catch((error) => {
          wx.hideLoading();
          wx.showToast({
            title: '上传失败，请重试',
            mask: true,
            icon: "none"
          })
        })
    }
  },
  _formatDate: function() {
    var self = this;
    return "20" + self.data.dateTime[0] + "-" + (self.data.dateTime[1] + 1) + "-" + (self.data.dateTime[2] + 1) + " " + self.data.dateTime[3] + ":" + self.data.dateTime[3];
  },
  _validateForm: function() {
    var self = this;    
    var title = "";
    if (self.customData.title == "") {
      title = "请输入活动名称";
      return title;
    }
    if (self.data.topic['name'] == "选择主题") {
      title = "请选择主题";
      return title;
    }
    if (self.customData.detail == "") {
      title = "请输入活动详情";
      return title;
    }
    if (self.customData.school == "") {
      title = "请输入学校";
      return title;
    }
    if (self.customData.place == "") {
      title = "请输入活动地点";
      return title;
    }
    if (self.customData.peopleCount == -1) {
      title = "请输入最大参与人数";
      return title;
    }
    return title;
  },
  // ****************************** grace方法 ********************************* //
  $onBackData: function(data) {   
    this.$data.topic = data.topic;
  }
})