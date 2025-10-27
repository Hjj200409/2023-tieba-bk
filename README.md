# 百度贴吧前端项目

基于 Veaury 框架的百度贴吧前端实现，支持 Vue 和 React 组件混合使用。

## 技术栈

- **核心框架**：Vue 3.3.0 + React 18.2.0
- **混合框架**：Veaury 2.6.0
- **构建工具**：Vite 4.4.0
- **路由管理**：Vue Router 4.2.0
- **状态管理**：Pinia 2.1.0
- **样式**：原生 CSS + CSS Modules

## 项目结构

```
frontend/
├── public/               # 静态资源
├── src/
│   ├── vue-components/   # Vue 组件
│   ├── react-components/ # React 组件
│   ├── pages/           # 页面组件（可包含混合组件）
│   ├── stores/          # Pinia 状态管理
│   ├── App.vue          # 根组件
│   ├── main.js          # 应用入口
│   ├── router.js        # 路由配置
│   └── store.js         # 状态管理配置
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 核心功能

1. **首页**：展示热门贴吧、推荐内容、轮播图
2. **贴吧详情**：查看贴吧信息、帖子列表、关注贴吧
3. **发帖功能**：使用 React 富文本编辑器发布帖子
4. **个人中心**：用户信息管理、我的帖子、收藏管理
5. **状态管理**：使用 Pinia 管理用户、帖子、贴吧数据

## 开发环境

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 特殊说明

- 项目使用 Veaury 框架实现 Vue 和 React 组件的混合使用
- RichEditor 是 React 组件，在 CreatePost.vue 中混合使用
- 所有 API 调用目前使用模拟数据
- 路由懒加载提升性能
- 支持响应式布局，适配不同设备

## 注意事项

1. 开发前请确保 Node.js 版本 >= 16.0
2. 安装依赖时可能需要设置 npm 镜像源
3. 模拟数据仅用于演示，实际项目中需要接入真实 API
4. 部分功能需要登录状态，可以在 localStorage 中手动设置 userToken 进行模拟