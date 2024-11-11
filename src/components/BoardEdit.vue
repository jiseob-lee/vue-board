<template>
  <table>
    <tbody>
      <tr>
        <td>제목</td>
        <td><input type="text" name="boardSubject" style="width: 670px;" v-model="boardSubject" /></td>
      </tr>
      <tr>
        <td>내용</td>
        <td><textarea name="boardContent" cols="100" rows="30" v-model="boardContent"></textarea></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><input type="button" value="수정" @click="updateBoardArticle" /> &nbsp; <input type="button" value="목록" @click="goList" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>

import { provide, ref } from 'vue';
import { useRoute } from 'vue-router'
import api from "../api";

const route = useRoute()


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


const getBoardContent = async () => {
  try {
    let url = "getBoardContent?articleId=" + articleId.value;
    
    let response = await api.get(url);
    
    //console.log("response", response);
    
    return response.data;
    
  } catch (error) {
    console.error(error);
  }
}


getBoardContent().then((data) => {
  boardContent.value = data.content;
  boardSubject.value = data.subject;
  isFetching.value = false;
});

const goList = () => {
  let listUrl = "/board/" + boardNo.value + "/" + page.value;
  window.location.href = listUrl;
}

const updateBoardArticleApi = async (data: {
    articleId : string;
    boardTitle : string;
    boardContent : string;
  }) => {
  try {
    const response = await api.post('updateBoardArticle', data);
    //console.log("boardNameList", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const updateBoardArticle = () => {
  console.log("boardNo", boardNo.value);
  console.log("boardTitle", boardSubject.value);
  console.log("boardContent", boardContent.value);
  
  if (!boardSubject.value) {
    alert("글제목을 입력해주시기 바랍니다.");
    return;
  }
  
  let articleData = {
    "articleId" : articleId.value,
    "boardTitle" : boardSubject.value,
    "boardContent" : boardContent.value
  };
  
  updateBoardArticleApi(articleData).then((data) => {
    console.log("data", data);
    if (data == "success") {
      alert("게시글이 수정되었습니다.");
      let viewUrl = "/board/view/" + articleId.value + "/" + boardNo.value + "/" + page.value;
      location.href = viewUrl;
    } else {
      alert("게시글이 수정되지 않았습니다.");
    }
  })
}

</script>
