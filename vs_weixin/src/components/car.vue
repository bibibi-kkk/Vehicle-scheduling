<template>
	<div class="car">
		<van-cell value="内容" is-link class="title">
			<template #title>
				<span class="custom-title">车辆</span>
			</template>
		</van-cell>
		<div class="content">
			<div class="item">
				<div class="left">
					<div class="bold">车牌号：</div>
					<div class="value">{{data.carId}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
			<div class="item">
				<div class="left">
					<div class="bold">品牌型号：</div>
					<div class="value">{{data.type}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
			<div class="item">
				<div class="left">
					<div class="bold">分类：</div>
					<div class="value">{{data.class_name}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['data'],
	data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.car {
	background: #fff;
	margin: 20upx;
	border-radius: 20upx;
	.content {
		.item {
			font-size: 28upx;
			padding: 10upx 0 10upx 32upx;
			.left {
				display: flex;
			}
		}
	}
}
</style>