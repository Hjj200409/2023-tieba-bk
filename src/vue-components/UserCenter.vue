<template>
  <div class="user-center">
    <!-- 用户信息区域 -->
    <div class="user-info-section">
      <div class="user-avatar">
        <img src="https://via.placeholder.com/100" alt="用户头像" />
      </div>
      <div class="user-details">
        <h2>{{ user.nickname }}</h2>
        <p class="user-id">ID: {{ user.userId }}</p>
        <div class="user-stats">
          <div class="stat-item">
            <span class="stat-number">{{ user.postCount }}</span>
            <span class="stat-label">发帖数</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ user.followCount }}</span>
            <span class="stat-label">关注数</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ user.fansCount }}</span>
            <span class="stat-label">粉丝数</span>
          </div>
        </div>
        <button class="edit-profile-btn">编辑资料</button>
      </div>
    </div>

    <!-- 导航选项卡 -->
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        :class="['tab-btn', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="content-section">
      <!-- 我的帖子 -->
      <div v-if="activeTab === 'posts'" class="posts-content">
        <div class="filter-bar">
          <div class="filter-options">
            <button 
              v-for="filter in postFilters" 
              :key="filter.key"
              :class="['filter-btn', { active: activeFilter === filter.key }]"
              @click="activeFilter = filter.key"
            >
              {{ filter.name }}
            </button>
          </div>
          <div class="sort-options">
            <label>排序: </label>
            <select v-model="sortBy">
              <option value="latest">最新发布</option>
              <option value="hottest">最热回复</option>
            </select>
          </div>
        </div>

        <div class="posts-list">
          <div 
            v-for="post in userPosts" 
            :key="post.id"
            class="post-item"
          >
            <div class="post-header">
              <h3 class="post-title">{{ post.title }}</h3>
              <span class="post-tieba">{{ post.tiebaName }}</span>
            </div>
            <p class="post-excerpt">{{ post.content.substring(0, 100) }}...</p>
            <div class="post-footer">
              <div class="post-stats">
                <span class="view-count">{{ post.viewCount }} 浏览</span>
                <span class="comment-count">{{ post.commentCount }} 回复</span>
                <span class="post-time">{{ formatTime(post.createdAt) }}</span>
              </div>
              <div class="post-actions">
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <button :disabled="currentPage === 1" @click="currentPage--">上一页</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
        </div>
      </div>

      <!-- 我的收藏 -->
      <div v-else-if="activeTab === 'collections'" class="collections-content">
        <div class="empty-state" v-if="userCollections.length === 0">
          <p>您还没有收藏任何帖子</p>
        </div>
        <div v-else class="collections-list">
          <div 
            v-for="collection in userCollections" 
            :key="collection.id"
            class="collection-item"
          >
            <div class="collection-header">
              <h3 class="collection-title">{{ collection.postTitle }}</h3>
              <span class="collection-tieba">{{ collection.tiebaName }}</span>
            </div>
            <p class="collection-excerpt">{{ collection.postExcerpt }}...</p>
            <div class="collection-footer">
              <span class="collection-time">收藏于 {{ formatTime(collection.collectedAt) }}</span>
              <button class="remove-btn">取消收藏</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 我的关注 -->
      <div v-else-if="activeTab === 'follows'" class="follows-content">
        <div class="follows-tabs">
          <button 
            :class="['follow-tab', { active: followType === 'tiebas' }]"
            @click="followType = 'tiebas'"
          >
            关注的贴吧
          </button>
          <button 
            :class="['follow-tab', { active: followType === 'users' }]"
            @click="followType = 'users'"
          >
            关注的用户
          </button>
        </div>
        
        <div v-if="followType === 'tiebas'" class="tiebas-follows">
          <div class="tieba-grid">
            <div 
              v-for="tieba in followedTiebas" 
              :key="tieba.id"
              class="tieba-card"
            >
              <img :src="tieba.avatar" alt="贴吧头像" class="tieba-avatar" />
              <h4 class="tieba-name">{{ tieba.name }}</h4>
              <p class="tieba-desc">{{ tieba.desc }}</p>
              <div class="tieba-stats">
                <span>{{ tieba.memberCount }} 会员</span>
                <span>{{ tieba.postCount }} 帖子</span>
              </div>
              <button class="unfollow-btn">取消关注</button>
            </div>
          </div>
        </div>
        
        <div v-else-if="followType === 'users'" class="users-follows">
          <div class="user-grid">
            <div 
              v-for="user in followedUsers" 
              :key="user.id"
              class="user-card"
            >
              <img :src="user.avatar" alt="用户头像" class="user-small-avatar" />
              <div class="user-info">
                <h4 class="user-small-name">{{ user.nickname }}</h4>
                <p class="user-small-id">ID: {{ user.userId }}</p>
              </div>
              <button class="unfollow-btn">取消关注</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 用户信息
