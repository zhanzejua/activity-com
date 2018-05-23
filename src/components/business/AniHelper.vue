<style lang="less">
	.btn {
		position: relative;
		margin-top: 0.6rem;
		border: 1px solid #0AD8F0;
		border-radius: 0.925926rem;
		line-height: 0.666667rem;
		height: 0.666667rem;
		text-align: center;
		color: #0AD8F0;
		font-size: 0.333333rem;
		span {
			width: 100%;
		    position: absolute;
		    left: 50%;
		    top: 50%;
		    transform: translate3d(-50%, -50%, 0);
		}
	}
	.image {
		width: 3rem;
		height: 3rem;
	}
	.gift {
	    display: inline-block;
	    width: 6.351852rem;
	    height: 6.166667rem;
	    margin-left: .12963rem;
	    transform: translate3d(0, 0, 0);
	    -webkit-transform: translate3d(0, 0, 0);
	}
</style>
<template>
	<div class="anihelper">
		<div class="btn" @click="startAnimate(true)"><span>开启礼盒</span></div>
		<div class="btn" @click="startAnimate()"><span>还原礼盒</span></div>
		<img class="image" src="../assets/gift1.png">
		<img class="image" src="../assets/gift2.png">
		<img class="image" src="../assets/gift3.png">
		<canvas id="canvas" class="gift"></canvas>
	</div>
</template>
<script>
export default {
	name: 'app',
	data() {
		return {
			aniImgs: [],
            requestId: 0,
            loadedImgs: [],
            ctx: null,
            stage: null,
		}
	},
	mounted() {
		let img = document.querySelectorAll('.image');
		for(let i = 0; i < img.length; i++) {
			this.aniImgs.push(img[i].src);
		}
		this.startAnimate();
	},
	methods: {
		startAnimate(flag) {
			let urls = {'res': this.aniImgs};
			this.initCanvas('canvas');
			this.drawImage(urls.res[0]);
			if(flag) {
				let arr = [].concat(urls.res);
				arr.shift();
				this.loadImgs(arr, (imgs) => {
					this.playMovieClip(imgs, 3, false);
				})
			}
		},
		nextTick(cb) {
			let raf = window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame.bind(window);
			this.requestId = raf(cb);
		},
		cancelNextTick(cb) {
			let cancelRaf = window.cancelAnimationFrame.bind(window) || window.webkitCancelAnimationFrame.bind(window);
			cancelRaf(cb);
		},
		loadImgs(urls, timeout, callback) {
			let count = 0;
			let timer = -1;
			let imgs = [];
			let self = this;
			if(typeof timeout == 'function') {
				callback = timeout;
				timeout = 1000;
			}
			if(urls.length && timeout > 0) {
				timer = setTimeout(() => {
					callback && callback(imgs);
					callback = null;
				}, timeout);
			}
			for(let i = 0; i < urls.length; i++) {
				if(this.loadedImgs[urls[i]]) {
					imgs.push(this.loadedImgs[urls[i]]);
					if(++count == urls.length) {
						clearTimeout(timer);
						callback && callback(imgs);
					}
					continue;
				}
				(function(url) {
					let img = document.createElement('img');
					img.onload = function() {
						self.loadedImgs[url] = img;
						if(++count == urls.length) {
							clearTimeout(timer);
							callback && callback(imgs);
							callback = null;
						}
					};
					imgs.push(img);
					img.src = url;
				})(urls[i]);
			}
		},
		initCanvas(id) {
			let dom = document.getElementById(id);
			if(!dom) return;
			dom.width = 686;
			dom.height = 666;
			this.ctx = dom.getContext('2d');
			this.stage = dom;
		},
		clearStage() {
			this.ctx.clearRect(0, 0, this.stage.width, this.stage.height);
		},
		drawImage(url) {
			this.loadImgs([url], (imgs) => {
				let img = imgs[0];
				this.clearStage();
				this.ctx.drawImage(img, (this.stage.width - img.width) / 2, this.stage.height - img.height, img.width, img.height);
			});
		},
		normalizeImages(imgs) { //标准化图片数据
			let datas = [];
			for(let i = 0; i < imgs.length; i++) {
				let img = imgs[i];
				let count = img.height / img.width;
				for(let j = 0; j < count; j++) {
					datas.push({
						img: img,
						width: img.width,
						height: img.height,
						x: 0,
						y: 0
					})
				}
			}
			return datas;
		},
		playMovieClip(imgs, fps, reverse) {
			let fpsInterval = 900 / fps; //每张替换900/3=300ms频率
			let oldTimestamp = -1;
			let i = 0;
			let self = this;
			this.cancelNextTick();

			let datas = this.normalizeImages(imgs);
			if(reverse) {
				datas.concat(datas.reverse);
			}
			function ticker(timestamp) {
				self.nextTick(ticker);
				let elapsed = timestamp - oldTimestamp;
				if(timestamp - oldTimestamp >= fpsInterval) {
				    oldTimestamp = timestamp - (elapsed % fpsInterval);
				} else {
					return;
				}
				if(i >= datas.length) {
					self.cancelNextTick();
					return;
				}
				var data = datas[i];
				self.clearStage();
				self.ctx.drawImage(data.img, data.x, data.y, data.width, data.height, (self.stage.width - data.width) / 2, self.stage.height - data.height, data.width, data.height);
				i++;
			}
			this.nextTick(ticker); 
		}
	}
}
</script>
