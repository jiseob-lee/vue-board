<template>
    <section class="layout_container">
        <div class="contentWrap admin">
            <section class="content">
                <div class="ctBox">
                    <div class="ctBox_top" style="margin-top: 15px;">
                        게시판 선택 : 
                        <select @change="selectBoard" v-model="selectedOption">
                          <option v-for="board in boardList" v-bind:key="board.boardIdx" :value="board.boardIdx">{{ board.boardName }}</option>
                        </select>
                    </div>
                    <div class="ctBox_top">
                        <h3 class="ctTit_small">게시글 목록</h3>
                    </div>
                    <table class="tbl clearfix" v-if="!isFetching">
                        <colgroup>
                            <col style="width:5%">
                            <col>
                            <col>
                            <col>
                            <col>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>제목</th>
                                <th>조회수</th>
                                <th>등록일시</th>
                                <th>공개여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <!-- <tr @click="trClick(list)" v-for="list in articleLists" v-bind:key="list.boardArticleIdx"> -->
                            <tr v-for="list in articleLists" v-bind:key="list.boardArticleIdx">
                                <td>{{ list.boardArticleIdx }}</td>
                                <td><a :href="`/board/view/${ list.boardArticleIdx }/${ boardNo }/${ page.page }`">{{ list.subject }}</a></td>
                                <td>{{ list.hitCount }}</td>
                                <td>{{ list.dateCreated }}</td>
                                <td>{{ list.openYn }}</td>
                            </tr>
                            

                            <!--
                            <tr v-if="this.flag === true">
                                <td colspan="7">등록된 관리자 정보가 없습니다.</td>
                            </tr>
                            -->
                        </tbody>
                    </table>
                    <!-- <paging :page="page" @onPage="onPage" v-if="this.lists.length !== 0"/> -->
                    <paging :page="page" @onPage="onPage" />
                    <div>
                      <input type="button" value="새글 입력" @click="goNew" />
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script lang="ts">
//const $ = window.$;
//import { mapState, mapActions } from 'vuex'
import paging from '@/components/paging.vue'
import axios from 'axios';
import { inject } from 'vue';
import { reactive } from 'vue';
import api from "../api";
import { defineComponent } from 'vue'; 
import { useRoute } from 'vue-router';

//const articleList = inject('articleList');


type Article = {
  boardArticleIdx : number;
  subject : string;
  hitCount : number;
  dateCreated : string;
  openYn : string;
}

type Board = {
  boardIdx : number;
  boardName : string;
  dateCreated : string;
}

//const articleList = reactive<Article[]>([]);

/*
interface Option { 
  value: string; 
  text: string; 
} 

const options = ref<Option[]>([]);

// Reactive variable to store the selected value 

const selectedOption = ref<string>(options.value[0].value);
*/

export default defineComponent({
    name: 'board-list',
    components: {
        paging
    },
    
    data: () => ({
        page: {
            total: 165,//localStorage.getItem('total'),
            page: 1,//localStorage.getItem('page'),
            count: 10
        },
        boardNo: 10,
        articleLists: [] as Article[],
        isFetching: true,
        boardList: [] as Board[],
        selectedOption: "",
    }),
   
    //computed: {
        //...mapState([
            //'lists'
        //]),
    //},
    
    setup() { 
      const route = useRoute(); 
      return { route };
    },
    
    mounted() {
        
        this.board();
        
        console.log("route", this.route.params.boardNo);
        
        
        this.selectedOption = this.route.params && this.route.params.boardNo ? this.route.params.boardNo + "" : "5";
        
        this.boardNo = Number(this.selectedOption);
        
        this.page.page = this.route.params && this.route.params.page ? Number(this.route.params.page) : 1;
        
        if (this.page.page === null) {
            this.page.page = 1
        }
            
        this.main(this.page.page);
        
        
    },
          
    methods: {
        
        board: function() {
            
            api.post('boardNameList', {"1":"1"})
            .then(response => {
              
              console.log(response);
              console.log("data", response.data);
              
              this.boardList = response.data;
              
            })
            .catch(err => {
              console.log(err);
            });
        },
        
        main: function(page: number) {
            
            this.isFetching = true;
            
            const payload = {
                currentPage : page,
                pageArticleCount : this.page ? this.page.count : 10,
                boardNo : this.boardNo,
            }

            //this.adminList(payload)
                //.then(res => {
                    //this.page = res.data.page
                //})
            
            api.post('boardArticleList2', payload)
            .then(response => {
              
              console.log(response);
              
              this.page = response.data.page;
              this.articleLists = response.data.lists;
              
              this.isFetching = false;
              
              console.log("lists", response.data.lists);
              console.log("articleLists", this.articleLists);
              
            })
            .catch(err => {
              console.log(err);
            });
        },
        onPage: function(page: number) {
            this.main(page)
            //localStorage.setItem('page', page)
        },
        //...mapActions(['adminList'])
        
        selectBoard: function(event: Event) {
          //const selectBoardElem = this.$refs.selectBoardElement as HTMLSelectElement;
          //const selectBoardValue = (selectBoardElem.option[selectBoardElem.selectedIndex].value);
          //console.log("selectBoardValue", selectBoardValue);
          const target = event.target as HTMLSelectElement;
          const selectBoardValue = target.value;
          console.log("selectBoardValue", selectBoardValue);
          this.boardNo = Number(selectBoardValue);
          this.main(1);
        },
        
        goNew: function() {
          window.location.href = "/board/new/" + this.boardNo + "/" + this.page.page;
        }
    },
});

</script>
