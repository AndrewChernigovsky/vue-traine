<template>
  <div v-if="posts.length > 0">
    <h3>List of Posts</h3>
    <transition-group name="post-list">

      <post-item v-for="post in posts" :key="post.id" :post="post" @remove="$emit('remove', post)" />
    </transition-group>
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
<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-move,
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>