<template>
  <div class="app">
    <h1>Page Posts</h1>
    <my-input v-model="searchQuery" placeholder="Search..."></my-input>
    <div class="app__btns">
      <my-button @click="showDialog">Create Post</my-button>
      <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost" />
      </my-dialog>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <post-list :posts="sortedAndSearchPosts" @remove="removePost" v-if="!isPostLoading" />
    <div v-else>Loading...</div>
    <div class="observer" ref="observer"></div>
    <!-- <div class="page__wrapper">
      <div v-for="pageNumber in  totalPages " :key="pageNumber" class="page" :class="{
      'current-page': page === pageNumber
    }" @click="changePage(pageNumber)">{{ pageNumber }}</div>
    </div> -->
  </div>

</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {
          value: 'title', name: 'about name',
        },
        {
          value: 'body', name: 'about description'
        }
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('Error')
        console.log(e);
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Error')
        console.log(e);
      }
    },
  },
  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer, '11');
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    };
    const cb = (enrties, observer) => {
      // console.log(enrties, 'rrere');
      if (enrties[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(cb, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
  }
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__btns {
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 1px solid red;
}

.observer {
  height: 30px;
  background: green;
}
</style>
