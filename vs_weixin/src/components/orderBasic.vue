<template>
	<div class="orderBasic">
		<van-cell value="内容" class="title">
			<template #title>
				<span class="custom-title">基本信息</span>
			</template>
		</van-cell>
		<div class="content">
			<div class="item">
				<div class="left">
					<div class="bold">出发时间：</div>
					<div class="value">{{data.departureTime}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
			<div class="item">
				<div class="left">
					<div class="bold">出发地点：</div>
					<div class="value">{{data.departure}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
			<div class="item">
				<div class="left">
					<div class="bold">目的地：</div>
					<div class="value">{{data.destination}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
			<div class="item">
				<div class="left">
					<div class="bold">人数：</div>
					<div class="value">{{data.carryNum}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
			<div class="item">
				<div class="left">
					<div class="bold">申请时间：</div>
					<div class="value">{{data.createTime}}</div>
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
.orderBasic {
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