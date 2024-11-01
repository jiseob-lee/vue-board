<script lang="ts" setup>
import { type ComponentOptions } from 'vue';
</script>

<script lang="ts">

type Data = {
  counter: number;
}

export default {
  
  data(): Data {
    return {
      counter: 0
    }
  },
    
  created() {
    const interval = setInterval(() => {
      (this as ComponentOptions<Data>).counter++
    }, 1000);
      
    setTimeout(() => {
      clearInterval(interval)
    }, 5000);
  }
}
</script>

<template>
  <div>Counter: {{ counter }}</div>
</template>