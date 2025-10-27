import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({
    // 帖子列表
    posts: [],
    // 当前帖子
    currentPost: null,
    // 用户的帖子列表
    userPosts: [],
    // 收藏的帖子列表
    collectedPosts: [],
    // 加载状态
    loading: false,
    // 错误信息
    error: null,
    // 分页信息
    pagination: {
      currentPage: 1,
      pageSize: 20,
      total: 0,
      totalPages: 0
    },
    // 筛选和排序
    filters: {
      tiebaId: null,
      userId: null,
      orderBy: 'latest', // latest, hottest, mostCommented
      searchKeyword: '',
      startTime: null,
      endTime: null
    }
  }),
  
  getters: {
    // 获取帖子总数
    totalPosts: (state) => state.posts.length,
    
    // 获取用户帖子总数
    totalUserPosts: (state) => state.userPosts.length,
    
    // 获取收藏帖子总数
    totalCollectedPosts: (state) => state.collectedPosts.length,
    
    // 根据筛选条件获取帖子
    filteredPosts: (state) => {
      let filtered = [...state.posts]
      
      // 按贴吧筛选
      if (state.filters.tiebaId) {
        filtered = filtered.filter(post => post.tiebaId === state.filters.tiebaId)
      }
      
      // 按用户筛选
      if (state.filters.userId) {
        filtered = filtered.filter(post => post.userId === state.filters.userId)
      }
      
      // 按关键词搜索
      if (state.filters.searchKeyword) {
        const keyword = state.filters.searchKeyword.toLowerCase()
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(keyword) || 
          post.content.toLowerCase().includes(keyword)
        )
      }
      
      // 按时间范围筛选
      if (state.filters.startTime) {
        filtered = filtered.filter(post => 
          new Date(post.createdAt) >= new Date(state.filters.startTime)
        )
      }
      
      if (state.filters.endTime) {
        filtered = filtered.filter(post => 
          new Date(post.createdAt) <= new Date(state.filters.endTime)
        )
      }
      
      // 排序
      switch (state.filters.orderBy) {
        case 'latest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'hottest':
          filtered.sort((a, b) => b.viewCount - a.viewCount)
          break
        case 'mostCommented':
          filtered.sort((a, b) => b.commentCount - a.commentCount)
          break
      }
      
      return filtered
    },
    
    // 分页后的帖子
    paginatedPosts: (state) => {
      const filtered = state.filteredPosts
      const start = (state.pagination.currentPage - 1) * state.pagination.pageSize
      const end = start + state.pagination.pageSize
      
      // 更新分页信息
      state.pagination.total = filtered.length
      state.pagination.totalPages = Math.ceil(filtered.length / state.pagination.pageSize)
      
      return filtered.slice(start, end)
    }
  },
  
  actions: {
    // 重置筛选条件
    resetFilters() {
      this.filters = {
        tiebaId: null,
        userId: null,
        orderBy: 'latest',
        searchKeyword: '',
        startTime: null,
        endTime: null
      }
      this.pagination.currentPage = 1
    },
    
    // 设置筛选条件
    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
      this.pagination.currentPage = 1 // 重置为第一页
    },
    
    // 设置页码
    setPage(page) {
      this.pagination.currentPage = Math.max(1, page)
    },
    
    // 获取帖子列表
    async fetchPosts(params = {}) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 合并参数
        const queryParams = { ...this.filters, ...params }
        
        // 模拟数据
        const mockPosts = [
          {
            id: 1,
            title: '分享一个超实用的学习方法',
            content: '今天想和大家分享一个我最近发现的超实用学习方法，叫做费曼学习法。这种方法通过将复杂的概念用简单的话解释出来，帮助加深理解...',
            userId: '1001',
            username: '技术达人',
            tiebaId: 1,
            tiebaName: '学习吧',
            viewCount: 1280,
            commentCount: 89,
            likeCount: 256,
            isLiked: false,
            isCollected: false,
            createdAt: '2024-01-15T10:30:00',
            updatedAt: '2024-01-15T10:30:00'
          },
          {
            id: 2,
            title: '推荐几款超好用的编程工具',
            content: '作为一个程序员，我发现了几款能显著提高工作效率的工具。首先是VS Code，这款编辑器轻量级但功能强大...',
            userId: '1001',
            username: '技术达人',
            tiebaId: 1,
            tiebaName: '科技吧',
            viewCount: 2560,
            commentCount: 156,
            likeCount: 432,
            isLiked: true,
            isCollected: true,
            createdAt: '2024-01-10T14:20:00',
            updatedAt: '2024-01-10T14:20:00'
          },
          {
            id: 3,
            title: '周末去哪里玩比较好？',
            content: '马上周末了，想带家人出去走走，大家有什么好的推荐吗？最好是适合全家人的地方...',
            userId: '10086',
            username: '百度贴吧用户',
            tiebaId: 3,
            tiebaName: '生活吧',
            viewCount: 890,
            commentCount: 67,
            likeCount: 128,
            isLiked: false,
            isCollected: false,
            createdAt: '2024-01-08T09:15:00',
            updatedAt: '2024-01-08T09:15:00'
          }
        ]
        
        this.posts = mockPosts
        
        // 如果设置了贴吧ID，筛选并更新分页
        if (queryParams.tiebaId) {
          this.filters.tiebaId = queryParams.tiebaId
        }
        
        return this.paginatedPosts
      } catch (error) {
        this.error = error.message || '获取帖子列表失败'
        return []
      } finally {
        this.loading = false
      }
    },
    
    // 获取帖子详情
    async fetchPostDetail(postId) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟数据
        const mockPost = {
          id: postId,
          title: `帖子${postId}的详细内容`,
          content: `<p>这是帖子${postId}的详细内容。</p><p>包含了丰富的信息和图片。</p><img src="https://via.placeholder.com/800x400" alt="帖子图片">`,
          userId: '1001',
          username: '技术达人',
          userAvatar: 'https://via.placeholder.com/100',
          tiebaId: 1,
          tiebaName: '技术吧',
          viewCount: 1580,
          commentCount: 123,
          likeCount: 345,
          isLiked: false,
          isCollected: false,
          createdAt: '2024-01-15T10:30:00',
          updatedAt: '2024-01-15T10:30:00',
          comments: [
            {
              id: 1,
              content: '写得真好，受益匪浅！',
              userId: '1002',
              username: '学习者',
              userAvatar: 'https://via.placeholder.com/50',
              likeCount: 23,
              isLiked: false,
              createdAt: '2024-01-15T11:00:00'
            },
            {
              id: 2,
              content: '感谢分享，已收藏！',
              userId: '1003',
              username: '收藏家',
              userAvatar: 'https://via.placeholder.com/50',
              likeCount: 15,
              isLiked: true,
              createdAt: '2024-01-15T12:00:00'
            }
          ]
        }
        
        this.currentPost = mockPost
        return mockPost
      } catch (error) {
        this.error = error.message || '获取帖子详情失败'
        return null
      } finally {
        this.loading = false
      }
    },
    
    // 获取用户的帖子
    async fetchUserPosts(userId) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟数据
        const mockUserPosts = [
          {
            id: 1,
            title: '分享一个超实用的学习方法',
            content: '今天想和大家分享一个我最近发现的超实用学习方法，叫做费曼学习法...',
            tiebaName: '学习吧',
            viewCount: 1280,
            commentCount: 89,
            createdAt: '2024-01-15T10:30:00'
          },
          {
            id: 2,
            title: '推荐几款超好用的编程工具',
            content: '作为一个程序员，我发现了几款能显著提高工作效率的工具...',
            tiebaName: '科技吧',
            viewCount: 2560,
            commentCount: 156,
            createdAt: '2024-01-10T14:20:00'
          }
        ]
        
        this.userPosts = mockUserPosts
        return mockUserPosts
      } catch (error) {
        this.error = error.message || '获取用户帖子失败'
        return []
      } finally {
        this.loading = false
      }
    },
    
    // 创建帖子
    async createPost(postData) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟新帖子
        const newPost = {
          id: Date.now(),
          title: postData.title,
          content: postData.content,
          userId: '10086',
          username: '百度贴吧用户',
          tiebaId: postData.tiebaId,
          tiebaName: '贴吧' + postData.tiebaId,
          viewCount: 0,
          commentCount: 0,
          likeCount: 0,
          isLiked: false,
          isCollected: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        // 添加到帖子列表
        this.posts.unshift(newPost)
        this.userPosts.unshift(newPost)
        
        return newPost
      } catch (error) {
        this.error = error.message || '创建帖子失败'
        return null
      } finally {
        this.loading = false
      }
    },
    
    // 更新帖子
    async updatePost(postId, postData) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // 更新帖子列表中的帖子
        const index = this.posts.findIndex(p => p.id === postId)
        if (index > -1) {
          this.posts[index] = {
            ...this.posts[index],
            ...postData,
            updatedAt: new Date().toISOString()
          }
        }
        
        // 更新用户帖子列表
        const userPostIndex = this.userPosts.findIndex(p => p.id === postId)
        if (userPostIndex > -1) {
          this.userPosts[userPostIndex] = {
            ...this.userPosts[userPostIndex],
            ...postData
          }
        }
        
        // 更新当前帖子
        if (this.currentPost && this.currentPost.id === postId) {
          this.currentPost = {
            ...this.currentPost,
            ...postData,
            updatedAt: new Date().toISOString()
          }
        }
        
        return true
      } catch (error) {
        this.error = error.message || '更新帖子失败'
        return false
      } finally {
        this.loading = false
      }
    },
    
    // 删除帖子
    async deletePost(postId) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 从列表中移除
        this.posts = this.posts.filter(p => p.id !== postId)
        this.userPosts = this.userPosts.filter(p => p.id !== postId)
        
        // 如果是当前帖子，清空
        if (this.currentPost && this.currentPost.id === postId) {
          this.currentPost = null
        }
        
        return true
      } catch (error) {
        this.error = error.message || '删除帖子失败'
        return false
      } finally {
        this.loading = false
      }
    },
    
    // 点赞帖子
    async likePost(postId) {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // 更新帖子列表
        const post = this.posts.find(p => p.id === postId)
        if (post) {
          post.isLiked = !post.isLiked
          post.likeCount += post.isLiked ? 1 : -1
        }
        
        // 更新当前帖子
        if (this.currentPost && this.currentPost.id === postId) {
          this.currentPost.isLiked = !this.currentPost.isLiked
          this.currentPost.likeCount += this.currentPost.isLiked ? 1 : -1
        }
        
        return true
      } catch (error) {
        this.error = error.message || '操作失败'
        return false
      }
    },
    
    // 收藏帖子
    async collectPost(postId) {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // 查找帖子
        const post = this.posts.find(p => p.id === postId) || this.currentPost
        if (!post) return false
        
        // 更新收藏状态
        post.isCollected = !post.isCollected
        
        // 如果收藏，添加到收藏列表
        if (post.isCollected) {
          const collectItem = {
            id: post.id,
            postTitle: post.title,
            postExcerpt: post.content.substring(0, 100),
            tiebaName: post.tiebaName,
            collectedAt: new Date().toISOString()
          }
          this.collectedPosts.push(collectItem)
        } else {
          // 取消收藏，从列表中移除
          this.collectedPosts = this.collectedPosts.filter(c => c.id !== postId)
        }
        
        return true
      } catch (error) {
        this.error = error.message || '收藏失败'
        return false
      }
    },
    
    // 获取收藏的帖子
    async fetchCollectedPosts() {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟数据
        const mockCollectedPosts = [
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
            postExcerpt: '现代生活节奏快，很多人都忽略了健康。本文将分享一些简单易行的健康生活习惯...',
            tiebaName: '生活吧',
            collectedAt: '2024-01-10T11:20:00'
          }
        ]
        
        this.collectedPosts = mockCollectedPosts
        return mockCollectedPosts
      } catch (error) {
        this.error = error.message || '获取收藏帖子失败'
        return []
      } finally {
        this.loading = false
      }
    }
  }
})