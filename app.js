//app.js

import grace from "./lib/js/grace/grace.js";
import api from "./api.js";
import look from "./lib/js/grace/grace.js";

App({
  onLaunch: function () {
  },
  init: function() {
    var that = this;
    return new Promise(function (resolve, reject) {
      look.login(true, resolve, reject)
    });
  },
  globalData: {
    userInfo: null,
  }
})