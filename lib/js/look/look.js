/**
 * 本程序构建的全局自定义方法
 */
import grace from "../grace/grace.js";
import api from "../../../api.js"

var app = getApp();

// 上传图片对象（POSt）
const postImageObject = (filePath, success, fail) => {
  filePath
  wx.uploadFile({
    url: api['imagesCloud'] + filePath.split('/')[3],
    filePath: filePath,
    name: 'file',
    header: {
      "Content-Type": "multipart/form-data"
    },
    success: function (res) {
      if (success !== null)
        success(res);
    },
    fail: function (res) {
      if (fail !== null)
        fail(res);
    }
  });
}
// 日期时间选择器
const withData = (param) => {
  return param < 10 ? '0' + param : '' + param;
}
const getLoopArray = (start, end) => {
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i));
  }
  return array;
}
const getMonthDay = (year, month) => {
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      array = getLoopArray(1, 31)
      break;
    case '04':
    case '06':
    case '09':
    case '11':
      array = getLoopArray(1, 30)
      break;
    case '02':
      array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array;
}
const getNewDateArry = () => {
  // 当前时间的处理
  var newDate = new Date();
  var year = withData(newDate.getFullYear()),
    mont = withData(newDate.getMonth() + 1),
    date = withData(newDate.getDate()),
    hour = withData(newDate.getHours()),
    minu = withData(newDate.getMinutes()),
    seco = withData(newDate.getSeconds());

  return [year, mont, date, hour, minu, seco];
}
const dateTimePicker = (startYear, endYear, date) => {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[], [], [], [], [], []];
  var start = startYear || 1978;
  var end = endYear || 2100;
  // 默认开始显示数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
  // 处理联动列表数据
  /*年月日 时分秒*/
  dateTimeArray[0] = getLoopArray(start, end);
  dateTimeArray[1] = getLoopArray(1, 12);
  dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);
  dateTimeArray[3] = getLoopArray(0, 23);
  dateTimeArray[4] = getLoopArray(0, 59);
  dateTimeArray[5] = getLoopArray(0, 59);

  dateTimeArray.forEach((current, index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}

const loginModal = (content) => {
  return new Promise(function (resolve, reject) {
    wx.showModal({
      content: content,
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {        
        if (res.confirm) {
          wx.showLoading({
            title: '登录中',
            mask: true
          })
          wx.login({
            success: function (res) {
              if (res.code) {
                // 使用code请求微服务获取token
                grace.http.get(api['token'], { code: res.code })
                  .then(function (success) {
                    console.log("get token: " + success.data);
                    // 添加请求拦截器以便之后的每一次请求都在请求头加上token
                    grace.http.interceptors.request.use((request) => {
                      request.headers["token"] = success.data;
                    })
                    wx.getUserInfo({
                      success: function (res) {                        
                        wx.hideLoading();
                        wx.showToast({
                          title: '登录成功',
                          icon: "none",
                          mask: true
                        })
                        app.globalData.userInfo = res.userInfo;
                        resolve(res.userInfo);
                      },
                      fail: function () {
                        wx.hideLoading();
                        wx.showToast({
                          title: '网络错误',
                          icon: "none",
                          mask: true
                        })
                        reject();
                      },                      
                    })
                  })
                  .catch((error) => {
                    wx.hideLoading();
                    wx.showToast({
                      title: '网络错误',
                      icon: "none",
                      mask: true
                    })
                    reject();                    
                  })
              }
            },
            fail: function () {                            
              wx.hideLoading();
              wx.showToast({
                title: '网络错误',
                icon: "none",
                mask: true
              })
              reject();
            }
          });
        }
      }
    });
  });
}

const login = () => {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {          
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
                app.globalData.userInfo = res.userInfo;
                if (wx.getStorageSync("token") == undefined ||
                  wx.getStorageSync("token") == "" || wx.getStorageSync("token") == null) {
                  grace.http.put(api['user'], {
                    name: res.userInfo.nickName,
                    avatar: res.userInfo.avatarUrl
                  }).then();
                }
                resolve(res.userInfo);
              },
              fail: function() {
                reject();
              }
            })
          })
          .catch((error) => {
            reject();
          })
        }
      }
    });
  });
}

module.exports = {
  postImageObject: postImageObject,
  dateTimePicker: dateTimePicker,
  getMonthDay: getMonthDay,
  loginModal: loginModal,
  login: login,
}