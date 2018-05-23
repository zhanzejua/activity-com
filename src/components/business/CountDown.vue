<style lang="less">
	
</style>
<template>
	<div class="time">
		<p>倒计时</p>
		<p>{{ currentTime }}</p>
	</div>
</template>
<script>
export default {
	name: 'CountDown',
	data() {
		return {
			leftSceond: 0,
			currentTime: '00:00:00'
		}
	},
	mounted() {
		let nowTime = new Date().getTime();
		let endTime = new Date().getTime() + 20000000;
		this.countDownTime(nowTime, endTime);
	},
	methods: {
		countDownTime(nowTime, endTime) {
			let leftTime = endTime - nowTime;
			this.leftSceond = parseInt(leftTime/1000);
			var interval = setInterval(() => {
				if(this.leftSceond > 0) {
					this.leftSceond--;
					this.getCountDownDate();
				} else {
					clearInterval(interval);
				}
			}, 1000)
		},
		getCountDownDate() {
			let h = 0;
			let m = 0;
			let s = 0;
			h = Math.floor(this.leftSceond/60/60);
            m = Math.floor(this.leftSceond/60%60);
            s = Math.floor(this.leftSceond%60);
            h = h > 9 ? h : '0' + h;
            m = m > 9 ? m : '0' + m;
            s = s > 9 ? s : '0' + s;
            this.currentTime = h + ':' + m + ':' + s;
		}
	},
}
</script>
