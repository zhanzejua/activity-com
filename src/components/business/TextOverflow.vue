<style scoped lang="less">
	div{
		margin: 20px 0;
	}
	p {
		width: 379px;
		font-size: 18px;
	}
	h5 {
		font-size: 20px;
	}
	.demo1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.demo2 {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
	.demo3{
		position: relative; 
		max-height: 40px;  /*将height设置为line-height的整数倍，防止超出的文字露出。*/
		line-height: 20px; 
		overflow: hidden;
	}
	.demo3::after{
		content: "..."; 
		position: absolute; 
		bottom: 0; 
		right: 0; 
		padding-left: 40px;
	    background: -webkit-linear-gradient(left, transparent, #fff 60%);
	    background: -o-linear-gradient(left, transparent, #fff 60%);
	    background: linear-gradient(to right, transparent, #fff 60%);
	}
	.demo4::after{
		content: " ..."; 
	}
</style>
<template>
	<div>
		<h5>1、超出部分显示省略号</h5>
		<p class="demo1">先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也</p>
		<h5>2、根据webkit-box规定显示几行</h5>
		<p class="demo2">先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也</p>
		<h5>3、根据max-height与line-height规定显示几行</h5>
		<p class="demo3">先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也</p>
		<h5>4、截取一段文字</h5>
		<p class="demo4" ref="demo4"></p>
	</div>
</template>
<script>
export default {
	name: 'TextOverflow',
	data() {
		return {
		}
	},
	mounted() {
		var str = "先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也";
		var singleStr = str.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g,"çç");
		var result = '';
		if(singleStr.length > 125) {
		    var length = singleStr.slice(0, 125).replace(/çç/g,'ç').length;
		    result = str.slice(0, length);
		} else {
		    result = str;
		}
		this.$refs.demo4.innerHTML = result;
	},
}
</script>
