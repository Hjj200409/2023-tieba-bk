<template>
  <div class="home-page">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="container">
        <div class="logo">
          <h1>百度贴吧</h1>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="搜索贴吧、帖子、用户" />
          <button>搜索</button>
        </div>
        <div class="nav-actions">
          <button>登录</button>
          <button>注册</button>
          <button>发布</button>
        </div>
      </div>
    </header>

    <!-- 轮播图/推荐区域 -->
    <section class="carousel-section">
      <div class="carousel">
        <div class="carousel-item active">
          <img src="https://picsum.photos/id/1/1200/400" alt="推荐内容" />
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <div class="container">
        <!-- 热门贴吧列表 -->
        <div class="hot-tiebas">
          <h2>热门贴吧</h2>
          <div class="tieba-list">
            <div class="tieba-item" v-for="tieba in hotTiebas" :key="tieba.id">
              <img :src="tieba.avatar" alt="" />
              <div class="tieba-info">
                <h3>{{ tieba.name }}</h3>
                <p>{{ tieba.memberCount }} 成员</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 热门帖子列表 -->
        <div class="hot-posts">
          <h2>热门帖子</h2>
          <div class="post-list">
            <div class="post-item" v-for="post in hotPosts" :key="post.id">
              <h3>{{ post.title }}</h3>
              <p class="post-meta">
                <span>来自: {{ post.tiebaName }}</span>
                <span>作者: {{ post.authorName }}</span>
                <span>回复: {{ post.replyCount }}</span>
                <span>{{ post.createdAt }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚信息 -->
    <footer class="footer">
      <div class="container">
        <p>© 2024 百度贴吧 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 模拟数据
const hotTiebas = ref([
  {
    id: 1,
    name: '科技吧',
    avatar: 'https://picsum.photos/id/20/50/50',
    memberCount: 100000
  },
  {
    id: 2,
    name: '娱乐吧',
    avatar: 'https://picsum.photos/id/21/50/50',
    memberCount: 200000
  },
  {
    id: 3,
    name: '游戏吧',
    avatar: 'https://picsum.photos/id/22/50/50',
    memberCount: 150000
  }
])

const hotPosts = ref([
  {
    id: 1,
    title: '2024年最新科技趋势预测',
    tiebaName: '科技吧',
    authorName: '科技达人',
    replyCount: 567,
    createdAt: '2小时前'
  },
  {
    id: 2,
    title: '热门电影推荐',
    tiebaName: '娱乐吧',
    authorName: '影迷小王',
    replyCount: 342,
    createdAt: '5小时前'
  },
  {
    id: 3,
    title: '游戏攻略分享',
    tiebaName: '游戏吧',
    authorName: '游戏大神',
    replyCount: 789,
    createdAt: '昨天'
  }
])

onMounted(() => {
  // 这里可以添加数据加载逻辑
})
</script>

<style scoped>
.home-page {
  width: 100%;
}

.navbar {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  color: #38f;
  font-size: 24px;
}

.search-bar {
  display: flex;
}

.search-bar input {
  width: 400px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.search-bar button {
  padding: 8px 20px;
  background-color: #38f;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.nav-actions button {
  margin-left: 10px;
  padding: 8px 16px;
  border: 1px solid #38f;
  background-color: white;
  color: #38f;
  border-radius: 4px;
  cursor: pointer;
}

.nav-actions button:last-child {
  background-color: #38f;
  color: white;
}

.carousel-section {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-content {
  padding: 20px 0;
}

.main-content .container {
  flex-wrap: wrap;
}

.hot-tiebas,
.hot-posts {
  width: 48%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.hot-tiebas h2,
.hot-posts h2 {
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.tieba-list .tieba-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.tieba-item img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.tieba-info h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.tieba-info p {
  font-size: 14px;
  color: #999;
}

.post-list .post-item {
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.post-item h3 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}

.post-meta {
  font-size: 14px;
  color: #999;
}

.post-meta span {
  margin-right: 15px;
}

.footer {
  background-color: #f5f5f5;
  padding: 20px 0;
  text-align: center;
  color: #999;
}
</style>