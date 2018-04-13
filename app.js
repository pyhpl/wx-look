//app.js

import grace from "./lib/js/grace/grace.js";
import api from "./api.js";

App({
  onLaunch: function () {
  },
  init: function() {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          if (res.code) {
            that.globalData.userInfo = "";
            // 使用code请求微服务获取token
            grace.http.get(api['token'], { code: res.code }).then(function (success) {
              var token = success.data;
              // 设置会话token
              wx.setStorageSync('token', token);
              console.log("get token: " + token);
              // 添加请求拦截器以便之后的每一次请求都在请求头加上token
              grace.http.interceptors.request.use((request) => {
                request.headers["token"] = token;
              })
              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = res.userInfo;
                  if (wx.getStorageSync("token") == undefined ||
                    wx.getStorageSync("token") == "" || wx.getStorageSync("token") == null) {
                    grace.http.put(api['user'], {
                      name: res.userInfo.nickName,
                      avatar: res.userInfo.avatarUrl
                    }).then();
                  }
                  resolve();
                }
              })
            })
          }
        }
      });
    });
  },
  globalData: {
    userInfo: null,
  }
})