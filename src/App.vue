<style lang="less">
	.con {
		width: 300px;
		height: 300px;
		background: rgba(0,0,0,0.1);
		text-align: center;
		font-size: 0;
		*font-size:200px; 
		zoom:1;
		img {
			vertical-align:middle;
		}
	}
	.con:after {
		content: '';
		display: inline-block;
		width: 0;
		height: 100%;
		overflow: hidden;
		vertical-align: middle;//重点
	}
	.box1 {
		width: 300px;
		height: 300px;
		background: rgba(0,0,0,0.1);
	}
	.img2 {
		display: block;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-position:center;
		background-image: url(./components/assets/icon.png);
	}
</style>
<template>
	<div id="app">
		<!-- <div class="con">
			<img class="img1" src="./components/assets/icon.png">
		</div> -->
		<div class="box1">
			<img class="img2" src="./components/assets/bg.png">
		</div>
	</div>
</template>
<script>
import aniHelper from './components/business/aniHelper.vue';
import TextOverflow from './components/business/TextOverflow.vue';
import {add} from './common/api'; 
import util from './common/util';
export default {
	name: 'app',
	data() {
		return {
			articleData: [],
			num: 0
		}
	},
	computed: {
	},
	mounted() {
		var promiseFn = function() {
			var promise =  new Promise(function(resolve, reject){ 
				setTimeout(function() { 
					var rand = Math.random(); 
					if(rand<0.5){ 
						resolve("resolve" + rand); 
					} else { 
						reject("reject" + rand); 
					} 
				},1000); 
			});
			return promise
		}
		// promiseFn().then((data) => {console.log(data)})
		function doubleAfter2seconds(num) {
		    return new Promise((resolve, reject) => {
		        // setTimeout(() => {
		        //     reject(2 * num)
		        // }, 2000);
		        if(num) {
		        	resolve(11)
		        } else {
		        	reject(22)
		        }
		    } )
		}
		async function testResult() {
		    for(var i =0; i<=2; i++){
		    	try {
		    		let result = await doubleAfter2seconds(i);
		        	console.log(result)
		    	} catch(err) {
		    		console.log(err)
		    	}
		        
		    }
		    console.log('hello')
		}
		// testResult();

		var view = document.getElementById("test"); 
		var data = {}; 
		var i=0; 
		Object.defineProperty(data, "b", { 
			set: function(newValue) { 
			 	//当data.b的值改变的时候更新＃test的视图 
			 	// view.textContent=newValue; 
			}, 
			get: function() {} 
		}); 
		setInterval(function(){ 
			i++; 
			data["b"] = "data.b的值更新了，我要更新视图"+i; 
		},1000); 
		// this.getNewDatas();`
	},
	methods: {
		getNewDatas() {
			add().then((res) => {
				// console.log(res.data)
				this.articleData = res.data.articles
			})
		},
	},
	components: {
		aniHelper,
		TextOverflow
	}
}
</script>
