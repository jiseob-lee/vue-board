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
        <td><input type="button" value="입력" @click="insertBoardArticle" /> &nbsp; <input type="button" value="목록" @click="goList" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>

import { provide, ref } from 'vue';
import { useRoute } from 'vue-router'
import api from "../api";

const route = useRoute()

//const articleId1 = route.params.articleId as string;
const boardNo1 = route.params.boardNo as string;
const page1 = route.params.page as string;

const articleId = ref<string>("");
const boardNo = ref<string>(boardNo1);
const page = ref<string>(page1);

let boardContent = ref<string>("");
let boardSubject = ref<string>("");
let isFetching = ref<boolean>(true);

const insertBoardArticle = () => {
  console.log("boardNo", boardNo.value);
  console.log("boardTitle", boardSubject.value);
  console.log("boardContent", boardContent.value);
  
  if (!boardSubject.value) {
    alert("글제목을 입력해주시기 바랍니다.");
    return;
  }
  
  let articleData = {
    "boardNo" : boardNo.value,
    "boardTitle" : boardSubject.value,
    "boardContent" : boardContent.value
  };
  
  insertBoardArticleApi(articleData).then((data) => {
    console.log("data", data);
    if (data == "success") {
      alert("게시글이 입력되었습니다.");
      
      let listUrl = "/board/" + boardNo.value + "/1";
      location.href = listUrl;
      
    } else {
      alert("게시글이 입력되지 않았습니다.");
    }
  })
}

const insertBoardArticleApi = async (data: {
    boardNo : string;
    boardTitle : string;
    boardContent : string;
  }) => {
  try {
    const response = await api.post('insertBoardArticle', data);
    //console.log("boardNameList", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const goList = () => {
  let listUrl = "/board/" + boardNo.value + "/" + page.value;
  window.location.href = listUrl;
}

</script>