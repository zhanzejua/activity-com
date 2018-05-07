<style lang="less">
	
</style>
<template>
	<div id="app">
		<Progress></Progress>
		<TextOverflow></TextOverflow>
	</div>
</template>
<script>
import Progress from './components/business/Progress.vue';
import TextOverflow from './components/business/TextOverflow.vue';
export default {
	name: 'app',
	data() {
		return {
		}
	},
	computed: {
	},
	mounted() {
	},
	methods: {
	},
	components: {
		Progress,
		TextOverflow
	}
}
</script>
