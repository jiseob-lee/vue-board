<script lang="ts" setup>

import { provide, ref } from 'vue';
import { useRoute } from 'vue-router'
import api from "../api";

const route = useRoute()

/*
const props = defineProps({
  articleId: {
    type: Number,
    required: true,
  },
  boardNo: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
});
*/
//provide("props", props);

const articleId1 = route.params.articleId as string;
const boardNo1 = route.params.boardNo as string;
const page1 = route.params.page as string;

//provide("articleId1", articleId1);
//provide("boardNo1", boardNo1);
//provide("page1", page1);
const articleId = ref<string>(articleId1);
const boardNo = ref<string>(boardNo1);
const page = ref<string>(page1);

let boardContent = ref<string>("");
let isFetching = ref<boolean>(true);

const goList = () => {
  window.location.href = "/board/" + boardNo.value + "/" + page.value;
};

async function getBoardContent() {
  try {
    isFetching.value = true;
    
    let url = "getBoardContent?articleId=" + articleId1;
    
    let response = await api.get(url);
    
    //console.log("response", response);
    
    return response.data;
    
  } catch (error) {
    console.error(error);
  }
}

getBoardContent().then((data) => {
  boardContent = data.content;
  isFetching.value = false;
});

</script>


<script lang="ts">
/*
//import { useRoute } from 'vue-router'

//const route = useRoute()

export default {
  
  name: 'board-view',
  
  inject: [ "articleId1", "boardNo1", "page1" ],
  
  data: () => ({
    articleId : articleId1,
    boardNo : boardNo1,
    page : page1,
  }),
  
  methods: {
    goList: function() {
    }
  }
  
}
*/
</script>

<template>
  <div style="margin-top: 15px;">
    <input type="button" value="목록" @click="goList" />
  </div>
  
  <div v-if="!isFetching" v-html="boardContent">
  </div>
  
  <div>
    <input type="button" value="목록" @click="goList" />
  </div>
</template>