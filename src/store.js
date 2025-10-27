import { createPinia } from 'pinia'

// 创建Pinia实例
const pinia = createPinia()

// 导出store
import { useUserStore } from './stores/userStore'
import { usePostStore } from './stores/postStore'
import { useTiebaStore } from './stores/tiebaStore'

export { pinia, useUserStore, usePostStore, useTiebaStore }