// 远程服务器地址
const remoteIp = "http://localhost:8080"

// 微服务
const service = {
  api: remoteIp,
  cloud: remoteIp + '/cloud', // 云对象存储微服务
  user: remoteIp + '/user',   // 用户微服务
  activity: remoteIp + '/activity', // 主题活动微服务
  audit: remoteIp + "/audit", // 审核微服务
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
const parentTopic = service['activity'] + "/api/parent-topic";
const parentTopics = service['activity'] + "/api/parent-topic/s";
const activity = service['activity'] + "/api/activity";
const fullActivities = service['api'] + "/api/full-activity/s";
const userFullActivities = service['api'] + "/api/user/full-activity/s";
const discussion = service['user'] + "/api/discussion";
const fullDiscussion = service['api'] + "/api/full-discussion";
const fullDiscussions = service['api'] + "/api/full-discussion/s";
const like = service['user'] + '/api/activity-like';
const activityFocus = service['user'] + '/api/activity-focus';
const join = service['user'] + '/api/join';
const topicFocus = service['user'] + '/api/topic-focus';

const fullTopics = service['api'] + "/api/full-topic/s"
const userFullTopics = service['api'] + "/api/user/full-topic/s";

const hotTopics = service['activity'] + "/api/topic/s/hot"

const administrator = service['user'] + '/api/administrator';

const topicWithAudit = service['api'] + '/api/topic-with-audit';
const activityWithAudit = service['api'] + '/api/activity-with-audit';

module.exports = {
  activityWithAudit: activityWithAudit,
  topicWithAudit: topicWithAudit,
  administrator: administrator,
  userFullTopics: userFullTopics,
  userFullActivities: userFullActivities,
  hotTopics: hotTopics,
  fullTopics: fullTopics,
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
  fullActivities: fullActivities,
  discussion: discussion,
  fullDiscussion: fullDiscussion,
  fullDiscussions: fullDiscussions,
  like: like,
  activityFocus: activityFocus,
  join: join,
  topicFocus: topicFocus,
}