import { createAppWithReact } from 'veaury'
import App from './App.vue'
import router from './router'
import { pinia } from './store'

// 创建混合应用
const app = createAppWithReact(App)

// 使用路由
app.use(router)

// 使用Pinia状态管理
app.use(pinia)

// 挂载应用
app.mount('#app')