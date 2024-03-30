<template>
	<div class="post">
		<div>
			<div><strong>Название:</strong> {{ post.title }}</div>
			<div><strong>Описание:</strong> {{ post.body }}</div>
		</div>
		<div class="post__btns">
			<my-button @click="$emit('remove', post)">Remove</my-button>
		</div>
	</div>
</template>
<script>
import MyButton from './UI/MyButton.vue'
export default {
	components: { MyButton },
	name: 'PostItem',
	props: {
		post: {
			type: Object,
			required: true,
		}
	}
}
</script>
<style scoped>
.post {
	padding: 15px;
	min-width: 100%;
	border: 2px solid blue;
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>