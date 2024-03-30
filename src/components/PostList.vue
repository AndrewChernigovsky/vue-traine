<template>
	<div v-if="posts.length > 0">
		<h3>List of Posts</h3>
		<post-item v-for="post in posts" :key="post.id" :post="post" @remove="$emit('remove', post)" />
	</div>
	<h2 v-else style="color:red">
		Havent posts yet
	</h2>
</template>
<script>
import PostItem from './PostItem.vue'
export default {
	components: { PostItem },
	name: 'PostList',
	props: {
		posts: {
			type: Array,
			required: true
		},
	}
}
</script>
<style scoped></style>