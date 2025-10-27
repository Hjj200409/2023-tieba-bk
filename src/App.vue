<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup>
// App.vue - 应用主组件
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background-color: #f5f5f5;
}

.app-container {
  min-height: 100vh;
}
</style>