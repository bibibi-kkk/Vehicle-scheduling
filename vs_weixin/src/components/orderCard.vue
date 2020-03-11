<template>
	<div class="orderCard">
		<div class="title">
			<div class="carType">中型车</div>
			<div class="createTime">下单时间 2020-10-13</div>
			<div class="state">已审核</div>
		</div>
		<div class="content">
			<div class="top">
				<div class="from">南京</div>
				<div class="img"></div>
				<div class="to">北极</div>
			</div>
			<div class="botoom">
				<div class="departure">出发时间： 2020-10-14 09:00</div>
			</div>
		</div>
		<van-collapse v-model="activeName" accordion>
		<van-collapse-item title="车辆" name="1">
			<van-card
				num="2"
				price="2.00"
				desc="描述信息"
				:title='data.from'
				thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
			/>
			{{data}}
		</van-collapse-item>
		<van-collapse-item title="司机" name="2">内容</van-collapse-item>
	</van-collapse>
	</div>
	
</template>

<script>
export default {
	props: ['data'],
	data () {
		return {
      activeName: '1'
		}
	}
}
</script>

<style lang="less" scoped>
.orderCard {
	font-size: 24upx;
	.title {
		display: flex;
		height: 30px;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px 4px 0 0;
		background: pink;
	}
	.content {
		.top {
			display: flex;
			justify-content: space-around;
			padding: 20upx 0;
		}
		.bottom {
			padding: 10upx;
		}
	}
	.card {

	}
}
</style>