const user = ref({
  userId: '10086',
  nickname: '百度贴吧用户',
  postCount: 42,
  followCount: 128,
  fansCount: 96
})

// 选项卡
const tabs = ref([
  { key: 'posts', name: '我的帖子' },
  { key: 'collections', name: '我的收藏' },
  { key: 'follows', name: '我的关注' }
])

const activeTab = ref('posts')

// 帖子筛选
const postFilters = ref([
  { key: 'all', name: '全部' },
  { key: 'normal', name: '正常' },
  { key: 'hidden', name: '已隐藏' },
  { key: 'deleted', name: '已删除' }
])

const activeFilter = ref('all')
const sortBy = ref('latest')
const currentPage = ref(1)

// 模拟用户帖子数据
const userPosts = ref([
  {
    id: 1,
    title: '分享一个超实用的学习方法',
    content: '今天想和大家分享一个我最近发现的超实用学习方法，叫做费曼学习法。这种方法通过将复杂的概念用简单的话解释出来，帮助加深理解...',
    tiebaName: '学习吧',
    viewCount: 1280,
    commentCount: 89,
    createdAt: '2024-01-15T10:30:00'
  },
  {
    id: 2,
    title: '推荐几款超好用的编程工具',
    content: '作为一个程序员，我发现了几款能显著提高工作效率的工具。首先是VS Code，这款编辑器轻量级但功能强大...',
    tiebaName: '科技吧',
    viewCount: 2560,
    commentCount: 156,
    createdAt: '2024-01-10T14:20:00'
  },
  {
    id: 3,
    title: '周末去哪里玩比较好？',
    content: '马上周末了，想带家人出去走走，大家有什么好的推荐吗？最好是适合全家人的地方...',
    tiebaName: '生活吧',
    viewCount: 890,
    commentCount: 67,
    createdAt: '2024-01-08T09:15:00'
  }
])

// 模拟收藏数据
const userCollections = ref([
  {
    id: 1,
    postTitle: '2024年最值得期待的游戏',
    postExcerpt: '本文为大家整理了2024年最值得期待的几款游戏，包括开放世界RPG、动作冒险和策略游戏等多个类型...',
    tiebaName: '游戏吧',
    collectedAt: '2024-01-12T16:45:00'
  },
  {
    id: 2,
    postTitle: '如何保持健康的生活习惯',
    postExcerpt: '现代生活节奏快，很多人都忽略了健康。本文将分享一些简单易行的健康生活习惯，帮助大家在忙碌中也能保持健康...',
    tiebaName: '生活吧',
    collectedAt: '2024-01-10T11:20:00'
  }
])

// 模拟关注的贴吧
const followedTiebas = ref([
  {
    id: 1,
    name: '科技吧',
    desc: '讨论最新科技动态',
    avatar: 'https://via.placeholder.com/60',
    memberCount: 1258000,
    postCount: 89600
  },
  {
    id: 2,
    name: '游戏吧',
    desc: '游戏爱好者聚集地',
    avatar: 'https://via.placeholder.com/60',
    memberCount: 2560000,
    postCount: 156000
  },
  {
    id: 3,
    name: '学习吧',
    desc: '分享学习经验与资源',
    avatar: 'https://via.placeholder.com/60',
    memberCount: 890000,
    postCount: 67000
  }
])

