<template>
  <div class="create-post">
    <!-- Vue 组件: 表单头部 -->
    <div class="post-header">
      <h2>发布新帖</h2>
      <button @click="showPreview = !showPreview">
        {{ showPreview ? '编辑' : '预览' }}
      </button>
    </div>

    <!-- 帖子表单 -->
    <div class="post-form">
      <!-- 选择贴吧 -->
      <div class="form-group">
        <label>选择贴吧</label>
        <select v-model="selectedTieba">
          <option value="">请选择贴吧</option>
          <option v-for="tieba in tiebas" :key="tieba.id" :value="tieba.id">
            {{ tieba.name }}
          </option>
        </select>
      </div>

      <!-- 帖子标题 -->
      <div class="form-group">
        <label>帖子标题</label>
        <input 
          type="text" 
          v-model="postTitle" 
          placeholder="请输入帖子标题"
          maxlength="100"
        />
        <span class="char-count">{{ postTitle.length }}/100</span>
      </div>

      <!-- React 组件: 富文本编辑器 -->
      <div class="form-group">
        <label>帖子内容</label>
        <RichEditor
          :value="postContent"
          :config="editorConfig"
          @change="handleContentChange"
        />
      </div>

      <!-- Vue 组件: 提交按钮 -->
      <div class="post-actions">
        <button 
          class="cancel-btn" 
          @click="handleCancel"
        >
          取消
        </button>
        <button 
          class="submit-btn" 
          :disabled="!canSubmit || submitting"
          @click="submitPost"
        >
          {{ submitting ? '发布中...' : '发布帖子' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import RichEditor from '@/react-components/RichEditor'

const router = useRouter()

// 帖子数据
const postTitle = ref('')
const postContent = ref('')
const selectedTieba = ref('')
const showPreview = ref(false)
const submitting = ref(false)

// 编辑器配置
const editorConfig = {
  placeholder: '请输入帖子内容...',
  maxLength: 10000
}

// 模拟贴吧数据
const tiebas = ref([
  { id: 1, name: '科技吧' },
  { id: 2, name: '娱乐吧' },
  { id: 3, name: '游戏吧' },
  { id: 4, name: '生活吧' },
  { id: 5, name: '学习吧' }
])

// 计算是否可以提交
const canSubmit = computed(() => {
  return postTitle.value.trim() && postContent.value.trim() && selectedTieba.value
})

// 处理内容变化
const handleContentChange = (content) => {
  postContent.value = content
}

// 提交帖子
const submitPost = async () => {
  if (!canSubmit.value || submitting.value) return
  
  submitting.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('提交帖子:', {
      title: postTitle.value,
      content: postContent.value,
      tiebaId: selectedTieba.value
    })
    
    // 提交成功后跳转
    alert('帖子发布成功！')
    router.push('/')
  } catch (error) {
    console.error('发布失败:', error)
    alert('发布失败，请重试')
  } finally {
    submitting.value = false
  }
}

// 取消
const handleCancel = () => {
  if (postTitle.value || postContent.value) {
    if (confirm('确定要放弃编辑吗？')) {
      router.push('/')
    }
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.create-post {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.post-header h2 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.post-header button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.post-header button:hover {
  border-color: #38f;
  color: #38f;
}

.post-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group select:focus,
.form-group input:focus {
  outline: none;
  border-color: #38f;
  box-shadow: 0 0 0 2px rgba(56, 128, 255, 0.1);
}

.char-count {
  display: inline-block;
  margin-left: 10px;
  font-size: 12px;
  color: #999;
}

.post-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.cancel-btn,
.submit-btn {
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn {
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
}

.cancel-btn:hover {
  border-color: #38f;
  color: #38f;
}

.submit-btn {
  border: none;
  background-color: #38f;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2d7fff;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>