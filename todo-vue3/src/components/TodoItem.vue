<template>
  <div>
    <!-- 输入区域 -->
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="写点什么">
    <button @click="addTodo">添加</button>

    <!-- 筛选按钮 -->
    <div>
      <button @click="filter = 'all'" :class="{active: filter === 'all'}">全部</button>
      <button @click="filter = 'active'" :class="{active: filter === 'active'}">未完成</button>
      <button @click="filter = 'completed'" :class="{active: filter === 'completed'}">已完成</button>
      <button @click="clearCompleted">清除已完成</button>
    </div>

    <!-- 列表 -->
    <ul>
      <li v-for="(item, index) in filteredList" :key="index">
        <input type="checkbox" v-model="item.done">
        <span :class="{done: item.done}">{{ item.text }}</span>
        <button @click="removeTodo(item)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 数据
const newTodo = ref('')
const todos = ref(JSON.parse(localStorage.getItem('todos')) || [
  { text: '买牛奶', done: false },
  { text: '学Vue', done: false }
])
const filter = ref('all')

// 筛选后的列表
const filteredList = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.done)
  if (filter.value === 'completed') return todos.value.filter(t => t.done)
  return todos.value
})

// 添加
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({ text: newTodo.value.trim(), done: false })
    newTodo.value = ''
  }
}

// 删除（直接用原数组的item）
const removeTodo = (item) => {
  const index = todos.value.indexOf(item)
  todos.value.splice(index, 1)
}

// 清除已完成
const clearCompleted = () => {
  todos.value = todos.value.filter(t => !t.done)
}

// 自动保存
import { watch } from 'vue'
watch(todos, (val) => {
  localStorage.setItem('todos', JSON.stringify(val))
}, { deep: true })
</script>

<style scoped>
.done {
  text-decoration: line-through;
  color: gray;
}
.active {
  background: #42b883;
  color: white;
}
button {
  margin: 4px;
}
</style>