// 模拟关注的用户
const followedUsers = ref([
  {
    id: 1,
    userId: '1001',
    nickname: '技术达人',
    avatar: 'https://via.placeholder.com/40'
  },
  {
    id: 2,
    userId: '1002',
    nickname: '游戏高手',
    avatar: 'https://via.placeholder.com/40'
  },
  {
    id: 3,
    userId: '1003',
    nickname: '生活博主',
    avatar: 'https://via.placeholder.com/40'
  }
])

// 关注类型
const followType = ref('tiebas')

// 计算总页数
const totalPages = computed(() => Math.ceil(userPosts.value.length / 10))

// 格式化时间
const formatTime = (timeString) => {
  const date = new Date(timeString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style scoped>
.user-center {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 用户信息区域 */
.user-info-section {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.user-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  margin-left: 30px;
  flex: 1;
}

.user-details h2 {
  margin: 0 0 5px 0;
  font-size: 24px;
  color: #333;
}

.user-id {
  margin: 0 0 15px 0;
  color: #999;
  font-size: 14px;
}

.user-stats {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #999;
}

.edit-profile-btn {
  padding: 8px 20px;
  border: 1px solid #38f;
  background-color: #fff;
  color: #38f;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.edit-profile-btn:hover {
  background-color: #38f;
  color: #fff;
}

/* 选项卡 */
.tabs {
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.tab-btn {
  flex: 1;
  padding: 15px;
  border: none;
  background-color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.tab-btn:hover {
  background-color: #f5f5f5;
}

.tab-btn.active {
  color: #38f;
  border-bottom-color: #38f;
  font-weight: 500;
}

/* 内容区域 */
.content-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-height: 400px;
}

/* 帖子内容 */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.filter-options {
  display: flex;
  gap: 10px;
}

.filter-btn {
  padding: 6px 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #38f;
  color: #38f;
}

.filter-btn.active {
  background-color: #38f;
  color: #fff;
  border-color: #38f;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-options label {
  font-size: 14px;
  color: #333;
}

.sort-options select {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

/* 帖子列表 */
.posts-list {
  margin-bottom: 20px;
}

.post-item {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  transition: all 0.2s;
}

.post-item:hover {
  background-color: #fafafa;
}

.post-item:last-child {
  border-bottom: none;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.post-title {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 500;
}

.post-tieba {
  padding: 4px 12px;
  background-color: #f0f0f0;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
}

.post-excerpt {
  margin: 0 0 10px 0;
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-stats {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #999;
}

.post-actions {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn,
.remove-btn {
  padding: 6px 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.edit-btn:hover {
  border-color: #38f;
  color: #38f;
}

.delete-btn:hover,
.remove-btn:hover {
  border-color: #ff4d4f;
  color: #ff4d4f;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.pagination button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.pagination button:hover:not(:disabled) {
  border-color: #38f;
  color: #38f;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

/* 收藏列表 */
.collections-list {
  margin-bottom: 20px;
}

.collection-item {
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  transition: all 0.2s;
}

.collection-item:hover {
  background-color: #fafafa;
}

.collection-item:last-child {
  border-bottom: none;
}

.collection-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.collection-title {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 500;
}

.collection-tieba {
  padding: 4px 12px;
  background-color: #f0f0f0;
  border-radius: 12px;
  font-size: 12px;
  color: #666;
}

.collection-excerpt {
  margin: 0 0 10px 0;
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

.collection-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #999;
}

/* 关注内容 */
.follows-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.follow-tab {
  padding: 10px 20px;
  border: none;
  background-color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.follow-tab:hover {
  color: #38f;
}

.follow-tab.active {
  color: #38f;
  border-bottom-color: #38f;
  font-weight: 500;
}

/* 贴吧网格 */
.tieba-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.tieba-card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s;
}

.tieba-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #38f;
}

.tieba-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.tieba-name {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
  font-weight: 500;
}

.tieba-desc {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tieba-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  font-size: 13px;
  color: #999;
}

/* 用户网格 */
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s;
}

.user-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #38f;
}

.user-small-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.user-info {
  flex: 1;
}

.user-small-name {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.user-small-id {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.unfollow-btn {
  padding: 6px 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.unfollow-btn:hover {
  border-color: #ff4d4f;
  color: #ff4d4f;
}
</style>