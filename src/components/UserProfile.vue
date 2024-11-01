<template>
  <div v-if="loading">Loading...</div>
  <div class="user-profile" v-else-if="user">
    <img :src="user.avatar_url" alt="`${user.name} Avatar`" width="200" />
    <div>
      <h1>{{ user.name }}</h1>
      <p>{{ user.bio }}</p>
      <p>Twitter: {{ user.twitter_username }}</p>
      <p>Blog: {{ user.blog }}</p>
    </div>
  </div>
  <div class="error" v-else-if="error">
    {{ error.message }}
  </div>
</template>

<script lang="ts" setup>

import axios from 'axios';
import { ref } from 'vue';
import { onBeforeMount, onMounted, onUpdated } from 'vue';

type User = {
  name: string,
  bio: string,
  avatar_url: string,
  twitter_username: string,
  blog: string,
}

const user = ref<User | null>(null);
const error = ref<Error | null>(null);
const loading = ref<boolean>(false);

async function getUser() {
  
  loading.value = true;
  
  try
  {
   const response = await axios.get<User>("https://api.github.com/users/jiseob-lee");
   
   console.log("response", response);
   
   user.value = await response.data;
  }
  catch (err)
  {
   error.value = err as Error
  } 
  finally
  {
    loading.value = false;
  }
}

onBeforeMount(async () => {
  console.log('created');
  getUser();
})

onMounted(() => {
  console.log("mounted");
})

onUpdated(() => {
  console.log("updated");
})

</script>