<template>
	<select v-model="value" @change="changeOptions">
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
	data() {
		return {
			value: ''
		}
	},
	methods: {
		changeOptions(evt) {
			this.$emit('update:modelValue', evt.target.value)
		}
	},
	mounted() {
		this.value = this.modelValue;
	}
}
</script>
<style></style>