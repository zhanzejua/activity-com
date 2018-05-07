<style lang="less">
	#app {
		padding: 10px;
	}
	.progress {
		width: 200px;
		height: 14px;
		background-color: #f5f5f5;
		border-radius: 4px;
		overflow: hidden;
		box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
		&__bar {
			width: 0px;
			height: 14px;
			background-color: rgb(92, 184, 92);
			background-image:linear-gradient(135deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%, transparent);
			background-size: 40px 40px;
			transition-property: width;
			transition-delay: 0s;
			transition-timing-function: ease;
			animation: move 2s linear infinite;
		}
	}
	@keyframes move {
	    0% {
	       background-position: 0 0;
	    }
	    100% {
	       background-position: 40px 40px;
	    }
	}
</style>
<template>
	<div>
		<p>{{time}}</p>
		<div class="progress">
			<div ref="progressBar" class="progress__bar"></div>
		</div>
	</div>
</template>
<script>
import util from '../../common/util';
export default {
	name: 'Progress',
	data() {
		return {
			time: util.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss qq:SS')
		}
	},
	computed: {
	},
	mounted() {
		let i = 0;
		let int = setInterval(() => {
			i++;
			if(i == 100) {
				clearTimeout(int);
			}
			this.$refs.progressBar.style.width = i * 2 + 'px';
		}, 100);
	},
}
</script>

		