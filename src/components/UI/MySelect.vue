<template>
	<select v-model="modelValue" @change="changeOptions">
		<option value="" disabled>Choose something from list</option>
		<option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
	</select>
</template>
<script>
export default {
	name: "my-select",
	props: {
		modelValue: {
			type: String
		},
		options: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		changeOptions(evt) {
			this.$emit('update:modelValue', evt.target.value)
		}
	}
}
</script>
<style></style>