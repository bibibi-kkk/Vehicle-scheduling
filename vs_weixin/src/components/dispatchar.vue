<template>
	<div class="dispatchar">
		<van-cell value="内容" class="title">
			<template #title>
				<span class="custom-title">调度员</span>
			</template>
		</van-cell>
		<div class="content">
			<div class="item">
				<div class="left">
					<div class="bold">姓名：</div>
					<div class="value">{{data.nickname}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
			<div class="item">
				<div class="left">
					<div class="bold">联系方式：</div>
					<div class="value">{{data.tel}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
			<div class="item">
				<div class="left">
					<div class="bold">审核时间：</div>
					<div class="value">{{approvalTime}}</div>
				</div>
				<div class="right">
					</div> 
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['data', 'approvalTime'],
	data () {
    return {
    }
  }
}
</script>

<style lang='less' scoped>
.dispatchar {
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