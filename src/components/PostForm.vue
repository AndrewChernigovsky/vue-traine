<template>
	<form class="form" @submit.prevent>
		<h3>Create the post</h3>
		<my-input placeholder="title" v-model="post.title" required />
		<my-input placeholder="description" v-model="post.body" required />
		<my-button @click="createPost">Create</my-button>
	</form>
</template>
<script>

export default {
	name: 'PostForm',
	data() {
		return {
			post: {
				title: '',
				body: ''
			}
		}
	},
	methods: {
		createPost() {
			this.post.id = Date.now();
			this.$emit('create', this.post)
			this.post = {
				title: '',
				body: ''
			}
		}
	},
	watch: {
		post: {
			handler(newValue) {
				console.log(newValue);
			},
			deep: true
		}
	}
}
</script>
<style scoped>
.form {
	display: flex;
	flex-direction: column;
}
</style>