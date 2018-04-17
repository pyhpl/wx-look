const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const truncate = (str, n) => {
  return str.substr(0, n);
}

const getNowDate = () => {
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return date.getFullYear() + "/" + month + "/" + day
}

const queryString = (obj) => {
  var queryStr = "?"
  Object.keys(obj).forEach((value, index) => {
    queryStr = queryStr + value + '=' + obj[value] + '&'
  })
  return queryStr
}

const pageInfoJsonStr = (pageNum, pageSize, orderBy) => {
  var pageInfo = {}
  if (pageNum != undefined && pageNum != null) {
    pageInfo['pageNum'] = pageNum
  }
  if (pageSize != undefined && pageSize != null) {
    pageInfo['pageSize'] = pageSize
  }
  if (orderBy != undefined && orderBy != null) {
    pageInfo['orderBy'] = orderBy
  }
  return encodeURIComponent(JSON.stringify(pageInfo))
}

module.exports = {
  formatTime: formatTime,
  truncate: truncate,
  getNowDate: getNowDate,
  pageInfoJsonStr: pageInfoJsonStr,
  queryString: queryString
}
