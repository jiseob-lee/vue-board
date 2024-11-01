<script lang="ts">

import { defineComponent } from 'vue'
import ToDoItem from './ToDoItem.vue'
import type { Task } from './ToDoItem.vue'

export default defineComponent({
  name: 'ToDoList',
  component: {
    ToDoItem
  },
  data() {
    return {
      tasks: [
        { id: 1, title: 'Learn Vue', completed: false },
        { id: 2, title: 'Learn TypeScript', completed: false },
        { id: 3, title: 'Learn Vite', completed: false },
      ] as Task[]
    }
  },
  
});
</script>

<template>
  <ul style="list-style: none;">
    <li v-for="task in tasks" :key="task.id">
      <ToDoItem :task="task" />
    </li>
  </ul>
</template>