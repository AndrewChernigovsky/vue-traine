<template>
	<div class="app">
		<h1>Page Posts</h1>
		<div class="app__btns">
			<my-button @click="showDialog">Create Post</my-button>
			<my-dialog v-model:show="dialogVisible">
				<post-form @create="createPost" />
			</my-dialog>
			<my-select v-model="selectedSort" :options="sortOptions" />
		</div>
		<post-list :posts="posts" @remove="removePost" v-if="!isPostLoading" />
		<div v-else>Loading...</div>
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
		async fetchPosts() {
			try {
				this.isPostLoading = true;
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
				this.posts = response.data;
			} catch (e) {
				alert('Error')
				console.log(e);
			} finally {
				this.isPostLoading = false;
			}
		}
	},
	mounted() {
		this.fetchPosts();
	},
	watch: {
		selectedSort(newValue) {
			console.log(this.posts, 'posts');
			this.posts.sort((post1, post2) => {
				return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
			})
			console.log(newValue)
		},
		dialogVisible(newValue) {
			console.log(newValue);
		}
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
</style>
