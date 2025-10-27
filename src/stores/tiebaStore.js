import { defineStore } from 'pinia'

export const useTiebaStore = defineStore('tieba', {
  state: () => ({
    // 贴吧列表
    tiebas: [],
    // 当前贴吧
    currentTieba: null,
    // 热门贴吧列表
    hotTiebas: [],
    // 推荐贴吧列表
    recommendedTiebas: [],
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
    // 搜索关键词
    searchKeyword: ''
  }),
  
  getters: {
    // 获取贴吧总数
    totalTiebas: (state) => state.tiebas.length,
    
    // 获取热门贴吧数量
    hotTiebasCount: (state) => state.hotTiebas.length,
    
    // 根据关键词搜索贴吧
    searchResults: (state) => {
      if (!state.searchKeyword) return []
      
      const keyword = state.searchKeyword.toLowerCase()
      return state.tiebas.filter(tieba => 
        tieba.name.toLowerCase().includes(keyword) || 
        tieba.desc.toLowerCase().includes(keyword)
      )
    },
    
    // 分页后的贴吧列表
    paginatedTiebas: (state) => {
      const start = (state.pagination.currentPage - 1) * state.pagination.pageSize
      const end = start + state.pagination.pageSize
      
      // 更新分页信息
      state.pagination.total = state.tiebas.length
      state.pagination.totalPages = Math.ceil(state.tiebas.length / state.pagination.pageSize)
      
      return state.tiebas.slice(start, end)
    }
  },
  
  actions: {
    // 设置搜索关键词
    setSearchKeyword(keyword) {
      this.searchKeyword = keyword
      this.pagination.currentPage = 1 // 重置为第一页
    },
    
    // 设置页码
    setPage(page) {
      this.pagination.currentPage = Math.max(1, page)
    },
    
    // 获取所有贴吧
    async fetchAllTiebas() {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟数据
        const mockTiebas = [
          {
            id: 1,
            name: '科技吧',
            desc: '讨论最新科技动态，分享科技产品评测',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 1258000,
            postCount: 89600,
            todayPostCount: 1234,
            isFollowing: false,
            createdAt: '2020-01-01T00:00:00'
          },
          {
            id: 2,
            name: '娱乐吧',
            desc: '明星八卦，影视资讯，综艺节目讨论',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 2560000,
            postCount: 156000,
            todayPostCount: 3456,
            isFollowing: true,
            createdAt: '2020-02-01T00:00:00'
          },
          {
            id: 3,
            name: '游戏吧',
            desc: '游戏攻略，游戏评测，游戏讨论社区',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 1890000,
            postCount: 234000,
            todayPostCount: 2890,
            isFollowing: false,
            createdAt: '2020-03-01T00:00:00'
          },
          {
            id: 4,
            name: '生活吧',
            desc: '分享生活经验，讨论日常琐事',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 1678000,
            postCount: 123000,
            todayPostCount: 1987,
            isFollowing: true,
            createdAt: '2020-04-01T00:00:00'
          },
          {
            id: 5,
            name: '学习吧',
            desc: '学习方法交流，考试经验分享',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 890000,
            postCount: 67000,
            todayPostCount: 876,
            isFollowing: false,
            createdAt: '2020-05-01T00:00:00'
          },
          {
            id: 6,
            name: '美食吧',
            desc: '美食分享，食谱推荐，餐厅推荐',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 1345000,
            postCount: 98000,
            todayPostCount: 1567,
            isFollowing: false,
            createdAt: '2020-06-01T00:00:00'
          },
          {
            id: 7,
            name: '旅行吧',
            desc: '旅行攻略，景点推荐，旅行照片分享',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 987000,
            postCount: 76000,
            todayPostCount: 1234,
            isFollowing: true,
            createdAt: '2020-07-01T00:00:00'
          },
          {
            id: 8,
            name: '电影吧',
            desc: '电影讨论，影评分享，经典电影推荐',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 1123000,
            postCount: 89000,
            todayPostCount: 1098,
            isFollowing: false,
            createdAt: '2020-08-01T00:00:00'
          },
          {
            id: 9,
            name: '音乐吧',
            desc: '音乐分享，歌手讨论，音乐推荐',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 1098000,
            postCount: 78000,
            todayPostCount: 987,
            isFollowing: true,
            createdAt: '2020-09-01T00:00:00'
          },
          {
            id: 10,
            name: '体育吧',
            desc: '体育赛事讨论，运动健身分享',
            avatar: 'https://via.placeholder.com/60',
            cover: 'https://via.placeholder.com/800x200',
            memberCount: 987000,
            postCount: 67000,
            todayPostCount: 876,
            isFollowing: false,
            createdAt: '2020-10-01T00:00:00'
          }
        ]
        
        this.tiebas = mockTiebas
        return this.paginatedTiebas
      } catch (error) {
        this.error = error.message || '获取贴吧列表失败'
        return []
      } finally {
        this.loading = false
      }
    },
    
    // 获取热门贴吧
    async fetchHotTiebas(limit = 10) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟数据 - 按会员数排序
        const mockHotTiebas = [
          {
            id: 2,
            name: '娱乐吧',
            desc: '明星八卦，影视资讯',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 2560000,
            postCount: 156000
          },
          {
            id: 3,
            name: '游戏吧',
            desc: '游戏攻略，游戏评测',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 1890000,
            postCount: 234000
          },
          {
            id: 4,
            name: '生活吧',
            desc: '分享生活经验',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 1678000,
            postCount: 123000
          },
          {
            id: 6,
            name: '美食吧',
            desc: '美食分享，食谱推荐',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 1345000,
            postCount: 98000
          },
          {
            id: 1,
            name: '科技吧',
            desc: '讨论最新科技动态',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 1258000,
            postCount: 89600
          }
        ]
        
        this.hotTiebas = mockHotTiebas.slice(0, limit)
        return this.hotTiebas
      } catch (error) {
        this.error = error.message || '获取热门贴吧失败'
        return []
      } finally {
        this.loading = false
      }
    },
    
    // 获取推荐贴吧
    async fetchRecommendedTiebas(limit = 8) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟数据 - 基于用户兴趣推荐
        const mockRecommendedTiebas = [
          {
            id: 7,
            name: '旅行吧',
            desc: '旅行攻略，景点推荐',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 987000,
            postCount: 76000
          },
          {
            id: 8,
            name: '电影吧',
            desc: '电影讨论，影评分享',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 1123000,
            postCount: 89000
          },
          {
            id: 5,
            name: '学习吧',
            desc: '学习方法交流',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 890000,
            postCount: 67000
          },
          {
            id: 9,
            name: '音乐吧',
            desc: '音乐分享，歌手讨论',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 1098000,
            postCount: 78000
          }
        ]
        
        this.recommendedTiebas = mockRecommendedTiebas.slice(0, limit)
        return this.recommendedTiebas
      } catch (error) {
        this.error = error.message || '获取推荐贴吧失败'
        return []
      } finally {
        this.loading = false
      }
    },
    
    // 获取贴吧详情
    async fetchTiebaDetail(tiebaId) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟数据
        const mockTiebaDetail = {
          id: tiebaId,
          name: `贴吧${tiebaId}`,
          desc: `这是贴吧${tiebaId}的详细描述，包含了贴吧的主题、规则和相关信息。`,
          avatar: 'https://via.placeholder.com/100',
          cover: 'https://via.placeholder.com/1200x300',
          memberCount: Math.floor(Math.random() * 2000000) + 500000,
          postCount: Math.floor(Math.random() * 200000) + 50000,
          todayPostCount: Math.floor(Math.random() * 3000) + 500,
          isFollowing: false,
          isManager: false,
          createdAt: '2020-01-01T00:00:00',
          rules: [
            '遵守百度贴吧协议',
            '友善交流，文明发言',
            '禁止发布广告和垃圾信息',
            '禁止发布敏感内容'
          ],
          managers: [
            {
              id: '1001',
              nickname: '管理员小明',
              avatar: 'https://via.placeholder.com/50'
            },
            {
              id: '1002',
              nickname: '管理员小红',
              avatar: 'https://via.placeholder.com/50'
            }
          ],
          hotTopics: [
            '吧友见面会即将开始',
            '本周话题讨论：如何提高学习效率',
            '贴吧活动预告'
          ]
        }
        
        this.currentTieba = mockTiebaDetail
        return mockTiebaDetail
      } catch (error) {
        this.error = error.message || '获取贴吧详情失败'
        return null
      } finally {
        this.loading = false
      }
    },
    
    // 创建贴吧
    async createTieba(tiebaData) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟新贴吧
        const newTieba = {
          id: Date.now(),
          name: tiebaData.name,
          desc: tiebaData.desc,
          avatar: tiebaData.avatar || 'https://via.placeholder.com/60',
          cover: tiebaData.cover || 'https://via.placeholder.com/800x200',
          memberCount: 1,
          postCount: 0,
          todayPostCount: 0,
          isFollowing: true,
          createdAt: new Date().toISOString()
        }
        
        // 添加到列表
        this.tiebas.unshift(newTieba)
        
        return newTieba
      } catch (error) {
        this.error = error.message || '创建贴吧失败'
        return null
      } finally {
        this.loading = false
      }
    },
    
    // 更新贴吧信息
    async updateTieba(tiebaId, tiebaData) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // 更新贴吧列表
        const index = this.tiebas.findIndex(t => t.id === tiebaId)
        if (index > -1) {
          this.tiebas[index] = {
            ...this.tiebas[index],
            ...tiebaData
          }
        }
        
        // 更新当前贴吧
        if (this.currentTieba && this.currentTieba.id === tiebaId) {
          this.currentTieba = {
            ...this.currentTieba,
            ...tiebaData
          }
        }
        
        return true
      } catch (error) {
        this.error = error.message || '更新贴吧信息失败'
        return false
      } finally {
        this.loading = false
      }
    },
    
    // 关注/取消关注贴吧
    async toggleFollowTieba(tiebaId) {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 200))
        
        // 更新贴吧列表中的关注状态
        const tieba = this.tiebas.find(t => t.id === tiebaId)
        if (tieba) {
          const wasFollowing = tieba.isFollowing
          tieba.isFollowing = !wasFollowing
          // 更新会员数
          tieba.memberCount += wasFollowing ? -1 : 1
        }
        
        // 更新当前贴吧
        if (this.currentTieba && this.currentTieba.id === tiebaId) {
          this.currentTieba.isFollowing = !this.currentTieba.isFollowing
        }
        
        // 更新热门贴吧中的关注状态
        const hotTieba = this.hotTiebas.find(t => t.id === tiebaId)
        if (hotTieba) {
          hotTieba.isFollowing = !hotTieba.isFollowing
        }
        
        // 更新推荐贴吧中的关注状态
        const recommendedTieba = this.recommendedTiebas.find(t => t.id === tiebaId)
        if (recommendedTieba) {
          recommendedTieba.isFollowing = !recommendedTieba.isFollowing
        }
        
        return true
      } catch (error) {
        this.error = error.message || '操作失败'
        return false
      }
    },
    
    // 搜索贴吧
    async searchTiebas(keyword) {
      this.loading = true
      this.error = null
      
      try {
        // 设置搜索关键词
        this.searchKeyword = keyword
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 这里可以调用fetchAllTiebas来获取完整列表，然后通过getter进行筛选
        if (this.tiebas.length === 0) {
          await this.fetchAllTiebas()
        }
        
        return this.searchResults
      } catch (error) {
        this.error = error.message || '搜索失败'
        return []
      } finally {
        this.loading = false
      }
    },
    
    // 获取贴吧统计信息
    async fetchTiebaStats(tiebaId) {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // 模拟统计数据
        return {
          dailyPosts: [123, 234, 189, 256, 321, 289, 345], // 最近7天发帖数
          activeMembers: 15678, // 活跃会员数
          newMembersToday: 567, // 今日新增会员
          hotHours: [20, 21, 22, 19, 18, 12, 13, 14], // 活跃时段
          topContributors: [
            { id: '1001', nickname: '活跃用户1', postCount: 156 },
            { id: '1002', nickname: '活跃用户2', postCount: 123 },
            { id: '1003', nickname: '活跃用户3', postCount: 98 }
          ]
        }
      } catch (error) {
        console.error('获取统计信息失败:', error)
        return null
      }
    }
  }
})