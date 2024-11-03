<template>
    <section class="paging">
        <!-- <a class="pagingFirst" 
        @click = "prevPage()"
        :disabled = "page.page == 1">처음</a> -->
            <ul class="pagingList">
                <li class="pagingFirst" @click = "firstPage()" :class = "page.page == 1 ? 'inactive' : null">처음</li>
                <li class="pagingPrev" @click = "prevPage()" 
                :class = "Math.floor((page.page - 1) / 10) * 10 < 10 ? 'inactive' : null"
                >이전</li>
                
                <li 
                v-for = "item in countInPages" 
                :key = "item"
                :class = "(startPage-1)+item == page.page ? 'active' : null"
                @click = "(startPage-1)+item == page.page ? '' : selectPage( (startPage-1)+item )"
                > {{(startPage-1) + item}} </li>
                
                <li class="pagingNext" @click = "nextPage()" 
                :class = "Math.ceil((page.page) / 10) * 10 + 1 > totalPage ? 'inactive' : null"
                >이후</li>
                <li class="pagingLast" @click = "lastPage()" :class = "page.page == totalPage ? 'inactive' : null">끝</li>
            </ul>
        <!-- <a class="pagingLast" @click = "nextPage()">끝</a> -->
    </section>
</template>

<script lang="ts">
export default {
    name: 'PagingView',
    props: {
        page: {
            type: Object,
            default () {
                return {
                    total: 354,
                    page: 32,
                    count: 10 
                }
            }
        },
        defaultPages: {
            type: Number,
            default: 10
        }
    },
    
    computed: {
        startPage: function () {
            let value = (Math.floor((this.page.page-1) / this.defaultPages) * this.defaultPages) + 1
            return value
        },
        totalPage: function () {
            var count = this.page.count ? this.page.count : 10
            return Math.floor(this.page.total / count) + ((this.page.total % count) == 0 ? 0 : 1)
        },
        countInPages: function () {
            
            if (
              Number.isNaN(this.totalPage) ||
              Number.isNaN(this.startPage) ||
              Number.isNaN(this.defaultPages)
            ) {
              return 0;
            }

            let currPages = this.totalPage - (this.startPage-1)
            if (currPages < this.defaultPages) {
                console.log("totalPage", this.totalPage);
                console.log("startPage", this.startPage);
                console.log("currPages", currPages);
                if (currPages < 0)
                {
                  return 0;
                }
                return currPages
            } else {
                return this.defaultPages
            }
        }
    },
    methods: {
        selectPage: function (page: number) {
            
            console.log("countInPages", this.countInPages);
            
            this.$emit("onPage", page)
        },

        prevPage: function () {
            if (Math.floor((this.page.page - 1) / 10) * 10 < 10)
            {
              return;
            }
            
            this.selectPage(Math.floor((this.page.page - 1) / 10) * 10)
        },

        nextPage: function () {
            if (Math.ceil((this.page.page) / 10) * 10 + 1 > this.totalPage) {
                return
            }
            
            this.selectPage(Math.ceil((this.page.page) / 10) * 10 + 1)
        },
        
        firstPage: function () {
            if (this.page.page == 1) {
                return
            }
            
            this.selectPage(1)
        },
        
        lastPage: function () {
            if (this.page.page == this.totalPage) {
                return
            }
            
            this.selectPage(this.totalPage)
        }
    }
}
</script>

<style scoped>
li {
  display: inline;
  margin: 10px;
  cursor: pointer;
}

li:hover {
  text-decoration: underline;
}

li.active {
  font-weight: bold;
  text-decoration: none;
  cursor: default;
}

li.inactive {
  color: gray;
  text-decoration: none;
  cursor: default;
}
</style>
