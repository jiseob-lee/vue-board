<template>
  <div>
    <label for="name">Step one's input</label>
    <input v-model="name" id="name" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const name = ref<string>("");
</script>