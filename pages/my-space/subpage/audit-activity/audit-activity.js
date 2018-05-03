import grace from "../../../../lib/js/grace/grace.js"
import api from "../../../../api.js"
import util from "../../../../utils/util.js";

var app = getApp();

grace.page({
  data: {    
    activities: [],
    audited: [],
  },
  customData: {
    activityWithAudit: [],
  },
  // ********************** 页面生命周期方法 ******************************** //
  onLoad: function () {
    wx.showNavigationBarLoading();
    var self = this;
    self.$http.get(api['activityWithAuditUserAudited'] + util.queryString({
      state: "waitingAudited",
      pageInfoJsonStr: util.pageInfoJsonStr(1, 10)
    }))
      .then((success) => {
        wx.hideNavigationBarLoading();
        self.customData.activityWithAudit = success.data;
        self.$data.activities = success.data.map((value) => {
          return value.fullActivity;
        });
        for (var i = 0; i < self.data.activities.length; i++) {
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
        self.$http.put(api['activityAudit'], {
          uuid: self.customData.activityWithAudit[index].auditUuid,
          state: 0,
        }).then();
      }
    })
  },
  // ********************** 自定义方法 ************************************* //  
  toAuditActivityDetail: function (e) {
    var self = this;
    if (this.data.audited[e.currentTarget.dataset.index] == false) {
      wx.navigateTo({
        url: './subpage/audit-activity-detail/audit-activity-detail' + util.queryString({
          uuid: e.currentTarget.dataset.uuid,
          auditUuid: self.customData.activityWithAudit[e.currentTarget.dataset.index].auditUuid
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
    if (data.activityUuid != undefined && data.activityUuid != null) {
      self.data.activities.forEach((activity, index) => {
        if (activity.uuid == data.activityUuid) {
          self.data.audited[index] = true;
          self.$data.audited = self.data.audited;
        }
      })
    }
  }
})