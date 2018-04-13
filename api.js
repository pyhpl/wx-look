// 远程服务器地址
const remoteIp = "http://localhost"

// 微服务
const service = {
  cloud: remoteIp + ':8899', // 云对象存储微服务
  user: remoteIp + ':8888',   // 用户微服务
  activity: remoteIp + ':8777', // 主题活动微服务 
}

// api
const tag = service['user'] + '/api/tag'; 
const tags = service['user'] + '/api/tag/s';
const images = service['cloud'] + "/api/cloud/images/";
const token = service['user'] + "/api/token";
const user = service['user'] + "/api/user";
const topic = service['activity'] + "/api/topic"

module.exports = {
  tag: tag,
  tags: tags,
  images: images,
  token: token,
  user: user,
  topic: topic
}