var app = getApp();

const postImageObject = (filePath, success, fail) => {
  filePath
  wx.uploadFile({
    url: app.globalData.service['cloud'] + '/api/cloud/images/' + filePath.split('/')[3],
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

module.exports = {
  postImageObject: postImageObject
}