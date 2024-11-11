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
let boardSubject = ref<string>("");
let isFetching = ref<boolean>(true);

const goList = () => {
  window.location.href = "/board/" + boardNo.value + "/" + page.value;
};

const goEdit = () => {
  window.location.href = "/board/edit/" + articleId.value + "/" + boardNo.value + "/" + page.value;
};

let deleteUrl = "/board/" + boardNo.value + "/1";

const goDelete = () => {
  
  let articleData = {
    "articleId" : articleId.value
  };
  
  deleteBoardArticleApi(articleData).then((data) => {
    //console.log("data", data);
    if (data == "success") {
      alert("게시글이 삭제되었습니다.");
      location.href = deleteUrl;
    } else {
      alert("게시글이 삭제되지 않았습니다.");
    }
  })
};

const deleteBoardArticleApi = async (data: { articleId: string; }) => {
  try {
    const response = await api.post('deleteBoardArticle', data);
    //console.log("boardNameList", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


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
  boardSubject = data.subject;
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
    <input type="button" value="목록" @click="goList" style="margin: 5px;" />
    <input type="button" value="수정" @click="goEdit" style="margin: 5px;" />
    <input type="button" value="삭제" @click="goDelete" style="margin: 5px;" />
  </div>
  
  <div v-if="!isFetching" v-html="boardContent">
  </div>
  
  <div>
    <input type="button" value="목록" @click="goList" style="margin: 5px;" />
    <input type="button" value="수정" @click="goEdit" style="margin: 5px;" />
    <input type="button" value="삭제" @click="goDelete" style="margin: 5px;" />
  </div>
</template>