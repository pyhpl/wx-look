// 远程服务器地址
const remoteIp = "http://localhost:8080"

// 微服务
const service = {
  api: remoteIp,
  cloud: remoteIp + '/cloud', // 云对象存储微服务
  user: remoteIp + '/user',   // 用户微服务
  activity: remoteIp + '/activity', // 主题活动微服务
}

// api
const imagesCloud = service['cloud'] + "/api/cloud/images/";
const image = service['image'] + "/api/image";
const tag = service['user'] + '/api/tag'; 
const tags = service['user'] + '/api/tag/s';
const token = service['user'] + "/api/token";
const user = service['user'] + "/api/user";
const topic = service['activity'] + "/api/topic"
const topics = service['activity'] + "/api/topic/s"
const parentTopic = service['activity'] + "/api/parentTopic";
const parentTopics = service['activity'] + "/api/parentTopic/s";
const activity = service['activity'] + "/api/activity";
const fullActivities = service['api'] + "/api/full-activity/s";

module.exports = {
  tag: tag,
  tags: tags,
  imagesCloud: imagesCloud,
  token: token,
  user: user,
  topic: topic,
  topics: topics,
  parentTopic: parentTopic,
  parentTopics: parentTopics,
  activity: activity,
  fullActivity: fullActivity,
}