<template>
  <div class="tieba-detail">
    <!-- 贴吧信息区域 -->
    <section class="tieba-header">
      <div class="container">
        <div class="tieba-info">
          <img :src="tiebaInfo.avatar" alt="贴吧头像" class="tieba-avatar" />
          <div class="tieba-meta">
            <h1>{{ tiebaInfo.name }}</h1>
            <p>{{ tiebaInfo.description }}</p>
            <div class="tieba-stats">
              <span>{{ tiebaInfo.memberCount }} 成员</span>
              <span>{{ tiebaInfo.postCount }} 帖子</span>
            </div>
            <button class="join-btn">加入贴吧</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 操作按钮栏 -->
    <section class="action-bar">
      <div class="container">
        <div class="left-actions">
          <button class="post-btn">发布帖子</button>
        </div>
        <div class="right-actions">
          <div class="search-box">
            <input type="text" placeholder="搜索本吧" />
            <button>搜索</button>
          </div>
          <select class="sort-select">
            <option value="latest">最新发布</option>
            <option value="hot">热门回复</option>
            <option value="essence">精华帖</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 帖子列表 -->
    <section class="post-section">
      <div class="container">
        <table class="post-table">
          <thead>
            <tr>
              <th class="title-col">帖子标题</th>
              <th class="author-col">作者</th>
              <th class="reply-col">回复数</th>
              <th class="time-col">最后回复时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id" class="post-row">
              <td class="title-col">
                <a href="#" class="post-title">
                  <span v-if="post.isTop" class="tag top-tag">置顶</span>
                  <span v-if="post.isEssence" class="tag essence-tag">精华</span>
                  {{ post.title }}
                </a>
              </td>
              <td class="author-col">{{ post.authorName }}</td>
              <td class="reply-col">{{ post.replyCount }}</td>
              <td class="time-col">{{ post.lastReplyTime }}</td>
            </tr>
          </tbody>
        </table>

        <!-- 分页 -->
        <div class="pagination">
          <button>&lt; 上一页</button>
          <button class="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>10</button>
          <button>下一页 &gt;</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 模拟数据
const tiebaInfo = ref({
  id: 1,
  name: '科技吧',
  description: '讨论最新科技动态，分享科技产品使用体验',
  avatar: 'https://picsum.photos/id/20/100/100',
  memberCount: 100000,
  postCount: 50000
})

const posts = ref([
  {
    id: 1,
    title: '2024年最新科技趋势预测',
    authorName: '科技达人',
    replyCount: 567,
    lastReplyTime: '2小时前',
    isTop: true,
    isEssence: true
  },
  {
    id: 2,
    title: '人工智能将如何改变我们的生活',
    authorName: 'AI研究者',
    replyCount: 342,
    lastReplyTime: '3小时前',
    isTop: true,
    isEssence: false
  },
  {
    id: 3,
    title: '推荐几款性价比高的笔记本电脑',
    authorName: '数码爱好者',
    replyCount: 128,
    lastReplyTime: '5小时前',
    isTop: false,
    isEssence: false
  },
  {
    id: 4,
    title: '5G网络使用体验分享',
    authorName: '网络工程师',
    replyCount: 89,
    lastReplyTime: '昨天',
    isTop: false,
    isEssence: false
  },
  {
    id: 5,
    title: '编程入门应该学习什么语言',
    authorName: '程序员小张',
    replyCount: 234,
    lastReplyTime: '2天前',
    isTop: false,
    isEssence: true
  }
])

onMounted(() => {
  // 这里可以添加数据加载逻辑
})
</script>

<style scoped>
.tieba-detail {
  width: 100%;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.tieba-header {
  background-color: #fff;
  padding: 30px 0;
  border-bottom: 1px solid #e0e0e0;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.tieba-info {
  display: flex;
  align-items: center;
}

.tieba-avatar {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 20px;
}

.tieba-meta h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #333;
}

.tieba-meta p {
  color: #666;
  margin-bottom: 15px;
  font-size: 14px;
}

.tieba-stats span {
  margin-right: 20px;
  color: #999;
  font-size: 14px;
}

.join-btn {
  margin-top: 10px;
  padding: 8px 24px;
  background-color: #38f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.action-bar {
  background-color: #fff;
  margin-top: 10px;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
}

.action-bar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-btn {
  padding: 10px 24px;
  background-color: #38f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-box {
  display: flex;
}

.search-box input {
  width: 200px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.search-box button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.post-section {
  background-color: #fff;
  margin-top: 10px;
  padding: 20px 0;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
}

.post-table thead {
  background-color: #f5f5f5;
}

.post-table th,
.post-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.title-col {
  width: 50%;
}

.author-col {
  width: 20%;
}

.reply-col {
  width: 10%;
  text-align: center;
}

.time-col {
  width: 20%;
  color: #999;
}

.post-title {
  color: #333;
  text-decoration: none;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-title:hover {
  color: #38f;
}

.tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 5px;
}

.top-tag {
  background-color: #ff4d4f;
  color: white;
}

.essence-tag {
  background-color: #ffa940;
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:hover {
  border-color: #38f;
  color: #38f;
}

.pagination button.active {
  background-color: #38f;
  color: white;
  border-color: #38f;
}
</style>