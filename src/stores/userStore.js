import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 用户信息
    currentUser: null,
    // 登录状态
    isLoggedIn: false,
    // 加载状态
    loading: false,
    // 错误信息
    error: null,
    // 用户关注的贴吧列表
    followedTiebas: [],
    // 用户关注的用户列表
    followedUsers: []
  }),
  
  getters: {
    // 获取用户ID
    userId: (state) => state.currentUser?.id || null,
    
    // 获取用户名
    nickname: (state) => state.currentUser?.nickname || '未登录用户',
    
    // 获取用户头像
    avatar: (state) => state.currentUser?.avatar || 'https://via.placeholder.com/100',
    
    // 获取关注的贴吧数量
    followedTiebasCount: (state) => state.followedTiebas.length,
    
    // 获取关注的用户数量
    followedUsersCount: (state) => state.followedUsers.length,
    
    // 是否是管理员
    isAdmin: (state) => state.currentUser?.role === 'admin'
  },
  
  actions: {
    // 登录
    async login(username, password) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟登录成功
        this.currentUser = {
          id: '10086',
          username: username,
          nickname: '百度贴吧用户',
          avatar: 'https://via.placeholder.com/100',
          email: 'user@example.com',
          phone: '138****8888',
          role: 'user',
          postCount: 42,
          followCount: 128,
          fansCount: 96,
          createdAt: '2024-01-01T00:00:00'
        }
        
        this.isLoggedIn = true
        
        // 保存token到localStorage
        localStorage.setItem('userToken', 'mock-token-' + Date.now())
        localStorage.setItem('userInfo', JSON.stringify(this.currentUser))
        
        // 加载关注信息
        this.loadUserFollows()
        
        return true
      } catch (error) {
        this.error = error.message || '登录失败，请重试'
        return false
      } finally {
        this.loading = false
      }
    },
    
    // 注册
    async register(userData) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟注册成功
        this.currentUser = {
          id: '10086',
          username: userData.username,
          nickname: userData.nickname || userData.username,
          avatar: 'https://via.placeholder.com/100',
          email: userData.email,
          phone: userData.phone,
          role: 'user',
          postCount: 0,
          followCount: 0,
          fansCount: 0,
          createdAt: new Date().toISOString()
        }
        
        this.isLoggedIn = true
        
        // 保存token到localStorage
        localStorage.setItem('userToken', 'mock-token-' + Date.now())
        localStorage.setItem('userInfo', JSON.stringify(this.currentUser))
        
        return true
      } catch (error) {
        this.error = error.message || '注册失败，请重试'
        return false
      } finally {
        this.loading = false
      }
    },
    
    // 登出
    logout() {
      this.currentUser = null
      this.isLoggedIn = false
      this.followedTiebas = []
      this.followedUsers = []
      
      // 清除localStorage
      localStorage.removeItem('userToken')
      localStorage.removeItem('userInfo')
    },
    
    // 从localStorage恢复登录状态
    restoreLoginState() {
      const token = localStorage.getItem('userToken')
      const userInfo = localStorage.getItem('userInfo')
      
      if (token && userInfo) {
        try {
          this.currentUser = JSON.parse(userInfo)
          this.isLoggedIn = true
          this.loadUserFollows()
        } catch (error) {
          console.error('恢复登录状态失败:', error)
          this.logout()
        }
      }
    },
    
    // 更新用户信息
    async updateProfile(profileData) {
      if (!this.isLoggedIn) return false
      
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 更新用户信息
        this.currentUser = {
          ...this.currentUser,
          ...profileData
        }
        
        // 保存到localStorage
        localStorage.setItem('userInfo', JSON.stringify(this.currentUser))
        
        return true
      } catch (error) {
        this.error = error.message || '更新失败，请重试'
        return false
      } finally {
        this.loading = false
      }
    },
    
    // 加载用户关注信息
    async loadUserFollows() {
      if (!this.isLoggedIn) return
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟数据
        this.followedTiebas = [
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
        ]
        
        this.followedUsers = [
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
        ]
      } catch (error) {
        console.error('加载关注信息失败:', error)
      }
    },
    
    // 关注贴吧
    async followTieba(tiebaId) {
      if (!this.isLoggedIn) return false
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟添加到关注列表
        const mockTieba = {
          id: tiebaId,
          name: '贴吧' + tiebaId,
          desc: '这是一个贴吧',
          avatar: 'https://via.placeholder.com/60',
          memberCount: Math.floor(Math.random() * 1000000),
          postCount: Math.floor(Math.random() * 10000)
        }
        
        this.followedTiebas.push(mockTieba)
        return true
      } catch (error) {
        this.error = error.message || '关注失败'
        return false
      }
    },
    
    // 取消关注贴吧
    async unfollowTieba(tiebaId) {
      if (!this.isLoggedIn) return false
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 从关注列表中移除
        const index = this.followedTiebas.findIndex(t => t.id === tiebaId)
        if (index > -1) {
          this.followedTiebas.splice(index, 1)
        }
        
        return true
      } catch (error) {
        this.error = error.message || '取消关注失败'
        return false
      }
    },
    
    // 检查是否关注了某个贴吧
    isFollowingTieba(tiebaId) {
      return this.followedTiebas.some(t => t.id === tiebaId)
    }
  }
})