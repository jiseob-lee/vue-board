<template>
    <section class="layout_container">
        <div class="contentWrap admin">
            <section class="content">
                <div class="ctBox">
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
                                <td>{{ list.subject }}</td>
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
                </div>
            </section>
        </div>
    </section>
</template>

/*
<script lang="ts" setup>
import { ref, provide } from 'vue';

type Article = {
  boardArticleIdx : number;
  subject : string;
  hitCount : number;
  dateCreated : string;
  openYn : string;
}

const articleList = ref<Article[] | null>([]);

provide('articleList', articleList);

</script>
*/

<script lang="ts">
//const $ = window.$;
//import { mapState, mapActions } from 'vuex'
import paging from '@/components/paging.vue'
import axios from 'axios';
import { inject } from 'vue';
import { reactive } from 'vue';
import api from "../api";

//const articleList = inject('articleList');


type Article = {
  boardArticleIdx : number;
  subject : string;
  hitCount : number;
  dateCreated : string;
  openYn : string;
}

//const articleList = reactive<Article[]>([]);


export default {
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
    }),
   
    //computed: {
        //...mapState([
            //'lists'
        //]),
    //},
    
    mounted() {
        
        if (this.page.page === null) {
            this.page.page = 1
        }
            
        this.main(this.page.page)
    },
          
    methods: {
        main: function(page: number) {
            
            this.isFetching = true;
            
            const payload = {
                currentPage : page,
                pageArticleCount : this.page.count,
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
    },
}
</script>
